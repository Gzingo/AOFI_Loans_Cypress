import { getTestData } from './TestData';

export class AttachmentsViewTubeIQ {
  downloadTubeIQRiskOpinionFinalDocumentFromAttachments() {
    cy.openFileFromContainer('RiskMisljenje', 'Risk mišljenje.docx');
  }
  /* Defines mandatory and optional attachments and upload files, based on the loan request requirements
   * Usage: in Assertions method > onTubeIQAttachmentsView.getMandatoryAttachments()
   * or onTubeIQAttachmentsView.getOptionalAttachments()
   */
  constructor() {
    this.mandatoryAttachments = getTestData.mandatoryAttachmentsTubeIQ();

    this.optionalAttachments = [
      // add non-mandatory documents here
    ];

    // No guarantor, mortgage or pledge on credit proposal
    this.completeCreditProposalDocumentation =
      getTestData.completeCreditProposalDocumentationTubeIQ();

    // No guarantor, mortgage or pledge, basic conditions added
    this.completeRequestForwardingDocumentation =
      getTestData.completeRequestForwardingDocumentationTubeIQ();

    // No guarantor on risk opinion
    this.completedRiskOpinionDocumentation = getTestData.completedRiskOpinionDocumentationTubeIQ();

    // No guarantor on risk opinion verification
    this.completedRiskOpinionVerificationDocumentation =
      getTestData.completedRiskOpinionVerificationDocumentationTubeIQ();

    this.completedRiskOpinionIODecisionDocumentation =
      getTestData.completedRiskOpinionIODecisionDocumentationTubeIQ();

    this.completedDecisionCreationDocumentation =
      getTestData.completedDecisionCreationDocumentationTubeIQ();

    this.completedContractCreationDocumentation =
      getTestData.completedContractCreationDocumentationTubeIQ();

    this.completedCompleteContractRealizationDocumentation =
      getTestData.completedContractRealizationPreparationDocumentationTubeIQ();

    this.completeContractSigningDocumentation =
      getTestData.completeContractSigningDocumentationTubeIQ();

    this.completeContractSigningDocumentationWithRealisation =
      getTestData.completeContractSigningDocumentationWithRealisationTubeIQ();
  }

  getMandatoryAttachments() {
    return this.mandatoryAttachments;
  }

  getOptionalAttachments() {
    return this.optionalAttachments;
  }

  getCompleteCreditProposalDocumentation() {
    return this.completeCreditProposalDocumentation;
  }

  getCompleteRequestForwardingDocumentation() {
    return this.completeRequestForwardingDocumentation;
  }

  getCompletedRiskOpinionDocumentation() {
    return this.completedRiskOpinionDocumentation;
  }

  getCompleteRiskOpinionVerificationDocumentation() {
    return this.completedRiskOpinionVerificationDocumentation;
  }

  getCompleteRiskOpinionIODecisionDocumentation() {
    return this.completedRiskOpinionIODecisionDocumentation;
  }

  getCompleteDecisionCreationDocumentation() {
    return this.completedDecisionCreationDocumentation;
  }

  getCompleteContractCreationDocumentation() {
    return this.completedContractCreationDocumentation;
  }

  getCompleteContractRealizationPreparationDocumentation() {
    return this.completedCompleteContractRealizationDocumentation;
  }

  getCompleteContractSigningDocumentation() {
    return this.completeContractSigningDocumentation;
  }

  getCompleteContractSigningDocumentationWithRealisation() {
    return this.completeContractSigningDocumentationWithRealisation;
  }
}
export const onTubeIQAttachmentsView = new AttachmentsViewTubeIQ();
