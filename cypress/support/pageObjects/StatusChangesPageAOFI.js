import { Assert } from './assertions.js';

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
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-company-status-change-grid').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
  }
}
export const onStatusChangesAOFI = new StatusChangesPageAOFI();
