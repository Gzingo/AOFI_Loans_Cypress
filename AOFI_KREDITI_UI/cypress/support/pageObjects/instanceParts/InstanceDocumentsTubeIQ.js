import { onAPI } from '../API';
import { Assert } from '../assertions';
import { getTestData } from '../TestData';

export class InstanceDocumentsTubeIQ {
  // upload Signed Credit Proposal document
  attachSignedCreditProposalDocument() {
    const fileName = getTestData.signedCreditProposalFileNameTubeIQ();
    const uploaderIndex = 0;
    onAPI.interceptCollateralData();
    onAPI.waitForCollateralData();
    // cy.scrollToBottom(1);
    cy.uploadDocumentFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Signed Decision IO document
  attachSignedDecisionIODocument() {
    const fileName = getTestData.signedDecisionIOFileNameTubeIQ();
    const uploaderIndex = 0;
    cy.uploadDocumentFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Signed Decision Creation document
  attachSignedDecisionCreationDocument() {
    const fileName = getTestData.signedDecisionCreationFileNameTubeIQ();
    const uploaderIndex = 0;
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Notice on submitted documentation document
  attachNoticeOnSubmittedDocumentationDocument() {
    const fileName = getTestData.noticeOnSubmittedDocumentationTubeIQ();
    const uploaderIndex = 0;
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Consent document
  attachDocumentConsent() {
    const fileName = getTestData.documentConsentTubeIQ();
    const uploaderIndex = 0;
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
  }

  // upload signed credit contract
  attachSignedContractDocument() {
    const fileName = getTestData.signedCreditContractFileNameTubeIQ();
    const uploaderIndex = 0;
    cy.uploadDocumentFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Signed Credit Proposal Decision document
  attachSignedCreditProposalDecisionDocument() {
    const fileName = getTestData.signedCreditProposalDecisionFileNameTubeIQ();
    const uploaderIndex = 0;
    cy.uploadDocumentFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Signed Basic Conditions Decision Proposal document
  attachSignedBasicConditionsDecisionProposalDocument() {
    const fileName = getTestData.signedBasicConditionsDecisionProposalFileNameTubeIQ();
    const uploaderIndex = 0;
    // onAPI.interceptCollateralData();
    // onAPI.waitForCollateralData();
    cy.uploadDocumentFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Signed Credit Proposal Decision document
  attachRiskOpinionDocument() {
    const fileName = getTestData.signedRiskOpinionFileNameTubeIQ();
    const uploaderIndex = 0;
    // onAPI.interceptCollateralData();
    // onAPI.waitForCollateralData();
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Signed Credit Proposal Decision document
  attachFinalRiskOpinionDocument() {
    const fileName = getTestData.signedFinalRiskOpinionFileNameTubeIQ();
    const uploaderIndex = 0;
    // onAPI.interceptCollateralData();
    // onAPI.waitForCollateralData();
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
  }

  // upload Client Questionaire document
  attachClientCreditFileQuestionaireDocument() {
    const fileName = getTestData.clientQuestionaireFileNameTubeIQ();
    const uploaderIndex = 0;
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
    //assert attachment added
    Assert.tubeIQInstanceAttachmentVisible(fileName);
  }

  // upload Guarantor Questionaire document
  attachGuarantorCreditFileQuestionaireDocument() {
    const fileName = getTestData.guarantorQuestionaireFileNameTubeIQ();
    const uploaderIndex = 1;
    cy.uploadFileTubeIQ(fileName, uploaderIndex);
    //assert attachment added
    Assert.tubeIQInstanceAttachmentVisible(fileName);
  }

  printTubeIQInstanceDocuments() {
    Assert.verifyPrintDocumentPopupOpen();
    cy.printDocumentsInstanceView();
    cy.closeDocumentsInstanceView();
    // cy.closeAllPopups();
  }

  deleteClientCreditFileQuestionaireAttachment() {
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachmentsFromBox(0);
  }

  deleteGuarantorCreditFileQuestionaireAttachment() {
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachmentsFromBox(1);
  }

  deleteAllCreditFileQuestionaireAttachments() {
    cy.scrollToBottom(1);
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachments();
  }

  deleteAllBasicConditionsDecisionProposalInstanceAttachments() {
    cy.scrollToBottom(1);
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachments();
  }

  deleteAllCreditFilePrintingAttachments() {
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachments();
  }

  deleteAllCreditDecisionCreationAttachments() {
    cy.deleteAllTubeIQInstanceAttachmentsFromBox(0);
    cy.deleteAllTubeIQInstanceAttachmentsFromBox(1);
  }

  deleteContractSigningAttachments() {
    cy.deleteAllTubeIQInstanceAttachmentsFromBox(0);
    cy.deleteAllTubeIQInstanceAttachmentsFromBox(1);
  }

  deleteAllRiskOpinionDocumentAttachments() {
    cy.scrollToBottom(1);
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachments();
  }

  deleteAllContractCreationDocumentAttachments() {
    cy.scrollToBottom(1);
    cy.get('form file-upload').deleteAllTubeIQInstanceAttachments();
  }

  deleteAllPreparatioForCreditRealizationAttachments() {
    cy.deleteAllTubeIQInstanceAttachmentsFromBox(0);
  }
}
