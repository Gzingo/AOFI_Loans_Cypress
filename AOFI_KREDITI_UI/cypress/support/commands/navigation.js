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

// Search for existing loan request by ID, verify it's visible, and open it
Cypress.Commands.add('openExistingLoanRequest', (requestId) => {
  const { onRequestPageAOFI } = require('../pageObjects/RequestPageAOFI');
  const { Assert } = require('../pageObjects/assertions');
  onRequestPageAOFI.searchCreatedLoanRequest(requestId);
  Assert.searchedCreditRequestVisible(requestId);
  onRequestPageAOFI.clickEditLoanRequestButton();
});
