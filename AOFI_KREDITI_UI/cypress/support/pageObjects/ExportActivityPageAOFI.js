import { Assert } from './assertions';
import { getTestData } from './TestData';

export class ExportActivityPageAOFI {
  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-tab-borrower-export-activity');
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

  deleteAllFirstMatchingRegionalExportActivity() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-regional-export-schedule-grid .e-gridcontent tbody tr',
      name: getTestData.exportCountryNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteRegionalExportSchedule',
      alias: 'deleteRegionalExportActivity',
      logContext: 'Regional export activity',
    });
  }
}
export const onExportActivityPage = new ExportActivityPageAOFI();
