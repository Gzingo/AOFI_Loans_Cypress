import { Assert } from './assertions';
import { getTestData } from './TestData';

export class JobsFinancedPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-job-financed-grid .grid-list');
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

  deleteAllFirstMatchingJobFinancedRevenue() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-job-financed-grid .e-gridcontent tbody tr',
      name: getTestData.exportProductNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteJobFinanced',
      alias: 'deleteExpectedJobFinanced',
      logContext: 'Jobs financed revenue',
    });
  }
}
export const onJobsFinancedPage = new JobsFinancedPageAOFI();
