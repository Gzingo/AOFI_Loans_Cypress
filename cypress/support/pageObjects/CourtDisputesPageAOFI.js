export class CourtDisputesPageAOFI {
  setRadioButtonNegative() {
    cy.get('app-dispute-grid .grid-list form').within(() => {
      cy.selectRadioByLabel('No');
    });
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-dispute-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }
}
export const onCourtDisputePage = new CourtDisputesPageAOFI();
