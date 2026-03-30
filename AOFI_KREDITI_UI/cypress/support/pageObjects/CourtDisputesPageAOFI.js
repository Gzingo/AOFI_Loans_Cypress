export class CourtDisputesPageAOFI {
  setRadioButtonNegative() {
    cy.get('app-dispute-grid .grid-list form').within(() => {
      cy.selectRadioByLabel('No');
    });
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-dispute-grid');
  }
}
export const onCourtDisputePage = new CourtDisputesPageAOFI();
