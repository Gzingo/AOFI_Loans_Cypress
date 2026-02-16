import { onAPI } from './API';
import { getTestData } from './TestData';

export class CommentsViewTubeIQ {
  constructor() {
    this.creditRequestCommentDptHead = getTestData.creditRequestCommentDptHeadTubeIQ();
    this.creditRequestCommentCreditAdvisor = getTestData.creditRequestCommentCreditAdvisorTubeIQ();
  }

  getCreditRequestCommentDptHead() {
    return this.creditRequestCommentDptHead;
  }

  getCreditRequestCommentCreditAdvisor() {
    return this.creditRequestCommentCreditAdvisor;
  }

  leaveGeneralCommentDptHead() {
    cy.get('form .field-set [id^="mentiony-container-"]').within(() => {
      cy.get('textarea').clear({ force: true });
      cy.get('[id^="mentiony-content-"]').type(
        'Automated Test Comment - Credit Request ready for Credit advisor.',
        { force: true }
      );
    });
    onAPI.interceptTubeIQTaskComments();
    cy.get('form .form-group button').click({ force: true });
  }

  // maybe use this as a reply to some previous comment(for future test references??)
  /*leaveCommentCreditAdvisor() {
    cy.get('form .field-set [id^="mentiony-container-"]').within(() => {
      cy.get('textarea').clear({ force: true });
      cy.get('[id^="mentiony-content-"]').type(
        'Automated Test Comment - Credit Request ready for Credit advisor.',
        { force: true }
      );
    });
    onAPI.interceptTubeIQTaskComments();
    cy.get('form .form-group button').click({ force: true });
  } */
}
export const onTubeIQCommentsView = new CommentsViewTubeIQ();
