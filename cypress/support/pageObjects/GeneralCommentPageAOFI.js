import { Assert } from './assertions';

export class GeneralCommentPageAOFI {
  addComment() {
    cy.get('app-general-comment-details').within(() => {
      cy.get('.top-block').find('button').should('be.visible').click();
    });
    Assert.checkGeneralCommentPopupVisible();
  }

  leaveComment() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('textarea').clear().type('Automated Test Legal Entity AOFI Loan Request');
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-general-comment-details').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }
}
export const onGeneralCommentPage = new GeneralCommentPageAOFI();
