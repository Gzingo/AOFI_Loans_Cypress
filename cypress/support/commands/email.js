import dayjs from 'dayjs';

// Custom command that starts the smtp4dev server and waits until it's ready
Cypress.Commands.add('startSmtp', () => {
  cy.task('startSmtp');
  cy.task('waitForSmtpReady').then((isReady) => {
    if (!isReady) {
      throw new Error('SMTP server nije spreman');
    }
    cy.task('log', '✅ SMTP server je aktivan');
  });
});

// Custom command to get the latest email for a specific email address
Cypress.Commands.add('getLatestEmailFor', (email) => {
  cy.request('http://localhost:5000/api/Messages').then((response) => {
    const body = response.body;
    const emails = Array.isArray(body.results) ? body.results : Array.isArray(body) ? body : [];
    const normalized = email.trim().toLowerCase();
    const match = emails.find((msg) =>
      msg.to?.some((recipient) => {
        const address =
          typeof recipient === 'string'
            ? recipient.toLowerCase()
            : recipient.address?.toLowerCase();
        return address === normalized;
      })
    );
    expect(match, `Email nije pronađen za ${email}`).to.not.be.undefined;
    // Extract html content
    return cy.request(`http://localhost:5000/api/Messages/${match.id}/html`).then((htmlRes) => {
      match.htmlBody = htmlRes.body;
      cy.wrap(match);
    });
  });
});

// Custom command to register a new user and verify email receipt
Cypress.Commands.add('registerAndCheckEmailInbox', () => {
  cy.generateTestEmail().then((email) => {
    cy.wrap(email).as('testEmail');
    cy.log('📧 Korišćen email:', email);
    cy.fillFormFieldTubeIQ('Email', email);
    cy.env(['tubeIQ_registration_password']).then(({ tubeIQ_registration_password }) => {
      cy.fillFormFieldTubeIQ('Password', tubeIQ_registration_password);
    });
    cy.intercept('POST', '**/Account/Register*').as('register');
    const timestamp = dayjs().format('DD.MM.YYYY HH:mm');
    cy.wrap(timestamp).as('savedTimestamp');
    cy.log('📌 Snimljen timestamp:', timestamp);
    cy.get('input[type="submit"]').should('be.visible').click();
    cy.wait('@register').then((interception) => {
      const rawBody = interception.request.body;
      const parsed = new URLSearchParams(rawBody);
      const emailFromRequest = parsed.get('Email');
      cy.log('📨 Registered Email:', emailFromRequest);
      cy.task('sendTestEmail', emailFromRequest);
      cy.wait(2000);
    });
    // Check smtp4dev mailbox and compare timestamps
    cy.get('@savedTimestamp').then((ts) => {
      cy.origin('http://localhost:5000', { args: { ts } }, ({ ts }) => {
        cy.visit('/');
        cy.reload();
        cy.wait(3000);
        cy.get('[id="pane-messages"]')
          .find('.el-table--fit')
          .within(() => {
            cy.get('.el-scrollbar__wrap')
              .find('.el-table__body', { timeout: 10000 })
              .should('be.visible')
              .within(() => {
                cy.get('tbody tr:first td:first')
                  .should('exist')
                  .invoke('text')
                  .then((text) => {
                    const match = text.match(
                      /(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)/
                    );
                    if (!match) {
                      throw new Error(`Can't parse UI timestamp: ${text}`);
                    }
                    const [_, mm, dd, yyyy, h, m, s, ampm] = match;
                    const uiHour = ampm === 'PM' ? (+h % 12) + 12 : +h;
                    const uiDate = new Date(
                      `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}T${String(uiHour).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`
                    );
                    const expectedParts = ts.split(/[\s.:]/); // '30.10.2025 13:34' → ['30','10','2025','13','34']
                    const expectedDate = new Date(
                      `${expectedParts[2]}-${expectedParts[1]}-${expectedParts[0]}T${expectedParts[3]}:${expectedParts[4]}:00`
                    );
                    const diffMs = Math.abs(uiDate - expectedDate);
                    const diffMin = Math.floor(diffMs / 60000);
                    cy.log(`UI time: ${uiDate.toISOString()}`);
                    cy.log(`Expected time: ${expectedDate.toISOString()}`);
                    cy.log(`Diff in minutes: ${diffMin}`);
                    expect(diffMin).to.be.lte(1);
                  });
                cy.get('tbody tr:first').click({ force: true });
                // cy.get('.messageview').should('be.visible');
              });
          });
      });
    });
  });
});

// Custom command to stop the smtp4dev server
Cypress.Commands.add('stopSmtp', () => {
  cy.task('stopSmtp');
});

// Custom command to clear all emails from smtp4dev inbox
Cypress.Commands.add('clearEmailInbox', () => {
  cy.origin('http://localhost:5000', () => {
    cy.visit('/');
    cy.reload();
    cy.wait(2000);
    cy.get('[id="pane-messages"]')
      .find('.toolbar')
      .within(() => {
        cy.get('button[title="Clear"]').should('be.visible').click({ force: true });
      });
    cy.get('.el-message-box').find('button').contains('OK').should('be.visible').click();
    cy.get('.el-table__empty-text')
      .should('exist')
      .and('contain', `No messages in mailbox 'Default' in folder 'INBOX'`);
  });
});
