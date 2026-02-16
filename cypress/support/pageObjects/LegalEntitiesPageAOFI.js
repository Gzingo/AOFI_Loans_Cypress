export class LegalEntitiesPageAOFI {
  setRadioButtonNegative() {
    cy.get('app-legal-entity-grid .grid-list form').within(() => {
      cy.selectRadioByLabel('No');
    });
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-legal-entity-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }
}
export const onLegalEntitiesPage = new LegalEntitiesPageAOFI();
