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

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingSalesProduct() {
    const name = getTestData.productNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteProductGroup').as('deleteSalesProduct');
    function deleteFirstRow() {
      cy.get('app-main-product-group-grid .e-gridcontent tbody tr')
        .first()
        .then(($row) => {
          const text = $row.text().trim();
          if (emptyPlaceholders.some((msg) => text.includes(msg))) {
            cy.log('Grid is empty, only placeholder row remains');
            return;
          }
          if (!text.includes(name)) {
            cy.log(`No more rows with "${name}" found. Deletion is complete.`);
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
          cy.wait('@deleteSalesProduct');
          // recursive
          deleteFirstRow();
        });
    }
    deleteFirstRow();
    cy.contains('app-main-product-group-grid .e-gridcontent tbody tr', name, {
      timeout: 2000,
    }).should('not.exist');
    cy.log(
      `Successfully deleted all entries "${name}" from the Sales by main product group table.`
    );
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-main-product-group-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
  }
}
export const onSalesPage = new Sales();
