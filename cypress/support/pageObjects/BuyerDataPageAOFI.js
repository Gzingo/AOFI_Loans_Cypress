import { Assert } from './assertions';
import { getTestData } from './TestData';

export class BuyerDataPageAOFI {
  addForeignBuyer() {
    cy.get('[gridtitle="Foreign buyers"]').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkForeignBuyersPopupVisible();
  }

  fillInForeignBuyerData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="buyerName"]').clear().type('Automated Test Foreign buyer');
      cy.get('number[formcontrolname="percentageOfTotalSales"]').clear().type('100');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-buyer-data');
  }

  deleteAllFirstMatchingForeignBuyer() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-domestic-foreign-grid[gridtitle="Foreign buyers"] .e-gridcontent tbody tr',
      name: getTestData.foreignBuyerNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteDomesticOrForeign',
      alias: 'deleteForeignBuyer',
      logContext: 'Foreign buyers',
    });
  }
}
export const onBuyerDataPage = new BuyerDataPageAOFI();
