export class AccountBlocksPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-account-block-data').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus'); //.its('response.statusCode').should('eq', 200);
  }
}
export const onAccountBlocksPage = new AccountBlocksPageAOFI();
