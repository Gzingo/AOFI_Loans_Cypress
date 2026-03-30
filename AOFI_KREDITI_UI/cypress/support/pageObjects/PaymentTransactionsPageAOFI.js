import { Assert } from './assertions';
import { getTestData } from './TestData';

export class PaymentTransactionsPageAOFI {
  addForeignExchange() {
    cy.get('app-foreign-eur-transactions-grid').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkForeignExchangePopupVisible();
  }

  fillInForeignExchangeData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="bankName"]')
        .clear()
        .type('Automated Test Foreign Exchange Bank 1');
      cy.get('number[formcontrolname="currentYearTurnoverInflow"]').clear().type('201222');
      cy.get('number[formcontrolname="currentYearTurnoverOutflow"]').clear().type('100111');
      cy.get('number[formcontrolname="previousYearTurnoverInflow"]').clear().type('351044');
      cy.get('number[formcontrolname="previousYearTurnoverOutflow"]').clear().type('254407');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-tab-bank-payment-transactions');
  }

  deleteAllFirstMatchingForeignExchangeTransactions() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-foreign-eur-transactions-grid .e-gridcontent tbody tr',
      name: getTestData.foreignExchangeBankAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteForeignTransaction',
      alias: 'deleteForeignTransaction',
      logContext: 'Foreign exchange transactions',
    });
  }
}
export const onPaymentTransactionsPage = new PaymentTransactionsPageAOFI();
