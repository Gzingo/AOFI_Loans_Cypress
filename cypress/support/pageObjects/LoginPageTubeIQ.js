export class LoginPageTubeIQ {
  // Helper to fill in TubeIQ login email
  fillInLoginEmail() {
    cy.env(['tubeIQ_valid_login_email']).then(({ tubeIQ_valid_login_email }) => {
      cy.fillFormFieldTubeIQ('Email', tubeIQ_valid_login_email);
    });
  }

  // Helper to fill in TubeIQ login password
  fillInLoginPassword() {
    cy.env(['tubeIQ_valid_login_password']).then(({ tubeIQ_valid_login_password }) => {
      cy.fillFormFieldTubeIQ('Password', tubeIQ_valid_login_password);
    });
  }

  leaveLoginInputFieldsEmpty() {
    cy.fillFormFieldTubeIQ('Email', ' ');
    cy.fillFormFieldTubeIQ('Password', ' ');
  }

  // Helper to fill invalid login inputs
  invalidLoginInputs() {
    cy.env(['invalid_email', 'invalid_password']).then(({ invalid_email, invalid_password }) => {
      cy.fillFormFieldTubeIQ('Email', invalid_email);
      cy.fillFormFieldTubeIQ('Password', invalid_password);
    });
  }

  // Helper to leave email input empty
  leaveEmailInputEmpty() {
    cy.env(['tubeIQ_valid_login_password']).then(({ tubeIQ_valid_login_password }) => {
      cy.fillFormFieldTubeIQ('Email', ' ');
      cy.fillFormFieldTubeIQ('Password', tubeIQ_valid_login_password);
    });
  }

  // Helper to leave password input empty
  leavePasswordInputEmpty() {
    cy.env(['tubeIQ_valid_login_email']).then(({ tubeIQ_valid_login_email }) => {
      cy.fillFormFieldTubeIQ('Email', tubeIQ_valid_login_email);
      cy.fillFormFieldTubeIQ('Password', ' ');
    });
  }

  clickLoginButton() {
    cy.get('form input[type="submit"]').click();
  }

  pressEnterOnLoginButton() {
    cy.get('form input[type="submit"]').type('enter');
  }
}
export const onLoginTubeIQPage = new LoginPageTubeIQ();
