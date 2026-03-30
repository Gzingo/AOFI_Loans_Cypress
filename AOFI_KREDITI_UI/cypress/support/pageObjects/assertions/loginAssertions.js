export class LoginAssertions {
  successfulPravnoLiceLogin() {
    cy.env(['pravnoLice_username']).then(({ pravnoLice_username }) => {
      cy.url().should('contain', 'request');
      cy.get('[role="toolbar"]').should('contain', pravnoLice_username);
    });
  }

  successfulPreduzetnikLogin() {
    cy.env(['preduzetnik_username']).then(({ preduzetnik_username }) => {
      cy.url().should('contain', 'request');
      cy.get('[role="toolbar"]').should('contain', preduzetnik_username);
    });
  }

  unsuccessfulLoginInput() {
    cy.url().should('contain', 'auth/login');
    cy.get('validation-error')
      .should('be.visible')
      .shouldContainAnyText(['Поље је обавезно.', 'Polje je obavezno.']);
  }

  unsuccessfulLogin() {
    cy.url().should('contain', 'auth/login');
    cy.get('ejs-dialog')
      .should('be.visible')
      .shouldContainAnyText(['Неисправни емаил или лозинка.', 'Neispravni email ili lozinka.']);
  }

  successfulLogout() {
    cy.url().should('contain', 'auth/login');
    cy.get('button[type="submit"]')
      .should('be.visible')
      .shouldContainAnyText(['Пријава', 'Prijava']);
  }

  checkRegisterButton() {
    cy.get('input[type="submit"]')
      .should('be.visible')
      .should('be.enabled')
      .invoke('attr', 'value')
      .then((text) => {
        expect(text).to.match(/Register|Registracija/i);
      });
  }

  successfulRegistrationPageLoad() {
    cy.url().should('contain', 'Account/Register');
    cy.get('.col-md-6 h2')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const normalized = text.trim();
        const allowed = ['Prijavite se', 'Пријавите се'];
        const matchFound = allowed.some((variant) => normalized.includes(variant));
        expect(matchFound, `Expected title: "${normalized}"`).to.be.true;
      });
  }

  successfulConfirmEmailPageLoad() {
    cy.url().should('contain', 'Account').and('contain', 'ConfirmEmail');
  }

  confirmTubeIQLoginURL() {
    cy.env(['tubeIQ_url']).then(({ tubeIQ_url }) => {
      cy.url().should('contain', tubeIQ_url);
    });
  }

  confirmTubeIQDashboardURL() {
    cy.url().should('include', '/My/Home');
  }

  confirmUserNotLoggedInTubeIQ() {
    cy.url().should('not.include', '/My/Home');
  }

  apiLoginTubeIQFails(resp) {
    expect([200, 400, 500]).to.include(resp.status);
    if (resp.body === 'Missing CSRF token') {
      expect(resp.status).to.eq(400);
    } else {
      expect(resp.body).to.include('<title>Building Smart Process Apps - TubeIQ</title>');
    }
  }

  unsuccessfulTubeIQLogin() {
    cy.get('form[id="Login"]').should('be.visible').and('contain', 'Invalid login attempt.');
  }
}
