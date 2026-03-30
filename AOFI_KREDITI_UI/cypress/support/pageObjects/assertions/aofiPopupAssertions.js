import { SELECTORS } from '../../selectors';

export class AOFIPopupAssertions {
  visibleNewCreditRequestToastMsg() {
    cy.get(SELECTORS.MODAL_DIALOG).should('be.visible');
  }

  checkBasicDataPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText(['fill in the data', 'popuni podatke', 'попуни податке']);
  }

  checkAddNewCompanyActivityPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit the activity in which the company is engaged',
        'Dodajte ili izmenite delatnost u kojem je preduzeće angažovano',
        'Додајте или измените активности компаније',
      ]);
  }

  checkAddOrEditCompanyStatusPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit company status change',
        'Dodaj ili izmeni statusnu promenu',
        'Додај или измени статусну промену',
      ]);
  }

  checkRealEstatePopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit real estate data',
        'Dodaj ili izmeni podatke o nekretnini',
        'Додај или измени податке о некретнини',
      ]);
  }

  checkStakeholderPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit stakeholder',
        'Dodaj ili izmeni vlasnika udela',
        'Додај или измени власника удела',
      ]);
  }

  checkSalesPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit product group',
        'Dodaj ili izmeni podatke o grupi proizvoda',
        'Додај или измени податке о групи производа',
      ]);
  }

  checkManagementStructurePopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit management structure',
        'Dodaj ili izmeni menadžersku strukturu',
        'Додај или измени менаџерску структуру',
      ]);
  }

  checkEmployeeStructurePopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText(['Fill in the data', 'Popuni podatke', 'Попуни податке']);
  }

  checkJobFinancedPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or Edit Job Financed',
        'Dodaj ili izmeni posao koji se kreditira',
        'Додај или измени посао који се кредитира',
      ]);
  }

  checkGeneralCommentPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText(['Fill in the Data', 'Popuni podatke', 'Попуни податке']);
  }

  checkForeignPaymentTransactionPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit data on foreign currency payment transactions in 000 EUR',
        'Dodaj ili izmeni podatke o deviznom platnom prometu u 000 EUR',
        'Додај или измени податке о девизном платном промету у 000 ЕУР',
      ]);
  }

  checkForeignExchangePopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit data on foreign currency payment transactions in 000 EUR',
        'Dodaj ili izmeni podatke o deviznom platnom prometu u 000 EUR',
        'Додај или измени податке о девизном платном промету у 000 ЕУР',
      ]);
  }

  checkDomesticSupplierPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit domestic supplier',
        'Dodaj ili izmeni domaćeg dobavljača',
        'Додај или измени домаћег добављача',
      ]);
  }

  checkRegionalExportActivityPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit regional export schedule',
        'Dodaj ili izmeni regionalni raspored izvršenog izvoza',
        'Додај или измени регионални распоред извршеног извоза',
      ]);
  }

  checkExportBusinessRelationshipPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit business relationship with customer',
        'Dodaj ili izmeni poslovni odnos sa kupcem',
        'Додај или измени пословни однос са купцем',
      ]);
  }

  checkForeignBuyersPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit foreign buyer',
        'Dodaj ili izmeni međunarodnog kupca',
        'Додај или измени међународног купца',
      ]);
  }

  attachNewDocumentPopupVisible() {
    cy.get(SELECTORS.MODAL_DIALOG)
      .should('be.visible')
      .shouldContainAnyText(['Attach files', 'Dodaj fajlove', 'Додај фајлове']);
  }

  dataSuccessfullySavedToastVisible() {
    cy.contains(
      '[id^="toast_"] .e-toast-message',
      /Data successfully saved|Podaci su uspešno sačuvani|Подаци су успешно сачувани/
    ).should('exist');
  }

  dataSuccessfullyDeletedToastVisible() {
    cy.contains(
      '[id^="toast_"] .e-toast-message',
      /Data successfully deleted|Podaci su uspešno obrisani|Подаци су успешно обрисани/
    ).should('exist');
  }

  cardSuccessfullyCompletedToastVisible() {
    cy.contains(
      '[id^="toast_"] .e-toast-message',
      /Tab has been completed successfully.|Kartica je uspešno završena.|Картица је успешно завршена./
    ).should('exist');
  }

  requestSuccessfullySubmittedToastVisible() {
    const { onAPI } = require('../API');
    onAPI.waitSubmitAofiRequest();
    cy.get('[id^="toast_"] .e-toast-success').should('be.visible');
    cy.url().should('match', /\/request$/);
  }
}
