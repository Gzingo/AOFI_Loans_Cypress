import { Assert } from './assertions';
import { getTestData } from './TestData';

export class StakeholdersPageAOFI {
  addNewOwnershipStructure() {
    cy.get('app-stakeholders-grid .top-block').within(() => {
      cy.get('button').should('exist').click();
    });
    Assert.checkStakeholderPopupVisible();
  }

  fillInStakeholderData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="name"]').clear().type('Automated Test - Legal Entity');
      cy.get('text-box[formcontrolname="address"]')
        .clear()
        .type('Automated Test - Stakeholder Address 1');
      cy.get('number[formcontrolname="equityPercentage"]').clear().type('100');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-stakeholders').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingStakeholder() {
    const name = getTestData.stakeholderNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteStakeholder').as('deleteStakeholder');
    cy.wait(1000);
    function deleteFirstRow() {
      cy.get('app-stakeholders-grid .e-gridcontent tbody tr:first-child').then(($row) => {
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
        cy.wait('@deleteStakeholder');
        // recursive
        deleteFirstRow();
      });
    }
    deleteFirstRow();
    cy.contains('app-stakeholders-grid .e-gridcontent tbody tr', name, { timeout: 2000 }).should(
      'not.exist'
    );
    cy.log(
      `Successfully deleted all entries "${name}" from the Company ownership structure table.`
    );
  }
}
export const onStakeholdersPageAOFI = new StakeholdersPageAOFI();
