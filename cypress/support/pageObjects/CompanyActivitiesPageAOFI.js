import { Assert } from './assertions';
import { getTestData } from './TestData';

export class CompanyActivitiesPageAOFI {
  addNewCompanyActivity() {
    cy.get('.top-block').find('button').should('be.visible').click();
    Assert.checkAddNewCompanyActivityPopupVisible();
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="description"]')
        .clear()
        .type('Test Automation Business Activity');
      cy.get('ejs-numerictextbox[id="controlNumber"]').clear().type('100');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-company-activities-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingActivity() {
    cy.wait(1500);
    const name = getTestData.businessActivityNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteCompanyActivities').as('deleteActivity');
    function deleteFirstMatchingRow() {
      cy.get('.e-gridcontent tbody tr:first-child').then(($row) => {
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
        cy.wait('@deleteActivity');
        // recursive
        deleteFirstMatchingRow();
      });
    }
    deleteFirstMatchingRow();
    cy.contains('.e-gridcontent tbody tr', name, { timeout: 2000 }).should('not.exist');
    cy.log(`Successfully deleted all entries "${name}" from the activities table`);
  }
}
export const onCompanyActivitiesPageAOFI = new CompanyActivitiesPageAOFI();
