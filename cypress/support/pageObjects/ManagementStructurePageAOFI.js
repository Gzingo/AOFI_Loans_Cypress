import { onAPI } from './API';
import { Assert } from './assertions';
import { getTestData } from './TestData';

export class ManagementStructure {
  addManagementStructureAndWorkExp() {
    cy.get('app-management-structure-grid .top-block')
      .eq(0)
      .within(() => {
        cy.get('button').should('exist').click();
      });
    Assert.checkManagementStructurePopupVisible();
  }

  addEmployeeStructure() {
    cy.get('app-management-structure-grid app-average-employees-details')
      .find('.top-block')
      .within(() => {
        cy.get('button').should('exist').click();
      });
    Assert.checkEmployeeStructurePopupVisible();
  }

  fillInManagementStructureData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('form text-box[formcontrolname="fullName"]')
        .clear()
        .type('Automated Test - Testing Joe');
      cy.get('text-box[formcontrolname="position"]').clear().type('Automated Test - Manager');
      cy.get('number[formcontrolname="yearsInCompany"]').clear().type('9');
      cy.get('number[formcontrolname="age"]').clear().type('47');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
    onAPI.interceptAllManagementStructure();
  }

  fillInEmployeesStructureData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('number[formcontrolname="universityDegree"]').clear().type('1');
      cy.get('number[formcontrolname="collegeDegree"]').clear().type('2');
      cy.get('number[formcontrolname="secondarySchoolDegree"]').clear().type('3');
      cy.get('number[formcontrolname="total"]').within(() => {
        cy.get('input').should('have.value', '6');
      });
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-management-structure-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingManager() {
    const name = getTestData.managerNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteManagementStructure').as('deleteManager');
    function deleteFirstRow() {
      cy.get('app-management-structure-grid .e-gridcontent tbody tr:first-child').then(($row) => {
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
        cy.wait('@deleteManager');
        // recursive
        deleteFirstRow();
      });
    }
    deleteFirstRow();
    cy.contains('app-management-structure-grid .e-gridcontent tbody tr', name, {
      timeout: 2000,
    }).should('not.exist');
    cy.log(
      `Successfully deleted all entries "${name}" from the Company management structure table`
    );
  }
}
export const onManagementStructurePage = new ManagementStructure();
