import { onAPI } from './API';
import * as dateUtils from '../dateUtils';
import { getTestData } from './TestData';
import { verifyFilesInContainer } from '../helpers';

export class Assertions {
  // Custom helper for successful Pravno Lice login
  successfulPravnoLiceLogin() {
    cy.env(['pravnoLice_username']).then(({ pravnoLice_username }) => {
      cy.url().should('contain', 'request');
      cy.get('[role="toolbar"]').should('contain', pravnoLice_username);
    });
  }

  // Custom helper for successful Preduzetnik login
  successfulPreduzetnikLogin() {
    cy.env(['preduzetnik_username']).then(({ preduzetnik_username }) => {
      cy.url().should('contain', 'request');
      cy.get('[role="toolbar"]').should('contain', preduzetnik_username);
    });
  }

  unsuccessfulLoginInput() {
    cy.url().should('contain', 'auth/login');
    cy.get('validation-error')
      .should('be.visible')
      .shouldContainAnyText(['Поље је обавезно.', 'Polje je obavezno.']);
  }

  unsuccessfulLogin() {
    cy.url().should('contain', 'auth/login');
    cy.get('ejs-dialog')
      .should('be.visible')
      .shouldContainAnyText(['Неисправни емаил или лозинка.', 'Neispravni email ili lozinka.']);
  }

  AssertTokenLoginPravnoLice(userName) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    expect(payload.sub).to.eq(userName);
  }

  successfulLogout() {
    cy.url().should('contain', 'auth/login');
    cy.get('button[type="submit"]')
      .should('be.visible')
      .shouldContainAnyText(['Пријава', 'Prijava']);
  }

  checkRegisterButton() {
    cy.get('input[type="submit"]')
      .should('be.visible')
      .should('be.enabled')
      .invoke('attr', 'value')
      .then((text) => {
        expect(text).to.match(/Register|Registracija/i);
      });
  }

  successfulRegistrationPageLoad() {
    cy.url().should('contain', 'Account/Register');
    cy.get('.col-md-6 h2')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const normalized = text.trim();
        const allowed = ['Prijavite se', 'Пријавите се'];
        const matchFound = allowed.some((variant) => normalized.includes(variant));
        expect(matchFound, `Expected title: "${normalized}"`).to.be.true;
      });
  }

  successfulConfirmEmailPageLoad() {
    cy.url().should('contain', 'Account').and('contain', 'ConfirmEmail');
  }

  visibleNewCreditRequestToastMsg() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).should('be.visible');
  }

  confirmNewCreditRequestURL() {
    cy.url().should('contain', 'basicData');
    cy.get('.header').shouldContainAnyText(['Basic data', 'Osnovni podaci', 'Основни подаци']);
  }

  searchedCreditRequestVisible(requestId) {
    cy.wait(1000); // Wait for the search results to update
    cy.get('[id="table-id"]').should('contain', requestId);
  }

  checkBasicDataPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText(['fill in the data', 'popuni podatke', 'попуни податке']);
  }

  checkBasicDataFormFilled() {
    cy.get('app-aofi-request-details-credit')
      .find('.multi-column-form-2')
      .within(() => {
        cy.get('div[class="form-group"]').shouldContainAnyText([
          'A short-term loan with an annuity repayment plan',
          'Kratkoročni kredit sa anuitetnim planom otplate',
          'Краткорочни кредит са ануитетним планом отплате',
        ]);
        cy.get('div[class="form-group"]').shouldContainAnyText([
          '42.002',
          '12',
          'Automation test AOFI credit request legal entity',
        ]);
      });
  }

  checkTheMandatoryConditionsCheckboxChecked() {
    cy.get('label[for^="e-checkbox_"]').within(() => {
      cy.get('.e-label').shouldContainAnyText([
        'I am familiar with the mandatory conditions for applying for the AOFI service',
        'Upoznat sam sa obaveznim uslovima za apliciranje za uslugu AOFI-ja',
        'Упознат сам са обавезним условима за аплицирање за услугу АОФИ-ја',
      ]);
      cy.get('input[type="checkbox"]').should('be.checked');
    });
  }

  checkRealEstatePageDataVisible() {
    cy.closeAllPopups();
    onAPI.waitNewRealEstateSave();
    cy.get('app-real-estate-grid ejs-grid .e-gridcontent')
      .find('table')
      .within(() => {
        cy.get('tbody tr:first-child').shouldContainAnyText([
          'Automated Test',
          'Company Property',
          'Company Location',
          'Company Property Area',
          'Company Property Owner',
          'Company Property Encumbrance',
        ]);
      });
  }

  checkReferenceDataEntered() {
    cy.closeAllPopups();
    cy.get('app-reference-list form')
      .find('.multi-column-form-1')
      .should(
        'contain',
        'This is the Test Reference list:\n\n    1# Test Reference 1\n    2# Test Reference 2\n    3# Test Reference 3'
      );
  }

  checkFinishAndGoToNextButtonEnabled() {
    cy.get('app-aofi-request-details-credit').within(() => {
      cy.get('ejs-tooltip[id="tooltip"]')
        .find('button')
        .shouldContainAnyText([
          'Finish and Go to Next',
          'Završi i pređi na sledeće',
          'Заврши и пређи на следеће',
        ]);
      cy.get('ejs-tooltip[id="tooltip"]').find('button').should('be.enabled');
    });
  }

  confirmCompanyActivitiesPageURL() {
    onAPI.interceptAllCompanyActivities();
    cy.url().should('contain', 'companyActivities');
    cy.get('.header').shouldContainAnyText([
      'Company Activities',
      'Delatnosti preduzeća',
      'Делатности предузећа',
    ]);
    onAPI.waitAllCompanyActivitiesToLoad();
  }

  confirmAccountBlocksPageURL() {
    cy.url().should('contain', 'accountBlocks');
    cy.get('.header').shouldContainAnyText([
      'Data on recorded account blocks',
      'Podaci o evidentiranim blokadama na računu',
      'Подаци о евидентираним блокадама на рачуну',
    ]);
  }

  confirmObligationsPageURL() {
    onAPI.interceptAllObligations();
    cy.url().should('contain', 'obligations');
    cy.get('.header').shouldContainAnyText([
      'Obligations of the borrower towards other banks and financial institutions',
      'Obaveze tražioca plasmana prema drugim bankama i finansijskim institucijama',
      'Обавезе тражиоца пласмана према другим банкама и финансијским институцијама',
    ]);
    onAPI.waitAllObligations();
  }

  confirmRelatedLegalEntitiesPageURL() {
    onAPI.interceptAllLegalEntities();
    cy.url().should('contain', 'legalEntities');
    cy.get('.header').shouldContainAnyText(['Legal Entities', 'Pravna lica', 'Правна лица']);
    onAPI.waitAllLegalEntities();
  }

  confirmCourtDisputesPageURL() {
    onAPI.interceptAllDisputes();
    cy.url().should('contain', 'disputes');
    cy.get('.header').shouldContainAnyText(['Court Disputes', 'Sudski sporovi', 'Судски спорови']);
    onAPI.waitAllDisputes();
  }

  confirmGeneralCommentPageURL() {
    onAPI.interceptAndWaitGeneralComments();
    cy.url().should('contain', 'comment');
    cy.get('.header').shouldContainAnyText(['Comment', 'Komentar', 'Коментар']);
  }

  checkAddNewCompanyActivityPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit the activity in which the company is engaged',
        'Dodajte ili izmenite delatnost u kojem je preduzeće angažovano',
        'Додајте или измените активности компаније',
      ]);
  }

  checkAddOrEditCompanyStatusPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit company status change',
        'Dodaj ili izmeni statusnu promenu',
        'Додај или измени статусну промену',
      ]);
  }

  checkRealEstatePopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit real estate data',
        'Dodaj ili izmeni podatke o nekretnini',
        'Додај или измени податке о некретнини',
      ]);
  }

  checkStakeholderPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit stakeholder',
        'Dodaj ili izmeni vlasnika udela',
        'Додај или измени власника удела',
      ]);
  }

  confirmRealEstatePageURL() {
    onAPI.interceptAllRealEstateAssets();
    cy.url().should('contain', 'realEstateAndEquipment');
    cy.get('.header').shouldContainAnyText([
      'Review of real estate and equipment owned by the company and used by the company for lease',
      'Pregled nepokretnosti i opreme koje su u vlasništvu preduzeća i koje preduzeće koristi u zakupu',
      'Преглед непокретности и опреме које су у власништву предузећа и које предузеће користи у закупу',
    ]);
    onAPI.waitAllRealEstateAssetsToLoad();
  }

  confirmStakeHoldersPageURL() {
    onAPI.interceptAllStakeholders();
    cy.url().should('contain', 'stakeholders');
    cy.get('.header').shouldContainAnyText(['Stakeholders', 'Vlasnici udela', 'Власници удела']);
    onAPI.waitForStakeholdersTableToLoad();
  }

  confirmStatusChangesPageURL() {
    onAPI.interceptAllCompanyStatusChanges();
    cy.url().should('contain', 'companyStatusChange');
    cy.get('.header').shouldContainAnyText([
      'Status changes',
      'Statusne promene',
      'Статусне промене',
    ]);
    onAPI.waitCompanyStatusTableToLoad();
  }

  confirmReferenceListPageURL() {
    onAPI.interceptReferenceAndAttachmentList();
    cy.url().should('contain', 'referenceList');
    cy.get('.header').shouldContainAnyText([
      'Reference list',
      'Referentna lista',
      'Референтна листа',
    ]);
    onAPI.waitReferenceAndAttachmentListLoaded();
  }

  confirmManagementStructurePageURL() {
    onAPI.interceptAllManagementStructure();
    cy.url().should('contain', 'managementStructure');
    cy.get('.header').shouldContainAnyText([
      'Management structure',
      'Menadžerska struktura',
      'Менаџерска структура',
    ]);
    onAPI.waitForManagementStructureTableToLoad();
  }

  confirmSalesPageURL() {
    onAPI.interceptSalesByMainProductList();
    cy.url().should('contain', 'sales');
    cy.get('.header').shouldContainAnyText([
      'Sales by main product groups (amounts in 000 RSD)',
      'Prodaja po glavnim grupama proizvoda (iznosi u 000 RSD)',
      'Продаја по главним групама производа (износи у 000 РСД)',
    ]);
    onAPI.waitSalesByMainProductListToLoad();
  }

  confirmSupplierDataPageURL() {
    onAPI.interceptSuppliersList();
    cy.url().should('contain', 'suppliers');
    cy.get('.header').shouldContainAnyText([
      'Supplier data',
      'Podaci o dobavljačima',
      'Подаци о добављачима',
    ]);
    onAPI.waitSupplierListToLoad();
  }

  checkSalesPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit product group',
        'Dodaj ili izmeni podatke o grupi proizvoda',
        'Додај или измени податке о групи производа',
      ]);
  }

  checkSalesDataVisible() {
    const salesNumbers = ['440.600', '62,00', '585.986', '100,00'];
    cy.get('app-main-product-group-grid ejs-grid .e-gridcontent')
      .find('table')
      .within(() => {
        cy.get('tbody tr:first-child').should('contain', 'Automated Test - Champignons');
        salesNumbers.forEach((num) => {
          cy.get('tbody tr:last-child').should('contain.text', num);
        });
      });
  }

  checkManagementStructurePopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit management structure',
        'Dodaj ili izmeni menadžersku strukturu',
        'Додај или измени менаџерску структуру',
      ]);
  }

  checkEmployeeStructurePopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText(['Fill in the data', 'Popuni podatke', 'Попуни податке']);
  }

  checkThatCompanyEstablishmentYearIsAdded() {
    cy.get('table tbody tr:first-child').should('contain', 'Оснивање фирме').and('contain', '2005');
  }

  checkThatNewCompanyActivityIsAdded() {
    cy.get('ejs-grid[id^="grid_"]').within(() => {
      cy.get('.e-gridcontent')
        .should('contain', 'Test Automation Business Activity')
        .and('contain', '100');
    });
  }

  checkThatNewDomesticSupplierIsAdded() {
    cy.get('app-domestic-foreign-grid[gridtitle="Domestic supplier"]').within(() => {
      cy.get('.e-gridcontent tbody tr')
        .first()
        .should('contain', 'Automated Test Domestic Supplier 1')
        .and('contain', '100');
    });
  }

  checkThatNewForeignBuyerIsAdded() {
    cy.get('app-domestic-foreign-grid[gridtitle="Foreign buyers"]').within(() => {
      cy.get('.e-gridcontent tbody tr')
        .first()
        .should('contain', 'Automated Test Foreign buyer')
        .and('contain', '100');
    });
  }

  confirmBuyerDataPageURL() {
    onAPI.interceptAllCustomerData();
    cy.url().should('contain', 'customers');
    cy.get('.header').shouldContainAnyText(['Buyer data', 'Podaci o kupcima', 'Подаци о купцима']);
    onAPI.waitAllCustomerDataToLoad();
  }

  confirmCompetitorsPageURL() {
    cy.url().should('contain', 'competitors');
    cy.get('.header').shouldContainAnyText([
      'Most significant competitors',
      'Najznačajniji konkurenti',
      'Најзначајнији конкуренти',
    ]);
  }

  confirmExportActivityPageURL() {
    onAPI.interceptExportActivityTables();
    cy.url().should('contain', 'exportActivity');
    cy.get('.header').shouldContainAnyText([
      'Export activity of the borrower',
      'Izvozna aktivnost zajmotražioca',
      'Извозна активност зајмотражиоца',
    ]);
    onAPI.waitExportActivityTablesToLoad();
  }

  confirmPaymentTransactionsThroughBanksPageURL() {
    onAPI.interceptAllTransactions();
    cy.url().should('contain', 'paymentTransactions');
    cy.get('.header').shouldContainAnyText([
      'Payment transactions through banks',
      'Platni promet preko banaka',
      'Платни промет преко банака',
    ]);
    onAPI.waitAllTransactionsDataToLoad();
  }

  confirmJobsFinancedPageURL() {
    onAPI.interceptAllJobsFinanced();
    cy.url().should('contain', 'jobFinanced');
    cy.get('.header').shouldContainAnyText([
      'Jobs Financed',
      'Poslovi koji se kreditiraju',
      'Послови који се кредитирају',
    ]);
    onAPI.waitJobsFinancedTableToLoad();
  }

  confirmDocumentationPageURL() {
    onAPI.waitForAllDocumentationAttachmentsToLoad();
    cy.url().should('contain', 'documentation');
    cy.get('.header').shouldContainAnyText(['Documentation', 'Dokumentacija', 'Документација']);
  }

  checkJobFinancedPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or Edit Job Financed',
        'Dodaj ili izmeni posao koji se kreditira',
        'Додај или измени посао који се кредитира',
      ]);
  }

  confirmSubmitRequestButtonIsEnabled() {
    cy.get('app-documents .status-bar .submit-button').should('be.visible');
  }

  checkGeneralCommentPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText(['Fill in the Data', 'Popuni podatke', 'Попуни податке']);
  }

  checkForeignPaymentTransactionPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit data on foreign currency payment transactions in 000 EUR',
        'Dodaj ili izmeni podatke o deviznom platnom prometu u 000 EUR',
        'Додај или измени податке о девизном платном промету у 000 ЕУР',
      ]);
  }

  checkPaymentTransactionForeignExchangeDataVisible() {
    cy.closeAllPopups();
    const foreignPaymentData = [
      'Automated Test Foreign Exchange Bank 1',
      '201.222',
      '100.111',
      '351.044',
      '254.407',
    ];
    cy.get('app-foreign-eur-transactions-grid ejs-grid .e-gridcontent')
      .find('tbody tr')
      .first()
      .find('td:not(:last-child)')
      .each(($td, index) => {
        expect($td.text()).to.contain(foreignPaymentData[index]);
      });
  }

  checkManagementStructureDataVisible() {
    onAPI.waitForManagementStructureTableToLoad();
    const managementData = ['Automated Test - Testing Joe', 'Automated Test - Manager', '9', '47'];
    cy.get('app-management-structure-grid ejs-grid .e-gridcontent')
      .find('table')
      .within(() => {
        managementData.forEach((text) => {
          cy.get('tbody tr').should('contain.text', text);
        });
      });
  }

  checkNumberOfEmployeesDataVisible() {
    const employeesNumber = ['1', '2', '3', '6'];
    cy.get('app-average-employees-details').within(() => {
      employeesNumber.forEach((text) => {
        cy.get('h2.column-h2').should('contain.text', text);
      });
    });
  }

  checkRegionalExportActivityDataVisible() {
    const regionalExportData = [
      'Greece',
      'Hellenic Import T.E.S.T.',
      'Direct sales',
      '123.055,00',
      '194.577,00',
    ];
    cy.get('app-regional-export-schedule-grid ejs-grid .e-gridcontent')
      .find('table')
      .within(() => {
        regionalExportData.forEach((text) => {
          cy.get('tbody tr:last-child').should('contain.text', text);
        });
      });
  }

  checkExportBusinessRelationshipDataVisible() {
    const validTestData = ['Hellenic Import T.E.S.T.', '2015'];
    cy.get('app-business-relationship-history-details').within(() => {
      validTestData.forEach((text) => {
        cy.contains(text).should('exist');
      });
    });
  }

  checkExpectedExportRevenueDataVisible() {
    const validTestData = ['Mushrooms', '1.637.552,00'];
    cy.get('app-job-financed-grid ejs-grid .e-gridcontent')
      .find('table')
      .within(() => {
        validTestData.forEach((text) => {
          cy.get('tbody tr').should('contain.text', text);
        });
      });
  }

  checkDomesticSupplierPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit domestic supplier',
        'Dodaj ili izmeni domaćeg dobavljača',
        'Додај или измени домаћег добављача',
      ]);
  }

  checkRegionalExportActivityPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit regional export schedule',
        'Dodaj ili izmeni regionalni raspored izvršenog izvoza',
        'Додај или измени регионални распоред извршеног извоза',
      ]);
  }

  checkExportBusinessRelationshipPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit business relationship with customer',
        'Dodaj ili izmeni poslovni odnos sa kupcem',
        'Додај или измени пословни однос са купцем',
      ]);
  }

  checkForeignBuyersPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit foreign buyer',
        'Dodaj ili izmeni međunarodnog kupca',
        'Додај или измени међународног купца',
      ]);
  }

  checkForeignExchangePopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText([
        'Add or edit data on foreign currency payment transactions in 000 EUR',
        'Dodaj ili izmeni podatke o deviznom platnom prometu u 000 EUR',
        'Додај или измени податке о девизном платном промету у 000 ЕУР',
      ]);
  }

  verifyCreditRequestSentForFurtherProcessing() {
    cy.get('#tasks-view-container').within(() => {
      dateUtils.assertTimestampNotInTubeIQTaskList(
        '.behavior-task-info',
        dateUtils.getRecordedTimestamp()
      );
    });
  }

  checkReferenceListDocumentAttached() {
    cy.get('app-manage-attachments-for-object').within(() => {
      cy.get('.file-list [class="e-card-details file-details"]').should('not.be.empty');
    });
  }

  attachNewDocumentPopupVisible() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    )
      .should('be.visible')
      .shouldContainAnyText(['Attach files', 'Dodaj fajlove', 'Додај фајлове']);
  }

  fileAttachmentsVisible(fileNames) {
    const files = Array.isArray(fileNames) ? fileNames : [fileNames];
    files.forEach((name) => {
      cy.get('.filesAttachments').should('contain', name);
    });
  }

  tubeIQInstanceAttachmentVisible(fileNames) {
    const files = Array.isArray(fileNames) ? fileNames : [fileNames];
    files.forEach((name) => {
      cy.get('.e-upload-files .file-name').should('exist').and('contain', name);
      cy.log(`Attachment visible: ${name}`);
      console.log(`Attachment visible: ${name}`);
    });
  }

  verifyCreditRequestDocumentsAttached() {
    const expectedDocs = getTestData.creditRequestDocumentsAOFI();
    expectedDocs.forEach(({ index, fileName, note }) => {
      cy.get('app-documents .padding-container.with-status-bar app-manage-attachments-for-object')
        .eq(index)
        .within(() => {
          // Check that file icon exists
          cy.get('.file-list .file-icon').should('exist');
          // Check that file title contains expected file name
          cy.get('.file-list .e-card-header-title')
            .invoke('text')
            .then((text) => {
              expect(text.trim()).to.include(fileName);
            });
          // Check that document note contains expected note text
          cy.get('.file-list .document-note span')
            .invoke('text')
            .then((noteText) => {
              expect(noteText.trim()).to.include(note);
            });
        });
    });
  }

  verifyPrintDocumentPopupOpen() {
    cy.get('generate-documents ejs-dialog').should('be.visible');
    cy.get('generate-documents ejs-dialog #dialog_dialog-content').shouldContainAnyText([
      'Kreditni',
      'Proces',
      'Krediti',
      'Predlog',
      'OsnovniUsloviNovo',
      '.docx',
    ]);
  }

  verifyCreditPropositionDownloaded() {
    cy.verifyFileNameAndExtension(['KreditniProcesKreditiPredlog', 'Kreditni predlog'], 'docx');
    // cy.verifyDocxContent(
    //   ['KreditniProcesKreditiPredlog.docx', 'Kreditni predlog .docx'],
    //   getTestData.creditProposalDocumentData()
    // );
  }

  verifySignedContractDocumentDownloaded() {
    cy.verifyFileNameAndExtension(['UgovorOKreditu', 'Potpisan ugovor'], 'docx');
    cy.verifyDocxContent(
      ['UgovorOKreditu.docx', 'Potpisan ugovor .docx'],
      getTestData.signedCreditContractDocumentData()
    );
  }

  verifyDecisionIODocumentDownloaded() {
    cy.verifyFileNameAndExtension(['OdlukaIO', 'Odluka IO'], 'docx');
    cy.verifyDocxContent(
      ['OdlukaIO.docx', 'Odluka IO .docx'],
      getTestData.decisionIODocumentData()
    );
  }

  verifyCreditDecisionPropositionDownloaded() {
    cy.verifyFileNameAndExtension(['PredlogOdlukeNovo', 'Predlog odluke - kredit'], 'docx');
    cy.verifyDocxContent(
      ['PredlogOdlukeNovo.docx', 'Kreditni predlog .docx'],
      getTestData.creditCreditDecisionProposalDocumentData()
    );
  }

  verifyBasicConditionsDocumentDownloaded() {
    cy.verifyFileNameAndExtension(['OsnovniUsloviNovo', 'Osnovni uslovi'], 'docx');
    cy.verifyDocxContent(
      ['OsnovniUsloviNovo.docx', 'Osnovni uslovi .docx'],
      getTestData.basicConditionsDocumentData()
    );
  }

  verifyRiskOpinionDocumentReadyForUpload() {
    cy.verifyFileNameAndExtension(['Risk mišljenje'], 'docx');
  }

  verifyFinalRiskOpinionDocumentDownloaded() {
    cy.verifyFileNameAndExtension(['Risk mišljenje'], 'docx');
    cy.verifyDocxContent('Risk mišljenje.docx', getTestData.riskOpinionFinalDocumentTestData());
  }

  verifyApplicantExposurePopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Izloženost aplikanta', 'Applicant exposure']);
      });
  }

  verifyDebtStatePopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Stanje duga', 'Debt state']);
      });
  }

  verifyCustomerArrangementsPopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Pregled po partijama iz KDP', 'Customer arrangments']);
      });
  }

  verifyCustomerInfoPopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Podaci o klijentu iz CIF-a', 'Customer info']);
      });
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
    onAPI.waitSubmitAofiRequest();
    onAPI.waitAllAOFIRequestsFromList();
    cy.contains(
      '[id^="toast_"] .e-toast-success',
      /Request submitted successfully.|Zahtev je uspešno podnet|Захтев је успешно поднет/
    ).should('exist');
  }

  confirmTubeIQLoginURL() {
    cy.env(['tubeIQ_url']).then((tubeIQUrl) => {
      cy.url().should('contain', tubeIQUrl);
    });
  }

  confirmTubeIQDashboardURL() {
    cy.url().should('include', '/My/Home');
  }

  confirmTubeIQTasksPageURL() {
    cy.url().should('include', '/My/Inbox?name=tasks');
    // onAPI.interceptAndWaitTubeIQTasksPageToLoad();
  }

  confirmInstancePageIsLoaded() {
    cy.get('.full-page-header [role="navigation"] ul.nav').shouldContainAnyText([
      'Tasks',
      'Zadaci',
      'Задаци',
    ]);
  }

  verifyTubeIQRiskVerificationIsSetToYes() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            10,
            'Verifikacija direktora rizika',
            'Da'
          );
        });
    });
  }

  verifyTubeIQRiskVerificationCreditAdvisorIsSet() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Odabir kreditnog referenta',
            'Nikola Nikolic'
          );
        });
    });
  }

  verifyTubeIQRiskProposalCompletionLegalAdvisorIsSet() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            0,
            'Odabir referenta pravne službe',
            'Nikola Nikolic'
          );
        });
    });
  }

  verifyTubeIQDecisionRevisionIsSetToNo() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          Assert.verifyTubeIQInstanceInputsAreDisplayedWithValidData(
            12,
            'Da li je potrebna dorada kreditne odluke?',
            'Ne'
          );
        });
    });
  }

  confirmUserNotLoggedInTubeIQ() {
    cy.url().should('not.include', '/My/Home');
  }

  apiLoginTubeIQFails(resp) {
    expect([200, 400, 500]).to.include(resp.status);
    if (resp.body === 'Missing CSRF token') {
      expect(resp.status).to.eq(400);
    } else {
      expect(resp.body).to.include('<title>Building Smart Process Apps - TubeIQ</title>');
    }
  }

  unsuccessfulTubeIQLogin() {
    cy.get('form[id="Login"]').should('be.visible').and('contain', 'Invalid login attempt.');
  }

  checkTubeIQTasksListSearchResultsDptHead() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Obrada zahteva - rukovodilac kreditnog sektora',
      'Rukovodilac sektora za kredite',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchResultsCreditAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Inicijalna obrada zahteva - kreditni referent',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchCollateralEntryCreditAdvisor() {
    // onAPI.waitFilteredInboxItemsTubeIQ();
    cy.wait(2000); // Wait for the tasks list to update after collateral entry
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Unos kolaterala, dodatnih elemenata i kreiranje kreditnog predloga',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchProposalDraftEntryCreditAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Priprema za izradu predloga odluke',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchDecisionProposalEntryCreditAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = ['Predlog odluke', 'Nikola Nikolic', 'Kreditni Process - QATesting'];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchDecisionProposalVerificationCreditDptHead() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Verifikacija predloga kreditne odluke',
      'Rukovodilac sektora za kredite',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchPrintingTheDecisionProposalCreditAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = ['Štampa predloga kreditne odluke', 'Kreditni Process - QATesting'];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchForwardingTheRequestByRiskDptHead() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Prosleđivanje zahteva savetniku za rizike',
      'Direktor direkcije za upravljanje rizicima',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchRiskOpinionVerificationByRiskDptHead() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Verifikacija',
      'Direktor direkcije za upravljanje rizicima',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchRiskOpinionByAnyRiskAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Obrada zahteva - Risk mišljenje',
      'Savetnik organizacionog dela za rizike',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchRiskOpinionBySelectedRiskAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Obrada zahteva - Risk mišljenje',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchRiskOpinionFinalizationByAnyRiskAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Finalizacija mišljenja rizika',
      'Savetnik organizacionog dela za rizike',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchRiskOpinionFinalizationBySelectedRiskAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Finalizacija mišljenja rizika',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchRiskOpinionCompletionBySelectedRiskAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Kompletiranje predloga sa risk mišljenjem',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchDecisionIOBySelectedLegalServiceOfficer() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = ['Odluka IO', 'Nikola Nikolic', 'Kreditni Process - QATesting'];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchDecisionCreationBySelectedLegalServiceOfficer() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = ['Kreiranje odluke', 'Nikola Nikolic', 'Kreditni Process - QATesting'];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchContractCreationBySelectedCreditAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Priprema za realizaciju ugovora',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchContractRealisationByAnyFinanceOfficer() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Realizacija',
      'Saradnik u sektoru finansija',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchPreparationForContractRealizationBySelectedLegalServiceOfficer() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Kreiranje ugovora - pravna služba',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  confirmSelectedTubeIQCreditRequestTaskDptHead() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Obrada zahteva - rukovodilac kreditnog sektora',
      'Rukovodilac sektora za kredite',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQCreditRequestTaskCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Inicijalna obrada zahteva - kreditni referent',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
      'Ready',
      'Spreman',
    ]);
  }

  confirmSelectedTubeIQCollateralEntryTaskCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Unos kolaterala, dodatnih elemenata i kreiranje kreditnog predloga',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQProposalDraftTaskCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Priprema za izradu predloga odluke',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQDecisionProposalTaskCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Predlog odluke - kreditni referent',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQDecisionProposalVerificationTaskDptHead() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Verifikacija predloga kreditne odluke',
      'Rukovodilac sektora za kredite',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQPrintingTheDecisionProposalTaskCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Štampa predloga kreditne odluke',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQForwardingTheRequestTaskRiskDptHead() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Prosleđivanje zahteva savetniku za rizike',
      'Direktor direkcije za upravljanje rizicima',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQRiskOpinionVerificationTaskRiskDptHead() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Verifikacija',
      'Direktor direkcije za upravljanje rizicima',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQRiskOpinionTaskAnyRiskAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Obrada zahteva - Risk mišljenje',
      'Savetnik organizacionog dela za rizike',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQRiskOpinionFinalizationTaskAnyRiskAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Finalizacija mišljenja rizika',
      'Savetnik organizacionog dela za rizike',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQRiskOpinionTaskSelectedRiskAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Obrada zahteva - Risk mišljenje',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQRiskOpinionCompletionTaskSelectedRiskAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Kompletiranje predloga sa risk mišljenjem',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQDecisionIOTaskSelectedLegalServiceOfficer() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Odluka IO',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQDecisionCreationTaskSelectedLegalServiceOfficer() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Kreiranje odluke',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQPreparationForContractRealizationTaskSelectedCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Priprema za realizaciju ugovora',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQContractSigningTaskSelectedCreditAdvisor() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Priprema za realizaciju ugovora',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQContractRealisationTaskAnyFinanceOfficer() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Realizacija',
      'Saradnik u sektoru finansija',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  confirmSelectedTubeIQContractCreationTaskSelectedLegalServiceOfficer() {
    cy.get('#tasks-view-container').shouldContainAnyText([
      'Kreiranje ugovora - pravna služba',
      'Nikola Nikolic',
      'Ready',
      'Spreman',
      'Kreditni Process - QATesting',
    ]);
  }

  verifyTubeIQTaskSuccessfullyAssignedToSelectedUser() {
    cy.get('.behavior-task-info')
      .eq(0)
      .shouldContainAnyText(['Nikola Nikolic', 'Nikola Nikolić', 'Никола Николић']);
  }

  verifyTubeIQInstanceInputsDataLoadedDptHead() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          // map of expected values
          const expectedValues = {
            1: 'Pravno lice',
            2: 'QATesting',
            5: 'adresaPrva',
            6: 'Кratkoročni kredit sa planom otplate',
            7: '420.002',
            8: 'EUR',
            9: '12',
            // 10: '12',
          };
          // iterate through the map
          Object.entries(expectedValues).forEach(([index, value]) => {
            cy.getTubeIQInstanceInputs(Number(index)).should('have.value', value);
          });
          // special cases
          cy.getTubeIQInstanceInputs(3).assertReadonlyDigits(8);
          cy.getTubeIQInstanceInputs(4).assertReadonlyDigits(9);
          cy.get('.fill-row')
            .eq(11)
            .find('textarea')
            // .should('contain', 'Automation test AOFI credit request legal entity');
            .should('contain', 'Automation test AOFI loan request legal entity');
        });
    });
  }

  verifyTubeIQInstanceInputsDataLoadedCreditAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          // map of expected values
          const expectedValues = {
            1: 'QATesting',
            4: 'Кratkoročni kredit sa planom otplate',
            5: '420.002',
            6: 'EUR',
            7: '12',
            // 10: '12',
          };
          // iterate through the map
          Object.entries(expectedValues).forEach(([index, value]) => {
            cy.getTubeIQInstanceInputs(Number(index)).should('have.value', value);
          });
          // special cases
          cy.getTubeIQInstanceInputs(2).assertReadonlyDigits(8);
          cy.getTubeIQInstanceInputs(3).assertReadonlyDigits(9);
          cy.get('.fill-row')
            .eq(9)
            .find('textarea')
            // .should('contain', 'Automation test AOFI credit request legal entity');
            .should('contain', 'Automation test AOFI loan request legal entity');
        });
    });
  }

  // Verify that specific instance input fields are disabled (readonly)
  verifyInstanceInputsDisabled() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
    cy.get('#tasks-view-container').within(() => {
      cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          // check the list of indexes of readonly attributes
          const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12];
          indices.forEach((i) => {
            cy.getTubeIQInstanceInputs(i).should('have.attr', 'readonly');
          });
          // special case for textarea inputs
          cy.get('.fill-row').eq(11).find('textarea').should('have.attr', 'readonly');
        });
    });
  }

  /* Verify that Collateral option appeared when set
   * @param {number} rowIndex - row indeks where the dropdown is located
   * Usage: Assert.verifyCollateralOptionSetIsDisplayed(2, 'Da');
   */
  verifyCollateralOptionSetIsDisplayed(rowIndex, optionSet) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1}) .tubeiq-select`).should('contain.text', optionSet);
    cy.document().then((doc) => {
      const grid = doc.querySelector('ejs-grid.tubeiq-table-grid');
      if (!grid || grid.offsetParent === null) {
        throw new Error('Table not displayed!!');
      }
      cy.log('Table is successfully displayed.');
    });
  }

  /* Verify data values in instance view tables
   * @param {number} rowIndex - row index where the table is located
   * @param {string} tableName - name of the table to verify
   * @param {object|string|array} dataValues - expected data values in the table
   * Usage:
   * 1. Assert.verifyCollateralTableIsDisplayedWithValidData(3, 'Real estate', { Location: 'Belgrade', Area: '150', EstimatedValue: '300.000' });
   * 2. Assert.verifyCollateralTableIsDisplayedWithValidData(4, 'Languages', ['English', 'German', 'French']);
   * 3. Assert.verifyCollateralTableIsDisplayedWithValidData(5, 'Some Table', 'Bez rezultata');
   */

  verifyCollateralTableIsDisplayedWithValidData(rowIndex, tableName, dataValues) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      cy.get('.form-field .form-field__control').should('contain.text', tableName);
      if (typeof dataValues === 'string') {
        // if string contains "||", parse into array variants
        if (dataValues.includes('||')) {
          const variants = dataValues.split('||').map((v) => v.trim());
          cy.get(
            '.form-field .form-field__control ejs-grid .e-gridcontent table tbody'
          ).shouldContainAnyText(variants);
        } else {
          cy.get('.form-field .form-field__control ejs-grid .e-gridcontent table tbody').should(
            'contain.text',
            dataValues
          );
        }
      } else if (Array.isArray(dataValues)) {
        // if it's an array
        cy.get(
          '.form-field .form-field__control ejs-grid .e-gridcontent table tbody'
        ).shouldContainAnyText(dataValues);
      } else {
        // object with columns
        const values = Object.values(dataValues);
        values.forEach((value) => {
          cy.get('.form-field .form-field__control ejs-grid .e-gridcontent').should(
            'contain.text',
            value
          );
        });
      }
    });
  }

  // Verify that collateral text inputs are not empty and test data is displayed
  verifyCollateralTextboxIsDisplayedWithValidData(rowIndex, tableName, expectedTextareaValue) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      // check if tableName is present within form-field controls
      cy.get('.form-field .form-field__label-helper').should('contain.text', tableName);
      // textarea content check (Syncfusion ejs-textbox)
      cy.get('ejs-textbox textarea.e-input')
        .should('exist')
        .invoke('val')
        .then((val) => {
          if (expectedTextareaValue) {
            expect(val).to.contain(expectedTextareaValue); // explicit check
          } else {
            expect(val).not.to.be.empty; // fallback: not empty
          }
        });
    });
  }

  // Verify that TubeIQ Instance inputs (numeric, dropdown, masked, textbox, placeholder) are not empty and test data is displayed
  verifyTubeIQInstanceInputsAreDisplayedWithValidData(rowIndex, tableName, expectedValue) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      cy.get('.form-field .form-field__label-helper').should('contain.text', tableName);
      cy.get('.form-field .form-field__control')
        .find(
          'textarea.e-input, input.e-input, input.app-input, input.e-numerictextbox, input.e-maskedtextbox'
        )
        .should('exist')
        .then(($el) => {
          const val = $el.val() || $el.attr('value') || $el.text() || $el.attr('placeholder');
          if (expectedValue) {
            const normalize = (s) =>
              s
                .replace(/[\u041A]/g, 'K')
                .replace(/\s+/g, ' ')
                .trim();
            // line-by-line check
            expectedValue.split('\n').forEach((line) => {
              expect(normalize(val)).to.include(normalize(line));
            });
          } else {
            expect(val).not.to.be.empty;
          }
        });
    });
  }

  // Verify that collateral liquidity text input is not empty and test data is displayed
  verifyCollateralLiquidityAndRatingTextboxIsDisplayedWithValidData(
    rowIndex,
    tableName,
    expectedTextareaValue
  ) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      // check if tableName is present within form-field controls
      cy.get('.form-field .form-field__label-helper').should('contain.text', tableName);
      // textarea content check (Syncfusion ejs-textbox)
      cy.get('input.e-maskedtextbox')
        .should('exist')
        .invoke('val')
        .then((val) => {
          if (expectedTextareaValue) {
            expect(val).to.contain(expectedTextareaValue); // explicit check
          } else {
            expect(val).not.to.be.empty; // fallback: not empty
          }
        });
    });
  }

  // Verify that specific instance input fields are enabled for editing
  verifyInstanceInputsEnabled() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          // dropdown indexes
          const dropdownIndices = [1, 6, 8];
          dropdownIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('ejs-dropdownlist')
                  .should('exist')
                  .should('have.attr', 'aria-disabled', 'false')
                  .and('not.be.disabled');
              });
          });
          // input indexes
          const inputIndices = [2, 3, 4, 5, 7, 9, 12];
          inputIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('input').should('exist').should('not.be.disabled');
              });
          });
          // special case for textarea inputs
          cy.get('.fill-row')
            .eq(11)
            .within(() => {
              cy.get('textarea').should('exist').should('not.be.disabled');
            });
        });
    });
  }

  verifyInstanceInputsEnabledCreditAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          // dropdown indexes
          const dropdownIndices = [4, 6, 11];
          dropdownIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('ejs-dropdownlist')
                  .should('have.attr', 'aria-disabled', 'false')
                  .and('not.be.disabled');
              });
          });
          // input indexes
          const inputIndices = [1, 2, 3, 5, 7, 8, 10];
          inputIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('input').should('exist').should('not.be.disabled');
              });
          });
          // special case for textarea inputs
          cy.get('.fill-row')
            .eq(9)
            .within(() => {
              cy.get('textarea').should('exist').should('not.be.disabled');
            });
        });
    });
  }
  // check that comments are loaded and the last comment matches the expected text
  verifyTubeIQComments(expectedComment) {
    onAPI.waitForTubeIQTaskCommentsToLoad();
    cy.get('form .form-group').within(() => {
      cy.get('.CountComments')
        .invoke('text')
        .then((text) => {
          const count = parseInt(text.replace(/[^\d]/g, ''), 10);
          expect(count).to.be.greaterThan(0);
          // Use load more command with counter
          cy.clickLoadMoreTubeIQCommentsByCount(count);
        });
      // check that the last comment's text matches the expected comment
      cy.get('.comment-listFalse [data-typename="CaseComment"]')
        .last()
        .within(() => {
          cy.get('.comment-post')
            .invoke('text')
            .then((text) => {
              expect(text.trim()).to.eq(expectedComment);
            });
        });
    });
  }

  // Verify that the expected attachments are present in the TubeIQ task
  verifyAttachmentsInTubeIQ(expectedFileNames) {
    cy.scrollToBottom(1);
    cy.get('#document-container-Dokumentacija').within(() => {
      expectedFileNames.forEach((fileName) => {
        cy.get('.dz-filename span').then(($els) => {
          const texts = $els.toArray().map(
            (el) => el.innerText.trim().toLowerCase().replace(/\s+/g, ' ') // normalize whitespaces and case
          );
          const normalizedExpected = fileName.trim().toLowerCase().replace(/\s+/g, ' ');
          expect(texts).to.include(normalizedExpected);
        });
      });
    });
  }

  // Verify that the expected complete documentation attachments are present in the TubeIQ Attachments panel
  // Usage: Assert.verifyCompleteDocumentationInTubeIQ(onTubeIQAttachmentsView.getCompleteRiskOpinionVerificationDocumentation()
  verifyCompleteDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompleteRequestForwardingDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompletePropositionDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
  }

  verifyCompleteRiskDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
  }

  verifyCompleteDecisionIODocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
  }

  verifyCompleteDecisionCreationDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
  }

  verifyCompleteContractCreationDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-ObavestenjeODostavljenojDokumentaciji',
      expectedAttachments.ObavestenjeODostavljenojDokumentaciji
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompleteContractSigningDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-DokumentSaglasnosti',
      expectedAttachments.DokumentSaglasnosti
    );
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-ObavestenjeODostavljenojDokumentaciji',
      expectedAttachments.ObavestenjeODostavljenojDokumentaciji
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompleteContractSigningDocumentationWithRealisationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-DokumentSaglasnosti',
      expectedAttachments.DokumentSaglasnosti
    );
    verifyFilesInContainer(
      '#document-container-PotpisanUgovor',
      expectedAttachments.PotpisanUgovor
    );
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-ObavestenjeODostavljenojDokumentaciji',
      expectedAttachments.ObavestenjeODostavljenojDokumentaciji
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompletePreparationForContractRealizationDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
  }

  // Verify that conflict of interest value is set
  verifyTubeIQConflictOfInterestsIsSet(value) {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li postoji konflikt interesa?')
      .within(() => {
        cy.get('span.e-input-group').should('contain', value);
      });
  }

  // Verify that loan splitting value is set
  verifyTubeIQLoanSplittingIsSet(value) {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li dolazi do razdvajanja kredita?')
      .within(() => {
        cy.get('span.e-input-group').should('contain', value);
      });
  }

  confirmTubeIQSaveAndPrintButtonExists() {
    cy.scrollToBottom(1);
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Save and print', 'Sačuvaj i štampaj'])
      .should('exist');
  }

  confirmTubeIQPrintButtonExists() {
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Save and print', 'Sačuvaj i štampaj'])
      .should('exist');
  }
}
export const Assert = new Assertions();
