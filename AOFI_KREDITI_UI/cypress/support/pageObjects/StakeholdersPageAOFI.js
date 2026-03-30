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
    cy.finishAndGoToNext('app-stakeholders');
  }

  deleteAllFirstMatchingStakeholder() {
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-stakeholders-grid .e-gridcontent tbody tr',
      name: getTestData.stakeholderNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteStakeholder',
      alias: 'deleteStakeholder',
      preDelay: 1000,
      logContext: 'Stakeholders',
    });
  }
}
export const onStakeholdersPageAOFI = new StakeholdersPageAOFI();
