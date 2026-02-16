import { Assert } from './assertions';
import { getTestData } from './TestData';

export class ExportActivityPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-tab-borrower-export-activity').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }

  addRegionalExportActivity() {
    cy.get('app-regional-export-schedule-grid').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkRegionalExportActivityPopupVisible();
  }

  addExportBusinessRelationship() {
    cy.get('app-business-relationship-history-details').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkExportBusinessRelationshipPopupVisible();
  }

  fillInRegionalExportActivityData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="exportCountry"]').clear().type('Greece');
      cy.get('text-box[formcontrolname="company"]').clear().type('Hellenic Import T.E.S.T.');
      cy.get('text-box[formcontrolname="productServiceType"]').clear().type('Direct sales');
      cy.get('number[formcontrolname="previousYear"]').clear().type('123055');
      cy.get('number[formcontrolname="currentYear"]').clear().type('194577');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  fillInExportBusinessRelationshipData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="customer"] input')
        .clear({ force: true })
        .type('Hellenic Import T.E.S.T.');
      cy.get('text-box[formcontrolname="collaborationSince"] input').clear().type('2015');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingRegionalExportActivity() {
    const name = getTestData.exportCountryNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteRegionalExportSchedule').as(
      'deleteRegionalExportActivity'
    );
    function deleteFirstRow() {
      cy.get('app-regional-export-schedule-grid .e-gridcontent tbody tr')
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
          cy.wait('@deleteRegionalExportActivity');
          // recursive
          deleteFirstRow();
        });
    }
    deleteFirstRow();
    cy.contains('app-regional-export-schedule-grid .e-gridcontent tbody tr', name, {
      timeout: 2000,
    }).should('not.exist');
    cy.log(`Successfully deleted all entries "${name}" from the Domestic supplier table`);
  }
}
export const onExportActivityPage = new ExportActivityPageAOFI();
