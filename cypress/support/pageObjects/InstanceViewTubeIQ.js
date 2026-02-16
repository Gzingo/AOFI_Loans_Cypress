import { onAPI } from './API';
import { Assert } from './assertions';
import { onTubeIQAttachmentsView } from './AttachmentsViewTubeIQ';
import { getTestData } from './TestData';
import * as dateUtils from '../dateUtils';

export class InstanceViewTubeIQ {
  selectAdvisorTubeIQ() {
    cy.scrollToBottom(1);
    cy.getTubeIQInstanceInputs(12).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir kreditnog referenta"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

  selectRiskAdvisorTubeIQ() {
    cy.scrollToBottom(1);
    cy.getTubeIQInstanceInputs(19).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir savetnika za rizike"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

  selectOpinionFinalizationRiskAdvisorTubeIQ() {
    cy.getTubeIQInstanceInputs(0).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir kreditnog referenta"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

  selectCreditProposalCompletionLegalAdvisorTubeIQ() {
    cy.getTubeIQInstanceInputs(0).clear({ force: true }).type('Nikola Nikolic', { force: true });
    // wait for dropdown to appear
    cy.get('input[placeholder="Odabir referenta pravne službe"]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    // check if the popup is rendered in body and select credit officer
    cy.get('body')
      .find('.e-popup .e-list-item')
      .should('exist')
      .and('be.visible')
      .contains('Nikola Nikolic')
      .click({ force: true });
  }

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

  setInterestConflictToNo() {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li postoji konflikt interesa?')
      .within(() => {
        // click on wrapper span that opens dropdown
        cy.get('span.e-input-group').click({ force: true });
      });
    // popup renders within body with ID ddlelement_popup
    cy.get('#ddlelement_popup .e-list-item').contains('Ne').click();
  }

  setInterestConflictToYes() {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li postoji konflikt interesa?')
      .within(() => {
        // click on wrapper span that opens dropdown
        cy.get('span.e-input-group').click({ force: true });
      });
    // popup renders and within dropdown click Yes option
    cy.get('#ddlelement_popup .e-list-item').contains('Da').click();
  }

  setLoanSplittingToNo() {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li dolazi do razdvajanja kredita?')
      .within(() => {
        // click on wrapper span that opens dropdown
        cy.get('span.e-input-group').click({ force: true });
      });
    // popup renders within body with ID ddlelement_popup
    cy.get('#ddlelement_popup .e-list-item').contains('Ne').click();
  }

  setLoanSplittingToYes() {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(10)
      .should('exist')
      .and('contain', 'Da li dolazi do razdvajanja kredita?')
      .within(() => {
        // click on wrapper span that opens dropdown
        cy.get('span.e-input-group').click({ force: true });
      });
    // popup renders within body with ID ddlelement_popup
    cy.get('#ddlelement_popup .e-list-item').contains('Da').click();
  }

  setDecisionProposalRevisionToNo() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.selectTubeIQDropdownOption(12, '0');
        });
    });
  }

  setDecisionProposalRevisionToYes() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.selectTubeIQDropdownOption(12, '1');
        });
    });
  }

  fillInTheCollateralEntries() {
    onAPI.interceptCollateralData();
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          onAPI.waitForCollateralData();
          cy.selectTubeIQDropdownOption(2, '1');
          cy.selectTubeIQDropdownOption(15, '1');
          cy.selectTubeIQDropdownOption(18, '1');
          cy.selectTubeIQDropdownOption(27, '1');
          cy.enterTubeIQTextInputs(39, getTestData.collateralPlacementPurposeTextTubeIQ());
          cy.enterTubeIQTextInputs(40, getTestData.collateralSecurityInstrumentsTextTubeIQ());
          cy.openAndFillCollateralTableInputs(42, getTestData.collateralExportDataTableTubeIQ());
          cy.enterTubeIQTextInputs(43, getTestData.collateralExportDataCommentTextTubeIQ());
          cy.enterTubeIQTextInputs(44, getTestData.collateralBriefSectorAnalysisTextTubeIQ());
          cy.openAndFillCollateralSWOTTables(46, getTestData.collateralStrengthSWOTTextTubeIQ());
          cy.openAndFillCollateralSWOTTables(48, getTestData.collateralWeeknesSWOTTextTubeIQ());
          cy.openAndFillCollateralSWOTTables(
            50,
            getTestData.collateralOpportunitiesSWOTTextTubeIQ()
          );
          cy.openAndFillCollateralSWOTTables(52, getTestData.collateralThreatsSWOTTextTubeIQ());
          cy.enterTubeIQTextInputs(53, getTestData.collateralLiquidityBlockageDaysTextTubeIQ());
          cy.enterTubeIQTextInputs(54, getTestData.collateralCommentKBTextTubeIQ());
          cy.enterTubeIQTextInputs(55, getTestData.collateralCooperationAOFITextTubeIQ());
          cy.enterTubeIQTextInputs(56, getTestData.collateralBalanceSheetTextTubeIQ());
          cy.enterTubeIQTextInputs(57, getTestData.collateralIncomeStatementTextTubeIQ());
          cy.enterTubeIQTextInputs(58, getTestData.collateralFutureCashFlowsTextTubeIQ());
          cy.enterTubeIQTextInputs(59, getTestData.collateralRatingTextTubeIQ());
          cy.enterTubeIQTextInputs(60, getTestData.collateralConclusionTextTubeIQ());
          cy.selectTubeIQDropdownOption(68, '0');
          onAPI.waitForCollateralData();
          Assert.verifyCollateralOptionSetIsDisplayed(2, 'Da');
          Assert.verifyCollateralOptionSetIsDisplayed(15, 'Da');
          Assert.verifyCollateralOptionSetIsDisplayed(18, 'Da');
          Assert.verifyCollateralOptionSetIsDisplayed(27, 'Da');
          Assert.verifyCollateralTableIsDisplayedWithValidData(4, 'Menica preduzeća', [
            'Bez rezultata',
            'Without result',
          ]);
          Assert.verifyCollateralTableIsDisplayedWithValidData(17, 'Garancija', [
            'Bez rezultata',
            'Without result',
          ]);
          Assert.verifyCollateralTableIsDisplayedWithValidData(20, 'Depozit', [
            'Bez rezultata',
            'Without result',
          ]);
          Assert.verifyCollateralTableIsDisplayedWithValidData(29, 'Garancija banke', [
            'Bez rezultata',
            'Without result',
          ]);
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            39,
            'Namena plasmana',
            getTestData.collateralPlacementPurposeTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            40,
            'Instrumenti obezbedjenja',
            getTestData.collateralSecurityInstrumentsTextTubeIQ()
          );
          Assert.verifyCollateralTableIsDisplayedWithValidData(
            42,
            'Podaci o izvozu',
            getTestData.collateralExportDataAssertTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            43,
            'Komentar podataka o izvozu',
            getTestData.collateralExportDataCommentTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            44,
            'Kratka sektorska analiza',
            getTestData.collateralBriefSectorAnalysisTextTubeIQ()
          );
          Assert.verifyCollateralTableIsDisplayedWithValidData(
            46,
            'Snaga',
            getTestData.collateralStrengthSWOTTextTubeIQ()
          );
          Assert.verifyCollateralTableIsDisplayedWithValidData(
            48,
            'Slabosti',
            getTestData.collateralWeeknesSWOTTextTubeIQ()
          );
          Assert.verifyCollateralTableIsDisplayedWithValidData(
            50,
            'Mogućnosti',
            getTestData.collateralOpportunitiesSWOTTextTubeIQ()
          );
          Assert.verifyCollateralTableIsDisplayedWithValidData(
            52,
            'Pretnje',
            getTestData.collateralThreatsSWOTTextTubeIQ()
          );
          Assert.verifyCollateralLiquidityAndRatingTextboxIsDisplayedWithValidData(
            53,
            'Likvidnost/Dani blokade',
            getTestData.collateralLiquidityBlockageDaysTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            54,
            'Komentar KB',
            getTestData.collateralCommentKBTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            55,
            'Saradnja sa AOFI',
            getTestData.collateralCooperationAOFITextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            56,
            'Analiza bilansa stanja',
            getTestData.collateralBalanceSheetTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            57,
            'Analiza bilansa uspeha',
            getTestData.collateralIncomeStatementTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            58,
            'Analiza budućih novčanih troškova',
            getTestData.collateralFutureCashFlowsTextTubeIQ()
          );
          Assert.verifyCollateralLiquidityAndRatingTextboxIsDisplayedWithValidData(
            59,
            'Rejting',
            getTestData.collateralRatingTextTubeIQ()
          );
          Assert.verifyCollateralTextboxIsDisplayedWithValidData(
            60,
            'Zaključak',
            getTestData.collateralConclusionTextTubeIQ()
          );
          Assert.verifyCollateralOptionSetIsDisplayed(68, 'Ne');
        });
    });
  }

  reviewBasicDataOfProposal() {
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      1,
      'MB podnosioca',
      getTestData.proposalDraftApplicantMBTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      2,
      'PIB podnosioca',
      getTestData.proposalDraftApplicantPIBTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      3,
      'Adresa i broj podnosioca',
      getTestData.proposalDraftApplicantAddressTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      4,
      'Proizvod iz ponude AOFI',
      getTestData.proposalDraftSelectedProductTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      5,
      'Iznos',
      getTestData.proposalDraftLoanAmountTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      6,
      'Valuta',
      getTestData.proposalDraftCurrencyTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      7,
      'Period na koji se plasman traži',
      getTestData.proposalDraftPeriodTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      9,
      'Obrazlozenje zahteva',
      getTestData.collateralPlacementPurposeTextTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      10,
      'Instrumenti obezbedjenja',
      getTestData.collateralSecurityInstrumentsTextTubeIQ()
    );
  }

  reviewContractRealisationData() {
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      0,
      'Naziv podnosioca',
      getTestData.proposalDraftApplicantNameTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      1,
      'MB podnosioca',
      getTestData.proposalDraftApplicantMBTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      2,
      'PIB podnosioca',
      getTestData.proposalDraftApplicantPIBTubeIQ()
    );
    Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
      6,
      'Period na koji se plasman traži',
      getTestData.proposalDraftPeriodTubeIQ()
    );
  }

  verifyTubeIQVerificationProposalDataDptHead() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Iznos',
            getTestData.proposalDraftLoanAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'Valuta',
            getTestData.proposalDraftCurrencyTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'Kamatna stopa',
            getTestData.proposalInterestRateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            4,
            'Da li je sa valutnom klauzulom',
            'Ne'
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            5,
            'Rok dospeća',
            getTestData.proposalDueDateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            6,
            'Način otplate',
            getTestData.proposalPaymentMethodTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            7,
            'Jednokratna naknada (%)',
            getTestData.proposalOneTimeFeeAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            8,
            'Instrumenti obezbeđenja',
            getTestData.collateralSecurityInstrumentsTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            9,
            'Posebni uslovi',
            getTestData.proposalSpecialConditionsTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            10,
            'Rejting',
            getTestData.proposalRatingTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            11,
            'Izloženost',
            getTestData.proposalExposureTubeIQ()
          );
        });
    });
  }

  reviewBasicDataOfForwardingTheRequestRiskDptHead() {
    onAPI.interceptAndWaitAllInboxItemsTubeIQ();
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Naziv podnosioca',
            getTestData.proposalDraftApplicantNameTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'MB podnosioca',
            getTestData.proposalDraftApplicantMBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'PIB podnosioca',
            getTestData.proposalDraftApplicantPIBTubeIQ()
          );
          // Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
          //   3,
          //   'Vrsta kredita',
          //   getTestData.proposalDraftSelectedProductTubeIQ()
          // );
          // Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
          //   4,
          //   'Period na koji se plasman traži',
          //   getTestData.proposalDraftPeriodTubeIQ()
          // );
          // Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
          //   5,
          //   'Broj rata',
          //   getTestData.proposalLoanInstallmentNumberTubeIQ()
          // );
          // Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
          //   6,
          //   'Obrazloženje zahteva',
          //   getTestData.collateralPlacementPurposeTextTubeIQ()
          // );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            7,
            'Iznos',
            getTestData.proposalDraftLoanAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            8,
            'Valuta',
            getTestData.proposalDraftCurrencyTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            9,
            'Kamatna stopa',
            getTestData.proposalInterestRateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            10,
            'Sa valutnom klauzulom',
            'Ne'
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            11,
            'Tip kursa',
            getTestData.proposalCourseTypeTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            12,
            'Rok dospeća',
            getTestData.proposalDueDateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            13,
            'Način otplate',
            getTestData.proposalPaymentMethodTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            14,
            'Jednokratna naknada (%)',
            getTestData.proposalOneTimeFeeAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            15,
            'Instrumenti obezbedjenja',
            'Instrumenti obezbedjenja'
            // getTestData.collateralSecurityInstrumentsTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            16,
            'Posebni uslovi',
            getTestData.proposalSpecialConditionsTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            17,
            'Rejting',
            getTestData.collateralRatingTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            18,
            'Izloženost',
            getTestData.proposalExposureTubeIQ()
          );
        });
    });
  }

  reviewRiskOpinionVerificationDataAsRiskDptHead() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Evaluacija predloga - aplikant',
            getTestData.riskOpinionFormTestData().evaluacijaPredlogaAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'Glavni pozitivni aspekti poslovanja - aplikant',
            getTestData.riskOpinionFormTestData().glavniPozitivniAspektiAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'Glavni negativni aspekti poslovanja - aplikant',
            getTestData.riskOpinionFormTestData().glavniNegativniAspektiAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            3,
            'Interni rejting - aplikant',
            getTestData.riskOpinionFormTestData().interniRejtingAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            8,
            'Ostale napomene',
            getTestData.riskOpinionFormTestData().ostaleNapomene
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            9,
            'Mišljenje direkcije za upravljanje rizicima',
            getTestData.riskOpinionFormTestData().misljenjeDirekcijeZaRizike
          );
        });
    });
  }

  reviewBasicDataOfRiskOpinionByRiskAdvisor() {
    onAPI.interceptAndWaitAllInboxItemsTubeIQ();
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'Naziv podnosioca',
            getTestData.proposalDraftApplicantNameTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'MB podnosioca',
            getTestData.proposalDraftApplicantMBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            3,
            'PIB podnosioca',
            getTestData.proposalDraftApplicantPIBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            4,
            'Vrsta kredita',
            getTestData.proposalDraftSelectedProductTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            5,
            'Period na koji se plasman traži',
            getTestData.proposalDraftPeriodTubeIQ()
          );
          // Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
          //   6,
          //   'Broj rata',
          //   getTestData.proposalLoanInstallmentNumberTubeIQ()
          // );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            7,
            'Obrazloženje zahteva',
            getTestData.riskOpinionRequestJustificationTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            8,
            'Iznos',
            getTestData.proposalDraftLoanAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            9,
            'Valuta',
            getTestData.proposalDraftCurrencyTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            10,
            'Kamatna stopa',
            // 'Kamatna stopa'
            getTestData.proposalInterestRateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            11,
            'Da li je sa valutnom klauzulom?',
            'Ne'
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            12,
            'Tip kursa',
            getTestData.proposalCourseTypeTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            13,
            'Rok dospeća',
            // 'Rok dospeća'
            getTestData.proposalDueDateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            14,
            'Način otplate',
            getTestData.proposalPaymentMethodTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            15,
            'Jednokratna naknada (%)',
            // 'Jednokratno unapred'
            getTestData.proposalOneTimeFeeAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            16,
            'Instrumenti obezbeđenja',
            getTestData.collateralSecurityInstrumentsTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            17,
            'Posebni uslovi',
            // 'Posebni uslovi'
            getTestData.proposalSpecialConditionsTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            18,
            'Rejting',
            // 'Rejting'
            getTestData.collateralRatingTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            19,
            'Izloženost',
            getTestData.proposalExposureTubeIQ()
          );
        });
    });
  }

  reviewFinalDataOfRiskOpinionByRiskAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'Naziv podnosioca',
            getTestData.proposalDraftApplicantNameTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'MB podnosioca',
            getTestData.proposalDraftApplicantMBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            3,
            'PIB podnosioca',
            getTestData.proposalDraftApplicantPIBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            4,
            'Vrsta kredita',
            'Dugoročni kredit'
            // getTestData.proposalDraftSelectedProductTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            5,
            'Period na koji se plasman traži',
            '60'
            // getTestData.proposalDraftPeriodTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            6,
            'Broj rata',
            '60'
            // getTestData.proposalLoanInstallmentNumberTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            7,
            'Obrazloženje zahteva',
            'Jemac Test'
            // getTestData.collateralPlacementPurposeTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            8,
            'Iznos',
            getTestData.proposalDraftLoanAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            9,
            'Valuta',
            getTestData.proposalDraftCurrencyTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            10,
            'Kamatna stopa',
            // 'Kamatna stopa'
            getTestData.proposalInterestRateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            11,
            'Da li je sa valutnom klauzulom?',
            'Ne'
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            12,
            'Tip kursa',
            getTestData.proposalCourseTypeTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            13,
            'Rok dospeća',
            // 'Rok dospeća'
            getTestData.proposalDueDateTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            14,
            'Način otplate',
            getTestData.proposalPaymentMethodTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            15,
            'Jednokratna naknada (%)',
            // 'Jednokratno unapred'
            getTestData.proposalOneTimeFeeAmountTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            16,
            'Instrumenti obezbeđenja',
            getTestData.collateralSecurityInstrumentsTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            17,
            'Posebni uslovi',
            // 'Posebni uslovi'
            getTestData.proposalSpecialConditionsTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            18,
            'Rejting',
            // 'Rejting'
            getTestData.collateralRatingTextTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            19,
            'Izloženost',
            getTestData.proposalExposureTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            22,
            'Delatnost',
            getTestData.riskOpinionFormTestData().delatnost
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            23,
            'Namena',
            getTestData.riskOpinionFormTestData().namena
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            24,
            'Ukupna izloženost',
            getTestData.riskOpinionFormTestData().ukupnaIzlozenost
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            25,
            'Datum odobrenja',
            'Datum odobrenja'
            // dateUtils.getRecordedTimestamp()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            26,
            'Datum dospeća',
            'Datum dospeća'
            // dateUtils.getRecordedTimestampPlusYears(5)
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            27,
            'Stanje duga',
            getTestData.riskOpinionFormTestData().stanjeDuga
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            28,
            'Dospele obaveze',
            getTestData.riskOpinionFormTestData().dospeleObaveze
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            29,
            'Napomene',
            getTestData.riskOpinionFormTestData().napomene
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            30,
            'Posebni uslovi',
            getTestData.riskOpinionFormTestData().posebniUslovi
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            31,
            'Evaluacija predloga - aplikant',
            getTestData.riskOpinionFormTestData().evaluacijaPredlogaAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            32,
            'Glavni pozitivni aspekti poslovanja - aplikant',
            getTestData.riskOpinionFormTestData().glavniPozitivniAspektiAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            33,
            'Glavni negativni aspekti poslovanja - aplikant',
            getTestData.riskOpinionFormTestData().glavniNegativniAspektiAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            34,
            'Interni rejting - aplikant',
            getTestData.riskOpinionFormTestData().interniRejtingAplikant
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            38,
            'Ostale napomene',
            getTestData.riskOpinionFormTestData().ostaleNapomene
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            39,
            'Klasifikacija',
            getTestData.riskOpinionFormTestData().klasifikacija
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            40,
            'Mišljenje direkcije za upravljanje rizicima',
            getTestData.riskOpinionFormTestData().misljenjeDirekcijeZaRizike
          );
        });
    });
  }

  reviewAndCompleteContractCreationDataByLegalService() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Naziv podnosioca',
            getTestData.proposalDraftApplicantNameTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'MB podnosioca',
            getTestData.proposalDraftApplicantMBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'PIB podnosioca',
            getTestData.proposalDraftApplicantPIBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            3,
            'Adresa podnosioca',
            getTestData.proposalDraftApplicantAddressTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            4,
            'Broj odluke IO',
            getTestData.decisionIONumberTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            7,
            'Namena',
            getTestData.collateralPlacementPurposeTextTubeIQ()
          );
          cy.enterTubeIQTextInputs(11, getTestData.applicantDirectorName());
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            11,
            'Direktor podnosioca',
            getTestData.applicantDirectorName()
          );
          cy.selectTubeIQDropdownOption(12, '1');
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            12,
            'Proizvod iz ponude AOFI',
            getTestData.proposalDraftSelectedProductTubeIQ()
          );
          cy.enterTubeIQTextInputs(13, getTestData.creditLoanAmountInputTubeIQ());
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            13,
            'Iznos',
            getTestData.proposalDraftLoanAmountTubeIQ()
          );
          cy.enterTubeIQTextInputs(14, getTestData.creditLoanAmountTextInputTubeIQ());
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            14,
            'Iznos kredita slovima',
            getTestData.creditLoanAmountTextInputTubeIQ()
          );
          cy.selectTubeIQDropdownOption(15, '1');
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            15,
            'Valuta',
            getTestData.proposalDraftCurrencyTubeIQ()
          );
        });
    });
    cy.scrollToBottom(1);
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.enterTubeIQTextInputs(16, getTestData.proposalDraftPeriodTubeIQ());
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            16,
            'Period na koji se plasman traži',
            getTestData.proposalDraftPeriodTubeIQ()
          );
          cy.enterTubeIQTextInputs(17, getTestData.proposalInterestRateTubeIQ());
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            17,
            'Kamatna stopa (%)',
            getTestData.proposalInterestRateTubeIQ()
          );
          cy.enterTubeIQTextInputs(18, getTestData.proposalDueDateTubeIQ());
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            18,
            'Rok dospeća',
            getTestData.proposalDueDateTubeIQ()
          );
        });
    });
  }

  fillInPreparationForContractRealizationDataByCreditAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.selectTubeIQDropdownOption(0, '1');
          cy.enterTubeIQTextInputs(1, getTestData.bankAccountNumberTubeIQ());
        });
    });
  }

  reviewAllContractSigningDataByCreditAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Naziv podnosioca',
            getTestData.proposalDraftApplicantNameTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            1,
            'Adresa i broj podnosioca',
            getTestData.proposalDraftApplicantAddressTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            2,
            'MB podnosioca',
            getTestData.proposalDraftApplicantMBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            3,
            'PIB podnosioca',
            getTestData.proposalDraftApplicantPIBTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            4,
            'Proizvod iz ponude AOFI',
            getTestData.proposalDraftSelectedProductTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            5,
            'Valuta',
            getTestData.proposalDraftCurrencyTubeIQ()
          );
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            6,
            'Iznos',
            getTestData.proposalDraftLoanAmountTubeIQ()
          );
        });
    });
  }

  printTubeIQInstanceDocuments() {
    Assert.verifyPrintDocumentPopupOpen();
    cy.printDocumentsInstanceView();
    cy.closeDocumentsInstanceView();
    // cy.closeAllPopups();
  }

  setDocumentationCompleteToYes() {
    cy.selectTubeIQDropdownOption(0, '1');
  }

  setDocumentationCompleteToNo() {
    cy.selectTubeIQDropdownOption(0, '2');
  }

  setBasicConditionsForProposalDecision() {
    cy.selectTubeIQDropdownOption(1, '1');
    cy.selectTubeIQDropdownOption(2, '1');
    cy.selectTubeIQDropdownOption(3, '1');
    cy.selectTubeIQDropdownOption(4, '1');
    cy.selectTubeIQDropdownOption(5, '1');
    cy.enterTubeIQNumberInputs(6, getTestData.proposalDraftLoanAmountTubeIQ());
    cy.selectTubeIQDropdownOption(7, '1');
    cy.enterTubeIQTextInputs(8, getTestData.proposalDueDateTubeIQ());
    cy.enterTubeIQTextInputs(9, getTestData.proposalInterestRateTubeIQ());
    cy.selectTubeIQDropdownOption(10, '0');
    cy.scrollToBottom(1);
    cy.enterTubeIQTextInputs(12, getTestData.proposalPaymentMethodTubeIQ());
    cy.enterTubeIQTextInputs(13, getTestData.proposalOneTimeFeeAmountTubeIQ());
    cy.enterTubeIQTextInputs(14, getTestData.proposalSpecialConditionsTubeIQ());
    cy.enterTubeIQTextInputs(15, getTestData.proposalRatingTubeIQ());
    cy.enterTubeIQTextInputs(16, getTestData.proposalExposureTubeIQ());
  }

  setRiskOpinionInputs() {
    cy.enterTubeIQTextInputs(22, getTestData.riskOpinionFormTestData().delatnost);
    cy.enterTubeIQTextInputs(23, getTestData.riskOpinionFormTestData().namena);
    cy.enterTubeIQTextInputs(24, getTestData.riskOpinionFormTestData().ukupnaIzlozenost);
    cy.enterTubeIQTextInputs(25, getTestData.riskOpinionApprovalDateTubeIQ());
    cy.enterTubeIQTextInputs(26, getTestData.riskOpinionDueDateTubeIQ());
    cy.enterTubeIQTextInputs(27, getTestData.riskOpinionFormTestData().stanjeDuga);
    cy.enterTubeIQTextInputs(28, getTestData.riskOpinionFormTestData().dospeleObaveze);
    cy.enterTubeIQTextInputs(29, getTestData.riskOpinionFormTestData().napomene);
    cy.enterTubeIQTextInputs(30, getTestData.riskOpinionFormTestData().posebniUslovi);
    cy.enterTubeIQTextInputs(31, getTestData.riskOpinionFormTestData().evaluacijaPredlogaAplikant);
    cy.enterTubeIQTextInputs(
      32,
      getTestData.riskOpinionFormTestData().glavniPozitivniAspektiAplikant
    );
    cy.enterTubeIQTextInputs(
      33,
      getTestData.riskOpinionFormTestData().glavniNegativniAspektiAplikant
    );
    cy.enterTubeIQTextInputs(34, getTestData.riskOpinionFormTestData().interniRejtingAplikant);
    cy.scrollToBottom(1);
    cy.enterTubeIQTextInputs(38, getTestData.riskOpinionFormTestData().ostaleNapomene);
    cy.enterTubeIQTextInputs(39, getTestData.riskOpinionFormTestData().klasifikacija);
    cy.enterTubeIQTextInputs(40, getTestData.riskOpinionFormTestData().misljenjeDirekcijeZaRizike);
  }

  setRiskOpinionExtraInformationToNo() {
    cy.selectTubeIQDropdownOption(42, '0');
  }

  setRiskDptHeadVerificationToYes() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.selectTubeIQDropdownOption(10, '1');
        });
    });
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

  clickApplicantExposureButton() {
    onAPI.interceptExposureOverview();
    cy.get('button ')
      .filterTubeIQByText(['Applicant exposure', 'Izloženost aplikanta'])
      .click({ force: true });
    onAPI.waitExposureOverview();
  }

  selectDateInExposurePopUp() {
    cy.enterTubeIQDateInput(getTestData.proposalApplicantExposureDateTubeIQ());
  }

  // selectDateForDecisionIO() {
  //   cy.enterTubeIQDateInput(getTestData.decisionIODateTubeIQ());
  // }

  setDecisionIOInputs() {
    cy.enterTubeIQTextInputs(0, getTestData.decisionIODateTubeIQ());
    cy.enterTubeIQTextInputs(1, getTestData.decisionIONumberTubeIQ());
    cy.selectTubeIQDropdownOption(4, '0');
  }

  setDecisionCreationToPositive() {
    cy.selectTubeIQDropdownOption(0, '1');
  }

  clickGetDataInExposurePopUp() {
    onAPI.interceptExposureOverviewData();
    cy.get('button.btn.btn-primary').filterTubeIQByText(['Učitaj podatke', 'Get data']).click();
    onAPI.waitExposureOverviewData();
  }

  clickDebtStateButton() {
    onAPI.interceptDebtState();
    cy.get('button ').filterTubeIQByText(['Debt state', 'Stanje duga']).click({ force: true });
    onAPI.waitDebtState();
  }

  clickCustomerArrangementsButton() {
    onAPI.interceptCustomerArrangements();
    cy.get('button ')
      .filterTubeIQByText(['Customer arrangments', 'Pregled po partijama iz KDP'])
      .click({ force: true });
    onAPI.waitCustomerArrangements();
  }

  clickCustomerInfoButton() {
    onAPI.interceptCustomerInfo();
    cy.get('button ')
      .filterTubeIQByText(['Customer info', 'Podaci o klijentu iz CIF-a'])
      .click({ force: true });
    onAPI.waitCustomerInfo();
  }

  closePopUpTubeIQ() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-footer button[data-localized="Close"]').should('be.visible').click();
      });
  }

  clickSaveButton() {
    onAPI.interceptTubeIQSubmitSavePrintTaskInstance();
    cy.scrollToBottom(1);
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Save', 'Sačuvaj'])
      .click({ force: true });
    onAPI.waitForTubeIQSubmitSavePrintTaskInstance();
  }

  clickSubmitButton() {
    onAPI.interceptTubeIQSubmitSavePrintTaskInstance();
    cy.scrollToBottom(1);
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Submit', 'Potvrdi'])
      .should('exist')
      .click({ force: true });
    onAPI.waitForTubeIQSubmitSavePrintTaskInstance();
  }

  clickSubmitButtonTubeIQ() {
    onAPI.interceptTubeIQSubmitSavePrintTaskInstance();
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Submit', 'Potvrdi'])
      .should('exist')
      .click({ force: true });
    onAPI.waitForTubeIQSubmitSavePrintTaskInstance();
  }

  clickSaveAndPrintButton() {
    onAPI.interceptTubeIQSubmitSavePrintTaskInstance();
    cy.scrollToBottom(1);
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Save and print', 'Sačuvaj i štampaj'])
      .should('exist')
      .click({ force: true });
    onAPI.waitForTubeIQSubmitSavePrintTaskInstance();
  }

  clickPrintButton() {
    onAPI.interceptTubeIQSubmitSavePrintTaskInstance();
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Save and print', 'Sačuvaj i štampaj'])
      .should('exist')
      .click({ force: true });
    onAPI.waitForTubeIQSubmitSavePrintTaskInstance();
  }
}
export const onTubeIQInstanceView = new InstanceViewTubeIQ();
