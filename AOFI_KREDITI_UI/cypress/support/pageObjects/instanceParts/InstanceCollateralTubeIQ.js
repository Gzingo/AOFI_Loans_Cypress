import { onAPI } from '../API';
import { Assert } from '../assertions';
import { getTestData } from '../TestData';

export class InstanceCollateralTubeIQ {
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
}
