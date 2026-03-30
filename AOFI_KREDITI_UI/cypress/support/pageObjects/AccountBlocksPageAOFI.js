export class AccountBlocksPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-account-block-data');
  }
}
export const onAccountBlocksPage = new AccountBlocksPageAOFI();
