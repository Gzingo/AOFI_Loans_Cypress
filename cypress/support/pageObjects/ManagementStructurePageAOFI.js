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
    cy.finishAndGoToNext('app-management-structure-grid', { verifyStatus: true });
  }

  deleteAllFirstMatchingManager() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-management-structure-grid .e-gridcontent tbody tr',
      name: getTestData.managerNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteManagementStructure',
      alias: 'deleteManager',
      logContext: 'Management structure',
    });
  }
}
export const onManagementStructurePage = new ManagementStructure();
