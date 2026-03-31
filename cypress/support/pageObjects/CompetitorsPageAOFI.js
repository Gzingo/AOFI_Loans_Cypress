export class CompetitorsPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-most-significant-competitors-grid');
  }
}
export const onCompetitorsPage = new CompetitorsPageAOFI();
