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
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-buyer-data').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingForeignBuyer() {
    const name = getTestData.foreignBuyerNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteDomesticOrForeign').as('deleteForeignBuyer');
    function deleteFirstRow() {
      cy.get('app-domestic-foreign-grid[gridtitle="Foreign buyers"] .e-gridcontent tbody tr')
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
          cy.wait('@deleteForeignBuyer');
          // recursive
          deleteFirstRow();
        });
    }
    deleteFirstRow();
    cy.contains(
      'app-domestic-foreign-grid[gridtitle="Foreign buyers"] .e-gridcontent tbody tr',
      name,
      { timeout: 2000 }
    ).should('not.exist');
    cy.log(`Successfully deleted all entries "${name}" from the Domestic supplier table`);
  }
}
export const onBuyerDataPage = new BuyerDataPageAOFI();
