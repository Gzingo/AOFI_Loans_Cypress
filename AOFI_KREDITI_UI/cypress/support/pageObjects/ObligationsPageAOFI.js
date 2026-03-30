export class ObligationsPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-obligations-grid');
  }
}
export const onObligationsPage = new ObligationsPageAOFI();
