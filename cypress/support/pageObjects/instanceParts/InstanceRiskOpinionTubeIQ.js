import { onAPI } from '../API';
import { Assert } from '../assertions';
import { getTestData } from '../TestData';

export class InstanceRiskOpinionTubeIQ {
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
}
