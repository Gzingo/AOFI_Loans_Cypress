import { Assert } from './assertions';
import { getTestData } from './TestData';

export class SupplierDataPageAOFI {
  addDomesticSupplier() {
    cy.get('[gridtitle="Domestic supplier"]').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkDomesticSupplierPopupVisible();
  }

  fillInDomesticSupplierData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="buyerName"]')
        .clear()
        .type('Automated Test Domestic Supplier 1');
      cy.get('number[formcontrolname="percentageOfTotalSales"]').clear().type('100');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-supplier-data');
  }

  deleteAllFirstMatchingDomesticSupplier() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-domestic-foreign-grid .e-gridcontent tbody tr',
      name: getTestData.domesticSupplierNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteDomesticOrForeign',
      alias: 'deleteDomesticSupplier',
      logContext: 'Domestic suppliers',
    });
  }
}
export const onSupplierDataPage = new SupplierDataPageAOFI();
