import { onAPI } from '../API';

export class AOFIPageAssertions {
  confirmNewCreditRequestURL() {
    cy.url().should('contain', 'basicData');
    cy.get('.header').shouldContainAnyText(['Basic data', 'Osnovni podaci', 'Основни подаци']);
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

  confirmRealEstatePageURL() {
    onAPI.interceptAllRealEstateAssets();
    cy.url().should('contain', 'realEstateAndEquipment');
    cy.get('.header').shouldContainAnyText([
      'Review of real estate and equipment owned by the company and used by the company for lease',
      'Pregled nepokretnosti i opreme koje su u vlasništvu preduzeća i koje preduzeće koristi u zakupu',
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

  confirmSubmitRequestButtonIsEnabled() {
    cy.get('app-documents .status-bar .submit-button').should('be.visible');
  }

  confirmTubeIQTasksPageURL() {
    cy.url().should('include', '/My/Inbox?name=tasks');
  }

  confirmInstancePageIsLoaded() {
    cy.get('.full-page-header [role="navigation"] ul.nav').shouldContainAnyText([
      'Tasks',
      'Zadaci',
      'Задаци',
    ]);
  }
}
