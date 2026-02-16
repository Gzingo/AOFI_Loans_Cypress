import { Assert } from './assertions';
import { getTestData } from './TestData';

export class JobsFinancedPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-job-financed-grid .grid-list').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }

  addExpectedExportRevenue() {
    cy.get('app-job-financed-grid').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkJobFinancedPopupVisible();
  }

  fillInExpectedExportRevenueData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="exportProduct"]').clear().type('Mushrooms');
      cy.get('number[formcontrolname="exportDealValue"]').clear().type('1637552');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingJobFinancedRevenue() {
    const name = getTestData.exportProductNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteJobFinanced').as('deleteExpectedJobFinanced');
    function deleteFirstRow() {
      cy.get('app-job-financed-grid .e-gridcontent tbody tr')
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
          cy.wait('@deleteExpectedJobFinanced');
          // recursive
          deleteFirstRow();
        });
    }
    deleteFirstRow();
    cy.contains('app-job-financed-grid .e-gridcontent tbody tr', name, {
      timeout: 2000,
    }).should('not.exist');
    cy.log(`Successfully deleted all entries "${name}" from the Domestic supplier table`);
  }
}
export const onJobsFinancedPage = new JobsFinancedPageAOFI();
