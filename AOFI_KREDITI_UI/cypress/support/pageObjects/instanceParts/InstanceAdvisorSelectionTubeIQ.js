export class InstanceAdvisorSelectionTubeIQ {
  selectAdvisorTubeIQ() {
    cy.scrollToBottom(1);
    cy.getTubeIQInstanceInputs(12).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir kreditnog referenta"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

  selectRiskAdvisorTubeIQ() {
    cy.scrollToBottom(1);
    cy.getTubeIQInstanceInputs(19).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir savetnika za rizike"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

  selectOpinionFinalizationRiskAdvisorTubeIQ() {
    cy.getTubeIQInstanceInputs(0).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir kreditnog referenta"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

  selectCreditProposalCompletionLegalAdvisorTubeIQ() {
    cy.getTubeIQInstanceInputs(0).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir referenta pravne službe"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }
}
