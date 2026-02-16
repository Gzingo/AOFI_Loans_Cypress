export class CompetitorsPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-most-significant-competitors-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }
}
export const onCompetitorsPage = new CompetitorsPageAOFI();
