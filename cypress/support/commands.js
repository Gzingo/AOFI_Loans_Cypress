/* ***********************************************
This example commands.js shows you how to create various custom commands and overwrite existing commands.

For more comprehensive examples of custom commands please read more here:
https://on.cypress.io/custom-commands
***********************************************
-- This is a parent command --
Cypress.Commands.add('login', (email, password) => { ... })

-- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

-- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

-- This will overwrite an existing command --
Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
*********************************************** */

import dayjs from 'dayjs';
import { Assert } from './pageObjects/assertions';

// Custom command to go to AOFI login page
Cypress.Commands.add('goToLoginPage', () => {
  cy.visit('/#/auth/login');
});

// Custom command to go to TubeIQ login page
Cypress.Commands.add('goToTubeIQLoginPage', () => {
  cy.env(['tubeIQ_url']).then(({ tubeIQ_url }) => {
    cy.visit(tubeIQ_url);
  });
});

// Custom command to go to TubeIQ registration page
Cypress.Commands.add('goToTubeIQRegistrationPage', () => {
  cy.env(['tubeIQ_registration_url']).then(({ tubeIQ_registration_url }) => {
    cy.visit(tubeIQ_registration_url);
  });
});

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
  cy.request('http://localhost:5000/api/Messages')
    .its('body')
    .then((body) => {
      const emails = Array.isArray(body.results) ? body.results : [];
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

// Custom command to fill form field by formcontrolname with retries
Cypress.Commands.add('fillFormField', (formControlName, value, retries = 2) => {
  const selector = `[formcontrolname="${formControlName}"] input`;
  const attemptType = (attempt) => {
    Cypress.Promise.try(() => {
      cy.get(selector)
        .should('be.visible')
        .clear({ force: true })
        .type(value, { delay: 30, force: true })
        .should('have.value', value);
    }).catch(() => {
      if (attempt < retries) {
        Cypress.log({
          name: 'fillFormField',
          message: `Retry ${attempt + 1} for '${formControlName}'`,
        });
        cy.wait(500);
        attemptType(attempt + 1);
      } else {
        throw new Error(
          `Failed to fill '${formControlName}' with '${value}' after ${retries + 1} attempts`
        );
      }
    });
  };
  attemptType(0);
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

// Custom command for login by token
Cypress.Commands.add('loginByToken', () => {
  cy.env(['first_user', 'first_password']).then(({ first_user, first_password }) => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: first_user,
        password: first_password,
      },
    }).then((response) => {
      const {
        email,
        firstName,
        lastName,
        ous,
        payload,
        roles,
        token,
        tokenHash,
        workAsFirstName,
        workAsLastName,
        workAsOus,
        workAsUsername,
      } = response.body;
      const loginData = {
        email,
        firstName,
        lastName,
        ous,
        payload,
        roles,
        token,
        tokenHash,
        workAsFirstName,
        workAsLastName,
        workAsOus,
        workAsUsername,
      };
      window.localStorage.setItem('loginData', JSON.stringify(loginData));
    });
  });
});

// Custom command to fill form field by ID or name with retries
Cypress.Commands.add('fillFormFieldTubeIQ', (fieldName, value, retries = 2) => {
  const selector = `input[id="${fieldName}"], input[name="${fieldName}"]`;
  const attemptType = (attempt) => {
    Cypress.Promise.try(() => {
      cy.get(selector)
        .should('be.visible')
        .clear({ force: true })
        .type(value, { delay: 30, force: true })
        .should('have.value', value);
    }).catch(() => {
      if (attempt < retries) {
        Cypress.log({
          name: 'fillFormFieldByIdOrName',
          message: `Retry ${attempt + 1} for '${fieldName}'`,
        });
        cy.wait(500);
        attemptType(attempt + 1);
      } else {
        throw new Error(
          `Failed to fill '${fieldName}' with '${value}' after ${retries + 1} attempts`
        );
      }
    });
  };
  attemptType(0);
});

// Custom command to generate a unique test email address
Cypress.Commands.add('generateTestEmail', (prefix = 'qaTestUser') => {
  const suffix = Math.random().toString(36).slice(2, 6); // 4-char alphanumeric
  const email = `${prefix}_${suffix}@example.com`;
  return cy.wrap(email);
});

// Custom command to perform Login via API and return token and user info
Cypress.Commands.add('apiLoginAndUseToken', () => {
  return cy
    .env([
      'preduzetnik_email',
      'preduzetnik_password',
      'preduzetnik_firstName',
      'preduzetnik_lastName',
      'preduzetnik_username',
    ])
    .then(
      ({
        preduzetnik_email,
        preduzetnik_password,
        preduzetnik_firstName,
        preduzetnik_lastName,
        preduzetnik_username,
      }) => {
        return cy
          .request({
            method: 'POST',
            url: '/api/account/login',
            body: {
              email: preduzetnik_email,
              password: preduzetnik_password,
            },
          })
          .then((resp) => {
            expect(resp.status).to.eq(200);
            const { token, userName, firstName, lastName, organizationId, user } = resp.body.value;
            expect(token, 'Token should exist').to.exist;
            expect(userName, 'userName should exist').to.exist.and.equal(preduzetnik_email);
            expect(firstName, 'firstName should exist')
              .to.be.a('string')
              .and.equal(preduzetnik_firstName);
            expect(lastName, 'lastName should exist')
              .to.be.a('string')
              .and.equal(preduzetnik_lastName);
            expect(organizationId, 'organizationId should exist')
              .to.be.a('number')
              .and.to.be.greaterThan(0);
            const fullName = `${firstName} ${lastName}`.trim();
            expect(fullName, 'Full name should match user').to.equal(preduzetnik_username);
            const payload = JSON.parse(atob(token.split('.')[1]));
            expect(payload.sub).to.eq(userName);
            return cy
              .request({
                method: 'GET',
                url: '/api/clientconfiguration/get',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((protectedResp) => {
                expect(protectedResp.status).to.eq(200);
                return { token, userName, firstName, lastName, organizationId, user };
              });
          });
      }
    );
});

// Custom command for valid TubeIQ Login
Cypress.Commands.add('validLoginTubeIQ', () => {
  // Intercept the form GET
  cy.intercept('GET', 'api/query/GetAllGetStartedProcess*').as('getAllStartedProcess');
  cy.env(['tubeIQ_valid_login_email', 'tubeIQ_valid_login_password']).then(
    ({ tubeIQ_valid_login_email, tubeIQ_valid_login_password }) => {
      // Fill the form with valid credentials
      cy.fillFormFieldTubeIQ('Email', tubeIQ_valid_login_email).should(
        'have.value',
        tubeIQ_valid_login_email
      );
      cy.fillFormFieldTubeIQ('Password', tubeIQ_valid_login_password).should(
        'have.value',
        tubeIQ_valid_login_password
      );
      // Submit the form
      cy.get('form input[type="submit"]').should('be.enabled').click();
      // Assert the result
      cy.wait('@getAllStartedProcess').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        // Since TubeIQ returns HTML, check for dashboard markers and assert on DOM
        cy.get('.full-page-right')
          .shouldContainAnyText(['Welcome to TubeIQ', 'Dobrodošli na TubeIQ!'])
          .and('be.visible');
        cy.log(`Login successful for TubeIQ user: ${tubeIQ_valid_login_email}`);
      });
    }
  );
});

// Custom command to keep the user signed in if pop-up appears
Cypress.Commands.add('keepUserSignedIn', () => {
  // Check if the popup is visible
  cy.get('body').then(($body) => {
    if ($body.find('.timeout-dialog').length > 0) {
      cy.log('Timeout dialog detected, keeping user signed in...');
      cy.get('.timeout-dialog').find('#timeout-keep-signin-btn').click();
      cy.get('#timeout-sign-out-button').should('be.visible');
    } else {
      cy.log('No timeout dialog present, continuing...');
    }
  });
});

/* Custom command to toggle accordion panels using filterByText
 * Usage:
 * cy.toggleAccordion(['Process', 'Proces']); - toggle by text variants
 * cy.toggleAccordion('Tasks');               - toggle by single text
 * cy.toggleAccordion('#collapseProcess');    - toggle by href
 */
Cypress.Commands.add('toggleAccordion', (labelOrVariants) => {
  if (typeof labelOrVariants === 'string' && labelOrVariants.startsWith('#')) {
    // Match by href
    cy.get(`a.accordion-toggle[href="${labelOrVariants}"]`).click({ force: true });
  } else {
    // Match by text variants (array or single string) using filterByText
    const variants = Array.isArray(labelOrVariants) ? labelOrVariants : [labelOrVariants];
    cy.get('a.accordion-toggle').filterByText(variants).click({ force: true });
  }
});

// Custom command for valid AOFI Login as Pravno Lice
Cypress.Commands.add('validLoginPravnoLice', () => {
  cy.intercept('POST', '**/api/account/login').as('loginCall');
  cy.env(['pravnoLice_email', 'pravnoLice_password']).then(
    ({ pravnoLice_email, pravnoLice_password }) => {
      cy.fillFormField('email', pravnoLice_email).should('have.value', pravnoLice_email);
      cy.fillFormField('password', pravnoLice_password).should('have.value', pravnoLice_password);
      cy.get('button[type="submit"]').should('be.enabled').click();
      cy.wait('@loginCall').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        if (!response.body.isValid || !response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unknown error'}`
          );
        }
        cy.log(`Login successful for: ${response.body.value.userName}`);
      });
    }
  );
});

// Custom command for valid AOFI Login as Preduzetnik
Cypress.Commands.add('validLoginPreduzetnik', () => {
  cy.intercept('POST', `**/api/account/login`).as('loginCall');
  cy.env(['preduzetnik_email', 'preduzetnik_password']).then(
    ({ preduzetnik_email, preduzetnik_password }) => {
      cy.fillFormField('email', preduzetnik_email).should('have.value', preduzetnik_email);
      cy.fillFormField('password', preduzetnik_password).should('have.value', preduzetnik_password);
      cy.get('button[type="submit"]').should('be.enabled').click();
      cy.wait('@loginCall').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        if (!response.body.isValid || !response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unknown error'}`
          );
        }
        cy.log(`Login successful for: ${response.body.value.userName}`);
      });
    }
  );
});

// Custom command to attempt SQL Injection during login attempt on Aofi portal
Cypress.Commands.add('loginSQLInjectionAttempt', () => {
  cy.intercept('POST', '**/api/account/login').as('loginCall');
  cy.env(['sql_inject_email', 'sql_inject_password']).then(
    ({ sql_inject_email, sql_inject_password }) => {
      cy.fillFormField('email', sql_inject_email).should('have.value', sql_inject_email);
      cy.fillFormField('password', sql_inject_password).should('have.value', sql_inject_password);
      cy.get('button[type="submit"]').should('be.enabled').click();
      cy.wait('@loginCall').then(({ response }) => {
        expect(response.statusCode).to.eq(500);
        if (response.body.isValid || response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unsuccessful login attempt'}`
          );
        }
        cy.log(`SQL Injection attempt was successfully prevented!!`);
      });
    }
  );
});

// Custom command to attempt SQL Injection during login attempt on TubeIQ platform
Cypress.Commands.add('loginSQLInjectionAttemptTubeIQ', () => {
  cy.env(['sql_inject_email', 'sql_inject_password']).then(
    ({ sql_inject_email, sql_inject_password }) => {
      // Fill the form with SQL injection values
      cy.fillFormFieldTubeIQ('Email', sql_inject_email).should('have.value', sql_inject_email);
      cy.fillFormFieldTubeIQ('Password', sql_inject_password).should(
        'have.value',
        sql_inject_password
      );
      // Submit the form
      cy.get('form input[type="submit"]').should('be.enabled').click();
      // Assert the result directly on the page after reload
      cy.url().should('include', '/Account/Login'); // still on login page
      cy.contains('Prijava u TubeIQ').should('be.visible'); // marker of login form
      cy.log(`SQL Injection attempt blocked – login page returned`);
    }
  );
});

// Custom command to perform Login via API and store token in LocalStorage
Cypress.Commands.add('loginByToken', () => {
  cy.env(['pravnoLice_email', 'pravnoLice_password']).then(
    ({ pravnoLice_email, pravnoLice_password }) => {
      cy.request({
        method: 'POST',
        url: '/api/account/login',
        body: {
          email: pravnoLice_email,
          password: pravnoLice_password,
        },
        failOnStatusCode: false,
      }).then((response) => {
        if (!response.body.isValid || !response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unknown error'}`
          );
        }
        const {
          userId,
          userName,
          token,
          cultureCode,
          activities,
          requiresAuthorization,
          homePage,
          organizationId,
          firstName,
          lastName,
        } = response.body.value;
        const loginData = {
          userId,
          userName,
          token,
          cultureCode,
          activities,
          requiresAuthorization,
          homePage,
          organizationId,
          firstName,
          lastName,
        };
        window.localStorage.setItem('loginData', JSON.stringify(loginData));
      });
    }
  );
});

// Custom command to scroll to botom of the TUbeIQ Task page
Cypress.Commands.add('scrollToBottom', (index = 0) => {
  cy.get('#full-page').within(() => {
    cy.get('.scroll-y').eq(index).scrollTo('bottom', { easing: 'linear' });
  });
});

// Custom command to click Finish and Go to Next button
Cypress.Commands.add('clickFinishAndGoToNextButton', () => {
  cy.get('button')
    .filterByText([
      'Finish and Go to Next',
      'Završi i pređi na sledeće',
      'Заврши и пређи на следеће',
    ])
    .click({ force: true });
});

// Custom command to click Finish button when request card is completed
Cypress.Commands.add('clickFinishButton', () => {
  cy.get('button').filterByText(['Finish', 'Završi', 'Заврши']).click({ force: true });
});

// Custom command to perform an invalid login attempt
Cypress.Commands.add('invalidLogin', () => {
  cy.intercept('POST', '**/api/account/login').as('loginCall');
  cy.env(['invalid_email', 'invalid_password']).then(({ invalid_email, invalid_password }) => {
    cy.fillFormField('email', invalid_email);
    cy.fillFormField('password', invalid_password);
    cy.get('button[type="submit"]').should('be.enabled').click();
    cy.wait('@loginCall').then(({ response }) => {
      const statusCode = response?.statusCode;
      const body = response?.body;
      expect(statusCode).to.eq(500);
      if (!body?.isValid) {
        const messages = Array.isArray(body.validationFailures)
          ? body.validationFailures
              .map((f) => f.errorMessage)
              .filter(Boolean)
              .join(' | ')
          : 'Unknown error';
        cy.log(`Login failed as expected: ${messages}`);
      } else {
        throw new Error('Login unexpectedly succeeded');
      }
    });
  });
});

/* Custom command to filter elements by multiple text variants (case-insensitive)
 * Usage with single string: cy.get('selector').filterByText('Some Text')
 * Usage with array: cy.get('selector').filterByText(['Text1', 'Text2', 'Текст3'])
 */
Cypress.Commands.add('filterByText', { prevSubject: 'element' }, (subject, variants) => {
  const texts = Array.isArray(variants) ? variants : [variants]; // normalization
  return cy.wrap(subject).filter((i, el) => {
    const text = Cypress.$(el).text().trim().toLowerCase();
    return texts.some((v) => text.includes(v.toLowerCase())); // substring match
  });
});

/* Custom command to filter AOFI task items by multiple text variants (case-insensitive)
 * Usage with single string: cy.get('selector').filterAOFIByText('Some Text')
 * Usage with array: cy.get('selector').filterAOFIByText(['Text1', 'Text2', 'Text3'])
 */
Cypress.Commands.add('filterAOFIByText', { prevSubject: 'element' }, (subject, variants) => {
  const texts = Array.isArray(variants) ? variants : [variants];
  const filtered = Cypress.$(subject).filter((i, el) => {
    const text = Cypress.$(el).text().trim().toLowerCase();
    return texts.some((v) => text.includes(v.toLowerCase()));
  });
  return cy.wrap(filtered); // ovo vraća Cypress chainable
});

/* Custom command to filter TubeIQ task items by multiple text variants (case-insensitive)
 * Usage with single string: cy.get('selector').filterTubeIQByText('Some Text')
 * Usage with array: cy.get('selector').filterTubeIQByText(['Text1', 'Text2', 'Text3'])
 */
Cypress.Commands.add('filterTubeIQByText', { prevSubject: 'element' }, (subject, variants) => {
  const texts = Array.isArray(variants) ? variants : [variants];
  const filtered = Cypress.$(subject).filter((i, el) => {
    const text = Cypress.$(el).text().trim().toLowerCase();
    return texts.some((v) => text.includes(v.toLowerCase()));
  });
  return filtered; // returns jQuery collection
});

// Custom command to click "Load More" button based on total comments count
Cypress.Commands.add('clickLoadMoreTubeIQCommentsByCount', (count) => {
  const clicksNeeded = Math.floor((count - 1) / 10);
  cy.log(`Total comments: ${count}, clicks needed: ${clicksNeeded}`);
  for (let i = 0; i < clicksNeeded; i++) {
    cy.get('#btLoadMore').then(($btn) => {
      if ($btn.is(':visible')) {
        cy.wrap($btn).click({ force: true });
        cy.log(`Clicked Load More (${i + 1}/${clicksNeeded})`);
      } else {
        cy.log('Load More button hidden, stopping early');
      }
    });
  }
});

/* Custom command to encapsulate Input fields on TubeIQ Instance view and select by index number
 * Usage:
 * - get input from (index 2) and enter text
 * cy.getTubeIQInstanceInputs(2).type('some text');
 * - or get 1.st row
 * cy.getTubeIQInstanceInputs(0).should('be.visible');
 */
Cypress.Commands.add('getTubeIQInstanceInputs', (index) => {
  return cy.get(`.fill-row:nth-child(${index + 1})`).find('input');
});

/* Custom command to encapsulate Dropdown fields and select by index number on TubeIQ Instance view
 * Usage:
 * - get dropdown from index 2 and select value
 * cy.getTubeIQInstanceDropdown(2).click().get('li').contains('Some Option').click();
 * - or select by getting 1.st row...
 * cy.getTubeIQInstanceDropdown(2).should('be.visible');
 * Note:
 * ejs-dropdownList does not support .select(), so you need to use .click() and select options manually
 */
Cypress.Commands.add('getTubeIQInstanceDropdown', (index) => {
  return cy.get(`.fill-row:nth-child(${index + 1})`).find('ejs-dropdownlist .e-dropdownlist');
});

/* Custom command to select option from TubeIQ Collateral dropdown by index and option index
 * Usage:
 * - cy.selectTubeIQCollateralDropdownByOption(2, '1');
 * Note:
 * option Yes = index 1, option No = index 0
 */
Cypress.Commands.add('selectTubeIQDropdownOption', (rowIndex, value) => {
  cy.intercept('POST', 'common/calculate').as('calculate');
  // cy.wait('@calculate');
  cy.wait(300);
  // 1 selector - mitigate .find() chain
  cy.get(`.fill-row:nth-child(${rowIndex + 1}) .tubeiq-select`)
    .should('exist')
    .click({ force: true });
  cy.wait(500); // wait for dropdown
  cy.document().then((doc) => {
    const options = doc.querySelector('#ddlelement_options');
    if (!options) {
      throw new Error('Dropdown options container not found');
    }
    const targetLi = options.querySelector(`li.e-list-item[data-value="${value}"]`);
    if (targetLi) {
      targetLi.click();
      cy.log(`Clicked on option: ${targetLi.textContent}`);
    } else {
      throw new Error(`Option with data-value="${value}" not found`);
    }
  });
});

/* Custom command to enter test data for Collateral text inputs
 * Supports textarea, input, and masked textbox elements
 * Usage: cy.enterTubeIQTextInputs(0, "Test namena plasmana");
 */
Cypress.Commands.add('enterTubeIQTextInputs', (rowIndex, text) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait(300);
  cy.get(`.fill-row:nth-child(${rowIndex + 1})`).then(($row) => {
    let element;
    // try textarea
    if ($row.find('textarea[id^="textbox_"]').length) {
      element = $row.find('textarea[id^="textbox_"]')[0];
    }
    // masked textbox
    else if ($row.find('input.e-maskedtextbox').length) {
      element = $row.find('input.e-maskedtextbox')[0];
    }
    // regular text input
    else if ($row.find('input[type="text"]').length) {
      element = $row.find('input[type="text"]')[0];
    }
    // datepicker input (Syncfusion ej2)
    else if ($row.find('input[id$="_input"].e-input').length) {
      element = $row.find('input[id$="_input"].e-input')[0];
    }
    // fallback
    else if (
      $row.find('input:not([type="button"]):not([type="checkbox"]):not([type="radio"])').length
    ) {
      element = $row.find(
        'input:not([type="button"]):not([type="checkbox"]):not([type="radio"])'
      )[0];
    }
    if (element) {
      element.value = text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true })); // bitno za datepicker
      cy.log(`Entered text in ${element.tagName.toLowerCase()}:`, text);
    } else {
      throw new Error(`No text input element found in row ${rowIndex}`);
    }
  });
  // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
});

/*
 * Custom command to enter date values into TubeIQ date input fields
 * Usage:
 * cy.enterTubeIQDateInput("03.02.2025");
 * OR with test data function:
 * cy.enterTubeIQDateInput(getTestData.proposalApplicantExposureTubeIQ());
 */
Cypress.Commands.add('enterTubeIQDateInput', (dateString) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait(300);
  cy.get('input#selectedDate[data-filed-name="selectedDate"]').then(($el) => {
    const element = $el[0];
    if (element) {
      element.value = dateString; // npr. "03.02.2025"
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      cy.log(`Entered date: ${dateString}`);
    } else {
      throw new Error('Date input element not found');
    }
  });
  // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
});

/* Custom command to enter numeric values into TubeIQ numeric input fields
 * Usage:
 * cy.enterTubeIQNumberInputs(0, '1234')
 * cy.enterTubeIQNumberInputs(6, getTestData.proposalDraftLoanAmountTubeIQ());
 */
Cypress.Commands.add('enterTubeIQNumberInputs', (rowIndex, number) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait(300);
  const normalizeNumber = (num) => {
    if (num == null) return '';
    return String(num).replace(/[^\d]/g, '');
  };
  cy.get(`.fill-row:nth-child(${rowIndex + 1})`).then(($row) => {
    let element;
    // visible numerictextbox
    if ($row.find('input.e-numerictextbox').length) {
      element = $row.find('input.e-numerictextbox')[0];
    }
    // fallback: id numerictextbox_*
    else if ($row.find('input[id^="numerictextbox_"]').length) {
      element = $row.find('input[id^="numerictextbox_"]')[0];
    }
    // fallback: hidden numeric input
    else if ($row.find('input.e-numeric-hidden').length) {
      element = $row.find('input.e-numeric-hidden')[0];
    }
    if (element) {
      const normalized = normalizeNumber(number);
      element.value = normalized;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      cy.log(`Entered number in ${element.tagName.toLowerCase()}:`, normalized);
    } else {
      throw new Error(`No numeric input element found in row ${rowIndex}`);
    }
  });
  // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
});

/*Note:
 * Custom command that:
 * - For each key in the object, it checks whether the field is dropdown (.tubeiq-select).
 * - If it is, it clicks to open it, then via document.querySelector('#ddlelement_options')
 * it finds <li> with innerText/data-value and clicks/selects it.
 * - If it is not a dropdown, it treats it as a regular input and fills in the value.
 * - Supports finding fields by label OR placeholder.
 * Usage examples:
 * cy.openAndFillCollateralTableInputs(2, { Godina: '2025', Iznos: '1500', Valuta: 'EUR', Komentar: 'Test' });
 * cy.openAndFillCollateralTableInputs(2, { Valuta: { value: '2' } });
 */
Cypress.Commands.add('openAndFillCollateralTableInputs', (rowIndex, values) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait('@calculate');
  cy.wait(300);
  // Click na "Add new row" - koristi nth-child
  cy.get(`form .fill-row:nth-child(${rowIndex + 1})`)
    .find('button')
    .contains(/Add new row|Dodaj novi red/i)
    .click({ force: true });
  cy.wait('@calculate').its('response.statusCode').should('eq', 200);
  // Wait for popup/dialog to open
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible', { timeout: 10000 }).should('exist');
  // Iterate through values
  Object.entries(values).forEach(([fieldIdentifier, value]) => {
    // Check if it's a dropdown by querying the DOM directly
    cy.document().then((doc) => {
      // Try to find by label first
      let labelElement = Array.from(doc.querySelectorAll('.form-field__label')).find(
        (el) => el.textContent.trim() === fieldIdentifier
      );
      let formField = null;
      let hasDropdown = false;
      if (labelElement) {
        // Found by label
        formField = labelElement.closest('.form-field');
        hasDropdown = formField.querySelector('.tubeiq-select') !== null;
      } else {
        // Try to find by placeholder
        const inputByPlaceholder = doc.querySelector(
          `.e-dlg-content input[placeholder="${fieldIdentifier}"], .e-dlg-content textarea[placeholder="${fieldIdentifier}"]`
        );
        if (inputByPlaceholder) {
          formField = inputByPlaceholder.closest('.form-field');
          hasDropdown = formField ? formField.querySelector('.tubeiq-select') !== null : false;
        }
      }
      if (!formField && !hasDropdown) {
        // If no form field found, assume it's a direct input by placeholder
        cy.get('.e-dlg-content:visible')
          .find(
            `input[placeholder="${fieldIdentifier}"], textarea[placeholder="${fieldIdentifier}"]`
          )
          .type(value, { force: true });
        return;
      }
      if (hasDropdown) {
        // Dropdown logic - try to find by label first, then fallback to other methods
        if (labelElement) {
          cy.contains('.form-field__label', fieldIdentifier)
            .parents('.form-field')
            .find('.tubeiq-select .e-ddl-icon')
            .click({ force: true });
        } else {
          // Find dropdown within the form field that contains the input with placeholder
          cy.get('.e-dlg-content:visible')
            .find(
              `input[placeholder="${fieldIdentifier}"], textarea[placeholder="${fieldIdentifier}"]`
            )
            .parents('.form-field')
            .find('.tubeiq-select .e-ddl-icon')
            .click({ force: true });
        }
        cy.wait(500); // small delay for popup to mount
        cy.document().then((doc) => {
          const options = doc.querySelector('#ddlelement_options');
          if (!options) throw new Error('Dropdown options container not found');
          const targetLi =
            typeof value === 'object' && value.value
              ? options.querySelector(`li.e-list-item[data-value="${value.value}"]`)
              : Array.from(options.querySelectorAll('li.e-list-item')).find(
                  (li) => li.textContent.trim() === value
                );
          if (targetLi) {
            targetLi.click(); // direct DOM click
            cy.log(`Clicked on dropdown option for ${fieldIdentifier}:`, targetLi.textContent);
          } else {
            throw new Error(`Option "${value}" not found in dropdown for ${fieldIdentifier}`);
          }
        });
      } else {
        // Regular input/textarea logic - by placeholder
        cy.get('.e-dlg-content:visible')
          .find(
            `input[placeholder="${fieldIdentifier}"], textarea[placeholder="${fieldIdentifier}"]`
          )
          .type(value, { force: true });
      }
    });
  });
  cy.saveTubeIQInstancePopup();
});

// Custom command to fill in text input popups
Cypress.Commands.add('openAndFillCollateralSWOTTables', (rowIndex, value) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait('@calculate');
  cy.wait(300);
  // nth-child is 1-indexed, so +1 to rowIndex
  cy.get(`.fill-row:nth-child(${rowIndex + 1})`)
    .find('button')
    .contains(/Add new row|Dodaj novi red/i)
    .click({ force: true });
  cy.wait('@calculate').its('response.statusCode').should('eq', 200);
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible', { timeout: 10000 }).should('exist');
  // Fill input in dialog
  cy.get('.e-dlg-content:visible').find('input, textarea').type(value, { force: true });
  // Save
  cy.saveTubeIQInstancePopup();
});

// Custom command to open file from dropzone by container name
// Usage: cy.openFileFromContainer('RiskMisljenje', 'Risk mišljenje.docx');
Cypress.Commands.add('openFileFromContainer', (containerName, fileName) => {
  cy.get(`div[data-name="${containerName}"]`)
    .should('exist')
    .within(() => {
      cy.get('.dz-filename span[data-dz-name]').should('contain.text', fileName); // validate file name
      cy.get('a.dz-open').should('contain', 'Open file').click({ force: true }); // click "Open file"
    });
});

// Custom command to print TubeIQ documents from instance view
Cypress.Commands.add('printDocumentsInstanceView', () => {
  cy.get('generate-documents ejs-dialog #dialog_dialog-content')
    .find('button')
    .shouldContainAnyText(['Print', 'Štampaj'])
    .click({ force: true });
});

// Custom command to close TubeIQ documents instance view
Cypress.Commands.add('closeDocumentsInstanceView', () => {
  cy.get('generate-documents ejs-dialog .e-footer-content')
    .find('button')
    .shouldContainAnyText(['Close', 'Zatvori'])
    .click({ force: true });
});
/* Custom command to verify file extensions
 * checks if the file exists in cypress/downloads, if the name matches one of the allowed names (with or without extension),
 * if it ends with the expected extension, and logs what was actually found:
 * Usage:
 * - Only file name, path is set to: cypress/downloads/
 * 1. cy.verifyFileNameAndExtension('KreditniProcesKreditiPredlog.docx', '.docx');
 * 2. cy.verifyFileNameAndExtension(
 * ['KreditniProcesKreditiPredlog', 'Kreditni predlog'],'docx');
 * 3. cy.verifyFileNameAndExtension('data', 'xlsx');
 * - Or use full path:
 * 1. cy.verifyFileNameAndExtension('cypress/downloads/document.docx', '.docx');
 * 2. cy.verifyFileNameAndExtension('cypress/downloads/report.pdf', 'pdf');
 * 3. cy.verifyFileNameAndExtension('cypress/downloads/data.xlsx', '.xlsx');
 */
Cypress.Commands.add('verifyFileNameAndExtension', (fileOrNames, expectedExtension) => {
  const downloadsFolder = 'cypress/downloads';
  // Normalizuj ekstenziju (uvek sa tačkom, mala slova)
  const extension = expectedExtension.startsWith('.')
    ? expectedExtension.toLowerCase()
    : `.${expectedExtension.toLowerCase()}`;
  // Ako je prosleđen string → pretvori u array
  const names = Array.isArray(fileOrNames) ? fileOrNames : [fileOrNames];
  // Formiraj punu putanju za svaki naziv
  const possiblePaths = names.map((name) => {
    const fullName = name.toLowerCase().endsWith(extension) ? name : `${name}${extension}`;
    return fullName.includes(downloadsFolder) ? fullName : `${downloadsFolder}/${fullName}`;
  });
  // Proveri da li se bilo koji od path-ova završava na očekivanu ekstenziju
  const regex = new RegExp(`\\${extension}$`, 'i');
  const match = possiblePaths.some((path) => regex.test(path));
  expect(
    match,
    `File should have one of the names with ${extension} extension: ${possiblePaths.join(', ')}`
  ).to.be.true;
});

/* Custom command to read all file types
 * Usage:
 * - For text files:
 * cy.readDownloadedFile('document.txt').should('contain', 'expected text');
 * - For binary files (without encoding):
 * cy.readDownloadedFile('document.pdf', 'binary').should('exist');
 */
Cypress.Commands.add('readDownloadedFile', (fileName, encoding = null) => {
  const filePath = fileName.includes('cypress/downloads/')
    ? fileName
    : `cypress/downloads/${fileName}`;
  return cy.readFile(filePath, encoding, { timeout: 10000 });
});

/* Custom command to read Word documents
 * Usage:
 * - For .docx with text extraction:
 * cy.readDocxFile('KreditniProcesKreditiPredlog.docx')
 *  .should('contain', getTestData.creditProposalDocumentData());
 */
Cypress.Commands.add('readDocxFile', (fileName) => {
  const filePath = fileName.includes('cypress/downloads/')
    ? fileName
    : `cypress/downloads/${fileName}`;
  return cy.task('readDocxFile', filePath);
});

/*Custom command to normalize text (removes extra whitespace, tabs, newlines)
 *Usage:
 *- For manual text normalization:
 * cy.normalizeText('Text  with   multiple    spaces').then((normalized) => {
 *  expect(normalized).to.equal('Text with multiple spaces');
 *});
 */
Cypress.Commands.add('normalizeText', (text) => {
  return text.replace(/\s+/g, ' ').trim();
});

/* Custom command to verify .docx content with normalization + regex fallback
 * Usage:
 * - Single file:
 *   cy.verifyDocxContent('KreditniProcesKreditiPredlog.docx', getTestData.creditProposalDocumentData());
 * - Multiple possible files:
 *   cy.verifyDocxContent(['KreditniProcesKreditiPredlog.docx', 'Kreditni predlog .docx'], getTestData.creditProposalDocumentData());
 */
Cypress.Commands.add('verifyDocxContent', (fileOrNames, expectedData) => {
  const downloadsFolder = 'cypress/downloads';
  const names = Array.isArray(fileOrNames) ? fileOrNames : [fileOrNames];
  const normalizeText = (text) =>
    String(text || '')
      .replace(/\s+/g, ' ') // all whitespace to one space
      .replace(/\u00A0/g, ' ') // non-breaking space
      .replace(/\u00AD/g, '') // soft hyphen
      .replace(/[^\x20-\x7EčćžšđČĆŽŠĐ]/g, '') // remove all outside standard range except our letters
      .trim()
      .toLowerCase();
  cy.task('findFirstExistingFile', { folder: downloadsFolder, fileNames: names }).then(
    (foundFile) => {
      expect(foundFile, `Expected one of: ${names.join(', ')} but none were found`).to.not.be.null;
      cy.log(`Found file: ${foundFile}`);
      cy.task('readDocxFile', foundFile).then((docText) => {
        const normalizedDoc = normalizeText(docText);
        expectedData.forEach((expected) => {
          const normalizedExpected = normalizeText(expected);
          // regex fallback for patterns like "datum: ____ godine."
          if (normalizedExpected.startsWith('datum:')) {
            const regex = /datum:\s*_+\s*godine\./i;
            expect(regex.test(normalizedDoc), `Expected DOCX to contain pattern: "${expected}"`).to
              .be.true;
          } else {
            expect(
              normalizedDoc.includes(normalizedExpected),
              `Expected DOCX to contain: "${expected}"`
            ).to.be.true;
          }
        });
      });
    }
  );
});

// Custom command to delete downloads
Cypress.Commands.add('clearDownloadsFolder', () => {
  const downloadsFolder = 'cypress/downloads';
  cy.task('deleteFolder', downloadsFolder);
});

// Custom command to close instance view popup
Cypress.Commands.add('cancelTubeIQInstancePopup', () => {
  cy.get('ejs-dialog.tubeiq-relationship-dialog.e-popup-open:visible', { timeout: 10000 }).should(
    'exist'
  );
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible')
    .find('button.relationship-dialog-custom-close-button')
    .click({ force: true });
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible').should('not.exist');
});

// Custom command to close instance popup by Save button
Cypress.Commands.add('saveTubeIQInstancePopup', () => {
  cy.get('ejs-dialog.tubeiq-relationship-dialog.e-popup-open:visible', { timeout: 10000 }).should(
    'exist'
  );
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible')
    .find('button')
    .filterByText(['Sačuvaj', 'Save'])
    .click({ force: true });
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible').should('not.exist');
});

/* Custom command to assert digit inputs - chainable
 * Usage: cy.assertReadonlyDigits(3, 8); - through index
 * cy.get(...).assertReadonlyDigits(8);
 */
Cypress.Commands.add(
  'assertReadonlyDigits',
  { prevSubject: 'element' }, // makes this command chainable
  (subject, count) => {
    const regex = new RegExp(`^\\d{${count}}$`);
    cy.wrap(subject).should(($input) => {
      expect($input.val()).to.match(regex);
    });
  }
);
/* Custom command to select radio buttons by label text (supports multiple variants)
 * Usage: cy.selectRadioByLabel('No'); cy.selectRadioByLabel('Ne');
 * cy.selectRadioByLabel('Да'); cy.selectRadioByLabel('Yes'); cy.selectRadioByLabel('Da');
 */
Cypress.Commands.add('selectRadioByLabel', (labelText) => {
  const variants = {
    No: ['No', 'Ne', 'Не'],
    Yes: ['Yes', 'Da', 'Да'],
  };
  // find all texts for given labelText
  const texts = variants[labelText] || [labelText];
  // find the label that holds any text variant
  cy.contains('label', new RegExp(texts.join('|')))
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).check({ force: true });
    });
});

/* Custom command to assert every task contains "<text>" - with normalization and support for multiple variants
 * Usage:
 * - cy.iterateTaskItems(); default text
 * - or cy.iterateTaskItems('Some Other Text'); custom text
 */
Cypress.Commands.add('iterateTaskItems', (searchText) => {
  const normalizeText = (text) =>
    String(text || '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();
  const toRequiredArray = (input) => {
    if (Array.isArray(input)) {
      return input.map(normalizeText).filter(Boolean);
    }
    if (typeof input === 'string') {
      return input.split(',').map(normalizeText).filter(Boolean);
    }
    const asString = normalizeText(String(input || ''));
    return asString ? asString.split(',').map(normalizeText).filter(Boolean) : [];
  };
  const requiredTexts = toRequiredArray(searchText);
  cy.get('#items-wrapper li.taskitem').then(($els) => {
    const allTexts = $els.toArray().map((el) => normalizeText(el.innerText));
    requiredTexts.forEach((req) => {
      const found = allTexts.some((text) => text.includes(req));
      expect(found, `Should contain "${req}"`).to.be.true;
    });
  });
});

/* Custom command for selecting a menu item by partial text match
 * Usage: cy.selectMenuItemByPartialText('MyAll');
 */
Cypress.Commands.add('selectMenuItemByPartialText', (partialText) => {
  cy.get('#btnListMenu').click({ force: true });
  cy.get('#listMenu li a')
    .filter((i, el) => el.innerText.toLowerCase().includes(partialText.toLowerCase()))
    .first()
    .click({ force: true });
});

/* Custom command: attachDocumentByIndex
 * Usage: cy.attachDocumentByIndex(0, 'file.pdf', 'Automated Test Note');
 */
Cypress.Commands.add('attachDocumentByIndex', (index, fileName, noteText) => {
  const filePath = `cypress/fixtures/${fileName}`;
  cy.get('app-documents .padding-container.with-status-bar app-manage-attachments-for-object')
    .eq(index)
    .within(() => {
      // wait for overlay to disapeer before click
      cy.get('.e-dlg-overlay').should('not.exist');
      cy.get('.top-block button').should('be.enabled').click({ force: true });
    });
  Assert.attachNewDocumentPopupVisible();
  cy.get('ejs-dialog.e-dialog.e-dlg-modal.e-popup-open')
    .first()
    .within(() => {
      // Target actual editable <textarea>
      cy.get('textarea.e-textbox.e-input').clear({ force: true }).type(noteText, { force: true });
      // upload fajls
      cy.get('#file')
        .invoke('show') // remove display:none
        .selectFile(filePath, { force: true });
      Assert.fileAttachmentsVisible(fileName);
      cy.clickPopupSaveButton();
    });
  Assert.dataSuccessfullySavedToastVisible();
  // Check that popup is closed (class switched)
  cy.get('ejs-dialog.e-dialog.e-dlg-modal').should('have.class', 'e-popup-close');
});

/* Custom command to assert that the element's text matches any of the provided variants (case-insensitive)
 * Usage: cy.get('selector').shouldContainAnyText(['Text1', 'Text2', 'Текст3'])
 */
Cypress.Commands.add('shouldContainAnyText', { prevSubject: 'element' }, (subject, variants) => {
  const normalizeText = (text) =>
    text
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/[\n\r\t]+/g, ' ')
      .trim()
      .toLowerCase();
  cy.wrap(subject).then(($el) => {
    const rawText = Cypress.$($el).text();
    // Debug log can be uncommented if needed
    // cy.log(`Actual text: "${rawText}"`);
    const normalized = normalizeText(rawText);
    const match = variants.some((v) => normalized.includes(normalizeText(v)));
    expect(match, `Element should contain one of: ${variants.join(', ')}`).to.be.true;
  });
});

// Custom command to click on Save button within the popup window
Cypress.Commands.add('clickPopupSaveButton', () => {
  cy.get('.e-footer-content')
    .find('button')
    .filterByText(['Save', 'Sačuvaj', 'Сачувај'])
    .click({ force: true });
});

// Custom command to get Toast messages and verify text
Cypress.Commands.add('getToastWithText', (expectedTexts) => {
  // expectedTexts can be an array of strings or regex
  const regex = Array.isArray(expectedTexts) ? new RegExp(expectedTexts.join('|')) : expectedTexts;
  return cy.get('[id^="toast_"] .e-toast-message').filter((_, el) => regex.test(el.innerText));
});

/* Custom command to upload file in AOFI portal from presetted file path by file name and type
 * Usage: cy.uploadFileAOFI('document.pdf');
 */
Cypress.Commands.add('uploadFileAOFI', (fileName) => {
  const filePath = `cypress/fixtures/${fileName}`;
  cy.get('#file')
    .invoke('show') // removes display:none
    .selectFile(filePath);
});

/* Custom command to delete all TubeIQ Instance attachments from a specific uploader box
 * Usage:
 *   cy.deleteAllTubeIQInstanceAttachmentsFromBox()    // default prvi box (index 0)
 *   cy.deleteAllTubeIQInstanceAttachmentsFromBox(1)   // drugi box
 */
Cypress.Commands.add('deleteAllTubeIQInstanceAttachmentsFromBox', (boxIndex = 0) => {
  function deleteNext() {
    cy.get('.tubeiq-uploader')
      .eq(boxIndex)
      .find('.e-upload-files')
      .then(($container) => {
        const items = $container.find('li.e-upload-file-list');
        if (items.length > 0) {
          cy.wrap(items[0]).find('.e-file-remove-btn').click({ force: true });
          cy.wait(300); // Syncfusion DOM refresh
          deleteNext(); // repeat while there are files
        } else {
          cy.log(`No attachments left in box ${boxIndex}`);
        }
      });
  }
  deleteNext();
});

/* Custom command to delete all TubeIQ Instance attachments
 * Usage: cy.deleteAllTubeIQInstanceAttachments()
 */
Cypress.Commands.add('deleteAllTubeIQInstanceAttachments', () => {
  function deleteNext() {
    cy.get('.e-upload-files').then(($container) => {
      const items = $container.find('.e-upload-file-list');
      if (items.length > 0) {
        // click on first delete button
        cy.wrap(items[0]).find('.e-file-remove-btn').click({ force: true });
        // wait for DOM refresh
        cy.wait(300);
        // recurse
        deleteNext();
      } else {
        cy.log('No attachments left');
      }
    });
  }
  deleteNext();
});

/* Custom command to upload a file from fixtures folder to TubeIQ Instance attachment uploader, selecting uploader by index
 * Usage: cy.uploadFileTubeIQ('document.docx', 0);
 */
Cypress.Commands.add('uploadFileTubeIQ', (fileName, index = 0) => {
  const filePath = `cypress/fixtures/${fileName}`;
  cy.get('[id^="uploader_"]')
    .eq(index)
    .should('exist')
    .invoke('show') // remove display:none
    .selectFile(filePath, { force: true });
  // post-condition: check that the file appeared in the list
  cy.get('.e-upload-files .file-name').contains(fileName).should('exist');
  cy.log(`Uploaded file: ${fileName} into uploader #${index}`);
});

/* Custom command to upload files from downloads folder to TubeIQ Instance attachment uploader, selecting uploader by index
 * Usage: cy.uploadDocumentFileTubeIQ('document.docx', 0)
 * cy.uploadD
 */
Cypress.Commands.add('uploadDocumentFileTubeIQ', (fileName, index = 0, options = {}) => {
  const filePath = `cypress/downloads/${fileName}`;
  const timeout = options.timeout || 10000;
  // Check if the file exists in file path
  cy.readFile(filePath).should('exist');
  // Select real <input type="file">
  cy.get('input[type="file"][id^="uploader_"]', { timeout })
    .eq(index)
    .should('exist')
    .selectFile(filePath, { force: true, action: 'select' });
  // Wait for upload to finish
  cy.get('.e-upload-files', { timeout }).should('exist');
  cy.get('.e-upload-files .file-name', { timeout })
    .contains(fileName)
    .should('exist')
    .then(() => {
      cy.log(`✓ File uploaded successfully: ${fileName}`);
    });
});

/*
 * A custom Cypress command to close all modal popups or overlay elements.
 * This command iterates through common popup selectors and clicks them until
 * no popups remain. Supports case-insensitive text matching and custom selectors.
 * Usage:
 * cy.closeAllPopups();
 * cy.closeAllPopups(['.custom-popup-close', '[data-test="dismiss"]']);
 * @param {string[]} customSelectors - Optional array of additional selectors to check.
 */
Cypress.Commands.add('closeAllPopups', (customSelectors = []) => {
  const defaultSelectors = [
    '[aria-label="Close"]',
    '.modal-close-button',
    '.popup-close',
    '.overlay-dismiss',
    '.modal-button-save', // Yes button
    '.modal-button-close', // No button
    '.modal-error .e-dlg-closeicon-btn', // error dialog close
  ];
  const textSelectors = ['Close', 'Cancel', 'x'];
  const allSelectors = [...defaultSelectors, ...customSelectors];
  const closePopup = () => {
    cy.get('body', { log: false }).then(($body) => {
      let popupFound = false;
      // standard selectors
      for (const selector of allSelectors) {
        const $el = $body.find(selector).filter(':visible');
        if ($el.length > 0) {
          popupFound = true;
          cy.wrap($el.first(), { log: false }).click({ force: true, log: false });
          // scope na parent dialog, ne na sve
          cy.wrap($el.first().closest('[role="dialog"]')).should('not.exist');
          Cypress.log({
            name: 'closeAllPopups',
            displayName: 'closeAllPopups',
            message: `Closed a popup using selector: "${selector}"`,
            consoleProps: () => ({ 'Selector Found': selector }),
          });
          break;
        }
      }
      // text-based buttons
      if (!popupFound) {
        for (const text of textSelectors) {
          const $el = $body
            .find('button:visible')
            .filter((_, el) => el.innerText.trim().toLowerCase() === text.toLowerCase());
          if ($el.length > 0) {
            popupFound = true;
            cy.wrap($el.first(), { log: false }).click({ force: true, log: false });
            cy.wrap($el.first().closest('[role="dialog"]')).should('not.exist');
            Cypress.log({
              name: 'closeAllPopups',
              displayName: 'closeAllPopups',
              message: `Closed a popup button with text: "${text}"`,
              consoleProps: () => ({ 'Text Found': text }),
            });
            break;
          }
        }
      }
      // recursion only if something was actually closed
      if (popupFound) {
        closePopup();
      } else {
        Cypress.log({
          name: 'closeAllPopups',
          displayName: 'closeAllPopups',
          message: 'No more popups found to close.',
        });
      }
    });
  };
  closePopup();
});

// Custom command for TubeIQ API login attempt
Cypress.Commands.add('tubeIQApiLogin', () => {
  return cy
    .env(['tubeIQ_valid_login_email', 'tubeIQ_valid_login_password'])
    .then(({ tubeIQ_valid_login_email, tubeIQ_valid_login_password }) => {
      return cy.request('GET', '/Account/Login').then((resp) => {
        const $html = Cypress.$(resp.body);
        const domToken = $html.find('input[name="__RequestVerificationToken"]').val();
        const cookies = resp.headers['set-cookie'];
        let tokenCookie;
        if (cookies) {
          const match = cookies.find((c) => c.startsWith('__RequestVerificationToken'));
          if (match) {
            tokenCookie = match.split(';')[0];
          }
        }
        // If there is no token → immediately return response so the test can assert negative
        if (!domToken || !tokenCookie) {
          return { status: 400, body: 'Missing CSRF token' };
        }
        // Otherwise send POST as fetch does
        return cy.request({
          method: 'POST',
          url: '/', // root
          form: true,
          failOnStatusCode: false,
          body: {
            __RequestVerificationToken: domToken,
            Email: tubeIQ_valid_login_email,
            Password: tubeIQ_valid_login_password,
          },
          headers: {
            Cookie: tokenCookie,
            'content-type': 'application/x-www-form-urlencoded',
            referrer: '/Account/Login',
          },
        });
      });
    });
});
