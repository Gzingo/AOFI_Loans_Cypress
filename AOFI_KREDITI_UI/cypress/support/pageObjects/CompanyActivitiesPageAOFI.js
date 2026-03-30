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
    cy.finishAndGoToNext('app-company-activities-grid');
  }

  deleteAllFirstMatchingActivity() {
    cy.deleteAllMatchingGridRows({
      gridSelector: '.e-gridcontent tbody tr',
      name: getTestData.businessActivityNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteCompanyActivities',
      alias: 'deleteActivity',
      preDelay: 1500,
      logContext: 'Company activities',
    });
  }
}
export const onCompanyActivitiesPageAOFI = new CompanyActivitiesPageAOFI();
