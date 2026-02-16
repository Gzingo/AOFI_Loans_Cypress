export class LoginPageAOFI {
  // Helper for login with Enter key (Pravno Lice)
  loginWithEnterKey() {
    cy.intercept('POST', `**/api/account/login`).as('loginCall');
    cy.env(['pravnoLice_email', 'pravnoLice_password']).then(
      ({ pravnoLice_email, pravnoLice_password }) => {
        cy.fillFormField('email', pravnoLice_email).should('have.value', pravnoLice_email);
        cy.fillFormField('password', pravnoLice_password)
          .should('have.value', pravnoLice_password)
          .type('{enter}');
      }
    );
  }

  clickLoginButton() {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('be.enabled')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.match(/Пријава|Prijava/i);
      });
    cy.get('button[type="submit"]')
      .click({ force: true })
      .then(() => {
        Cypress.log({
          name: 'clickLoginButton',
          message: '✅ Submit button clicked successfully',
        });
      });
  }

  leaveLoginInputsEmpty() {
    cy.get(`[formcontrolname="email"] input`).should('be.visible').clear();
    cy.get(`[formcontrolname="password"] input`).should('be.visible').clear();
  }

  // Helper to enter only email input (Pravno Lice)
  enterOnlyEmailInput() {
    cy.env(['pravnoLice_email']).then(({ pravnoLice_email }) => {
      cy.fillFormField('email', pravnoLice_email).should('have.value', pravnoLice_email);
    });
  }

  // Helper to enter only password input (Pravno Lice)
  enterOnlyPasswordInput() {
    cy.env(['pravnoLice_password']).then(({ pravnoLice_password }) => {
      cy.fillFormField('password', pravnoLice_password).should('have.value', pravnoLice_password);
    });
  }

  getTokenFromLocalStorage() {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.exist;
    });
  }

  clickLogOutButton() {
    cy.get('[role="toolbar"]').find('[id="options-dropdown"]').click();
    cy.get('[id="options-dropdown-popup"]').within(() => {
      cy.get('[role="menuitem"]')
        .contains(/Odjavi se|Logout/i)
        .should('be.visible')
        .click();
    });
  }
}
export const onLoginAOFI = new LoginPageAOFI();
