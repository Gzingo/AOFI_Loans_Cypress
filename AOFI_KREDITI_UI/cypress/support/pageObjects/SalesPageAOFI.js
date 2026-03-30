import { Assert } from './assertions';
import { getTestData } from './TestData';

export class Sales {
  addNewSalesData() {
    cy.get('app-main-product-group-grid .multi-grid-list')
      .find('.top-block')
      .within(() => {
        cy.get('button').should('exist').click();
      });
    Assert.checkSalesPopupVisible();
  }

  fillInSalesData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="product"]').clear().type('Automated Test - Champignons');
      cy.get('number[formcontrolname="currentYear"]').clear().type('440600');
      cy.get('number[formcontrolname="currentYearPercentage"]').clear().type('62');
      cy.get('number[formcontrolname="previousYear"]').clear().type('585986');
      cy.get('number[formcontrolname="previousYearPercentage"]').clear().type('100');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  deleteAllFirstMatchingSalesProduct() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-main-product-group-grid .e-gridcontent tbody tr',
      name: getTestData.productNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteProductGroup',
      alias: 'deleteSalesProduct',
      logContext: 'Sales products',
    });
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-main-product-group-grid', { verifyStatus: true });
  }
}
export const onSalesPage = new Sales();
