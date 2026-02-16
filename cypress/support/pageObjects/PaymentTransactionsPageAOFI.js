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
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-tab-bank-payment-transactions').within(() => {
      cy.clickFinishAndGoToNextButton({ force: true });
    });
    cy.wait('@updateStatus');
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingForeignExchangeTransactions() {
    const name = getTestData.foreignExchangeBankAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteForeignTransaction').as(
      'deleteForeignTransaction'
    );
    function deleteFirstRow() {
      cy.get('app-foreign-eur-transactions-grid .e-gridcontent tbody tr')
        .first()
        .then(($row) => {
          const text = $row.text().trim();
          if (emptyPlaceholders.some((msg) => text.includes(msg))) {
            cy.log('Grid is empty – only placeholder row remains');
            return;
          }
          if (!text.includes(name)) {
            cy.log(`No more rows with "${name}" found – deletion complete`);
            return;
          }
          cy.wrap($row).within(() => {
            cy.get('td:last-child')
              .find('.action-btn-div button svg path[d^="M4.21875"]')
              .click({ force: true });
          });
          cy.get('[role="dialog"] .modal-button-save').filter(':visible').click({ force: true });
          cy.get('ejs-dialog.modal-error .e-dlg-closeicon-btn', { timeout: 0 }).then(($btns) => {
            if ($btns.length) {
              cy.wrap($btns).click({ multiple: true, force: true });
              cy.log(`Closed ${$btns.length} error popups`);
            }
          });
          cy.closeAllPopups();
          cy.wait('@deleteForeignTransaction');
          // recursive
          deleteFirstRow();
        });
    }
    deleteFirstRow();
    cy.contains('app-foreign-eur-transactions-grid .e-gridcontent tbody tr', name, {
      timeout: 2000,
    }).should('not.exist');
    cy.log(`Successfully deleted all entries "${name}" from the Domestic supplier table`);
  }
}
export const onPaymentTransactionsPage = new PaymentTransactionsPageAOFI();
