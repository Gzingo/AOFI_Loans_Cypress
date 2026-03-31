import { onAPI } from '../API';
import { Assert } from '../assertions';
import { getTestData } from '../TestData';

export class InstanceActionsTubeIQ {
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
