export class LegalEntitiesPageAOFI {
  setRadioButtonNegative() {
    cy.get('app-legal-entity-grid .grid-list form').within(() => {
      cy.selectRadioByLabel('No');
    });
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-legal-entity-grid');
  }
}
export const onLegalEntitiesPage = new LegalEntitiesPageAOFI();
