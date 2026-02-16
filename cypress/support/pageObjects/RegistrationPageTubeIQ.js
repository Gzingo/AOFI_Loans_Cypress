export class RegistrationPageTubeIQ {
  enterTubeIQRegistrationEmail() {
    cy.generateTestEmail().then((email) => {
      cy.wrap(email).as('testEmail');
      cy.fillFormFieldTubeIQ('Email', email);
    });
  }

  enterTubeIQRegistrationPassword() {
    cy.env(['tubeIQ_registration_password']).then(({ tubeIQ_registration_password }) => {
      cy.fillFormFieldTubeIQ('Password', tubeIQ_registration_password);
    });
  }

  clickRegisterButton() {
    cy.get('input[type="submit"]').should('be.visible').click();
  }

  readEmail() {
    cy.get('@testEmail').then((email) => {
      cy.getLatestEmailFor(email).then((message) => {
        cy.log('Subject:', message.subject);
        cy.log('HTML body:', message.htmlBody);
        // Parse first link that contains ConfirmEmail
        cy.log(message.htmlBody?.match(/href="([^"]*ConfirmEmail[^"]+)"/i));
        const linkMatch = message.htmlBody?.match(/href="([^"]*ConfirmEmail[^"]+)"/i);
        if (linkMatch && linkMatch[1]) {
          const rawLink = linkMatch[1];
          const confirmationLink = rawLink.replace(/&amp;/g, '&');
          cy.log('Confirmation Link:', confirmationLink);
          cy.visit(confirmationLink);
        } else {
          cy.log('There is no confirmation link in mail');
          throw new Error('Confirmation Link was not found!');
        }
      });
    });
  }
}
export const onRegistrationTubeIQ = new RegistrationPageTubeIQ();
