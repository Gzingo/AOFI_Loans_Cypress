import { getRecordedTimestamp, getRecordedTimestampPlusYears } from '../../dateUtils';

export class ProposalData {
  proposalDraftApplicantNameTubeIQ() {
    return 'QATesting';
  }

  proposalDraftApplicantMBTubeIQ() {
    return '16859722';
  }

  proposalDraftApplicantPIBTubeIQ() {
    return '776185205';
  }

  proposalDraftApplicantAddressTubeIQ() {
    return 'adresaPrva';
  }

  proposalDraftSelectedProductTubeIQ() {
    return 'Kratkoročni kredit sa planom otplate';
  }

  proposalDraftLoanAmountTubeIQ() {
    return '420.002';
  }

  creditLoanAmountInputTubeIQ() {
    return '420002';
  }

  creditLoanAmountTextInputTubeIQ() {
    return 'Četiri stotine dvadeset hiljada i dva';
  }

  proposalDraftCurrencyTubeIQ() {
    return 'EUR';
  }

  proposalDraftPeriodTubeIQ() {
    return '12';
  }

  proposalLoanInstallmentNumberTubeIQ() {
    return '12';
  }

  proposalCourseTypeTubeIQ() {
    return 'Tip kursa';
  }

  proposalDueDateTubeIQ() {
    return '60 months (5 years)';
  }

  bankAccountNumberTubeIQ() {
    return '160-5500123456-78';
  }

  proposalInterestRateTubeIQ() {
    return '10%, fixed installment';
  }

  proposalPaymentMethodTubeIQ() {
    return [
      '- Monthly installments according to the annuity plan',
      '- Automatic payment through the bank',
      '- Possibility of early repayment without penalty',
    ].join('\n');
  }

  decisionIODateTubeIQ() {
    return '26.01.2026';
  }

  decisionIONumberTubeIQ() {
    return 'IO-025/2026';
  }

  riskOpinionApprovalDateTubeIQ() {
    return getRecordedTimestamp();
  }

  riskOpinionDueDateTubeIQ() {
    return getRecordedTimestampPlusYears(5);
  }

  proposalApplicantExposureDateTubeIQ() {
    return '03.02.2025';
  }

  proposalOneTimeFeeAmountTubeIQ() {
    return '2% administrative fee';
  }

  proposalSpecialConditionsTubeIQ() {
    return 'Approved grace period of 6 months';
  }

  proposalRatingTubeIQ() {
    return 'Internal rating: B+ (stable, with growth potential) - Category: low-risk client with growing export potential';
  }

  proposalExposureTubeIQ() {
    return [
      '- Total exposure to foreign customers: EUR 250,000',
      '- Currently active: 125,000 EUR',
      '- Remaining limit: 125,000 EUR',
    ].join('\n');
  }

  creditRequestCommentDptHeadTubeIQ() {
    return 'Automated Test Comment - Credit Request ready for Credit advisor.';
  }

  creditRequestCommentCreditAdvisorTubeIQ() {
    return 'Automated Test Comment - Credit Request ready for further processing.';
  }
}
