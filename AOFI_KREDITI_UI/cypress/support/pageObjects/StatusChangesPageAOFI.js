import { Assert } from './assertions';

export class StatusChangesPageAOFI {
  enterDateOfCompanyEstablishment() {
    cy.get('table tbody').find('button').should('be.visible').click();
    Assert.checkAddOrEditCompanyStatusPopupVisible();
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="year"]')
        .type('{selectall}{backspace}')
        .type('2005', { delay: 20 }, { force: true });
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.finishAndGoToNext('app-company-status-change-grid', { verifyStatus: true });
  }
}
export const onStatusChangesAOFI = new StatusChangesPageAOFI();
