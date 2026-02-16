import { Assert } from './assertions';

export class API {
  interceptSuccessfulLogin() {
    cy.intercept('POST', `**/api/account/login`).as('loginCall');
    cy.wait('@loginCall').its('response.statusCode').should('eq', 200);
  }

  interceptUnsuccessfulLogin() {
    cy.intercept('POST', `**/api/account/login`).as('loginCall');
    cy.wait('@loginCall').its('response.statusCode').should('eq', 500);
  }

  validateTokenAndSubject() {
    cy.intercept('POST', '/api/account/login').as('loginCall');
    cy.validLoginPravnoLice();
    cy.wait('@loginCall').then(({ response }) => {
      const token = response.body?.value?.token;
      const userName = response.body?.value?.userName;
      expect(token, 'Token should be present in response').to.exist;
      expect(userName, 'userName should be present in response').to.exist;
      // Check if JWT is valid
      const parts = token.split('.');
      expect(parts.length, 'Token should have 3 parts').to.eq(3);
      const payload = JSON.parse(atob(parts[1]));
      expect(payload).to.include.all.keys('sub', 'exp', 'iss');
      cy.log('Decoded JWT payload:', payload);
      // Check if sub from token matches userName
      expect(payload.sub, 'sub in token should match userName').to.eq(userName);
      // Manually set token in localStorage for further testing (optional)
      cy.window().then((win) => {
        win.localStorage.setItem('token', token);
      });
    });
  }

  verifyTokenClearedOnLogout() {
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token, 'Token should be removed from localStorage after logout').to.be.null;
    });
  }

  interceptAllStakeholders() {
    cy.intercept('GET', '/api/aofiRequest/getAllStakeholders*').as('getStakeholder');
  }

  waitForStakeholdersTableToLoad() {
    cy.wait('@getStakeholder').its('response.statusCode').should('eq', 200);
  }

  interceptSuppliersList() {
    cy.intercept('GET', '/api/aofiRequest/getAllDomesticOrForeign*').as('waitSupplierListToLoad');
  }

  waitSupplierListToLoad() {
    cy.wait(1500);
    cy.wait('@waitSupplierListToLoad').its('response.statusCode').should('eq', 200);
  }

  interceptCustomerTable() {
    cy.intercept('GET', '/api/aofiRequest/getAllTermsOfSale*').as('waitCutomersListToLoad');
  }

  waitCustomerTableToLoad() {
    cy.wait('@waitCutomersListToLoad').its('response.statusCode').should('eq', 200);
  }

  interceptExportActivityTables() {
    cy.intercept('GET', '/api/aofiRequest/getAllRegionalExportSchedules*').as(
      'getExportActivitiesToLoad'
    );
    cy.intercept('GET', '/api/aofiRequest/getAllUncollectedExportReceivables*').as(
      'getAllExportReceivables'
    );
    cy.intercept('GET', '/api/aofiRequest/getBusinessRelationshipHistory*').as(
      'getBusinessRelationship'
    );
  }

  waitExportActivityTablesToLoad() {
    cy.wait('@getExportActivitiesToLoad').its('response.statusCode').should('eq', 200);
    cy.wait('@getAllExportReceivables').its('response.statusCode').should('eq', 200);
    cy.wait('@getBusinessRelationship').its('response.statusCode').should('eq', 200);
  }

  interceptAllTransactions() {
    cy.intercept('GET', '/api/aofiRequest/getAllDomesticTransactions*').as(
      'getDomesticTransactions'
    );
    cy.intercept('GET', '/api/aofiRequest/getAllForeignTransactions*').as('getForeignTransactions');
  }

  waitAllTransactionsDataToLoad() {
    cy.wait('@getDomesticTransactions').its('response.statusCode').should('eq', 200);
    cy.wait('@getForeignTransactions').its('response.statusCode').should('eq', 200);
  }

  interceptAllCustomerData() {
    cy.intercept('GET', '/api/aofiRequest/getAllDomesticOrForeign*').as('getCutomersList');
    cy.intercept('GET', '/api/aofiRequest/getAllClaim*').as('getAllClaims');
  }

  waitAllCustomerDataToLoad() {
    cy.wait(1000);
    cy.wait('@getCutomersList').its('response.statusCode').should('eq', 200);
    cy.wait('@getAllClaims').its('response.statusCode').should('eq', 200);
  }

  interceptAllCompanyStatusChanges() {
    cy.intercept('GET', 'getAllCompanyStatusChange*').as('waitCompanyStatusToLoad');
  }

  waitCompanyStatusTableToLoad() {
    cy.wait('@waitCompanyStatusToLoad').its('response.statusCode').should('eq', 200);
  }

  interceptAllJobsFinanced() {
    cy.intercept('GET', '/api/aofiRequest/getAllJobFinanced*').as('waitJobsFinancedToLoad');
  }

  waitJobsFinancedTableToLoad() {
    cy.wait(1000);
    cy.wait('@waitJobsFinancedToLoad'); //.its('reponse.statusCode').should('eq', 200);
  }

  waitForAllDocumentationAttachmentsToLoad() {
    cy.intercept('GET', '/api/common/getAttachmentForObject*').as('getAllDocumentationAttachments');
    cy.wait('@getAllDocumentationAttachments'); ////.its('reponse.statusCode').should('eq', 200);
  }

  waitBasicDataToLoad() {
    cy.intercept('GET', '/api/aofiRequest/getBasicInformationCredit*').as('basicInfoCredit');
    cy.wait('@basicInfoCredit').its('response.statusCode').should('eq', 200);
  }

  interceptAllAOFIRequestsFromList() {
    cy.intercept('GET', '/api/aofiRequest/getAllAofiRequests*').as('getAllAofiRequests');
  }

  waitAllAOFIRequestsFromList() {
    cy.wait('@getAllAofiRequests').its('response.statusCode').should('eq', 200);
  }

  interceptAllRealEstateAssets() {
    cy.intercept('GET', '**/api/aofiRequest/getAllLandAssets?aofiRequestId=*').as('getLandAssets');
    cy.intercept('GET', '**/api/aofiRequest/getAllRealEstateAssets?aofiRequestId=*').as(
      'getRealEstateAssets'
    );
    cy.intercept('GET', '**/api/aofiRequest/getAllEquipmentAssets?aofiRequestId=*').as(
      'getEquipmentAssets'
    );
  }

  waitAllRealEstateAssetsToLoad() {
    cy.wait('@getLandAssets').its('response.statusCode').should('eq', 200);
    cy.wait('@getRealEstateAssets').its('response.statusCode').should('eq', 200);
    cy.wait('@getEquipmentAssets').its('response.statusCode').should('eq', 200);
  }

  interceptReferenceAndAttachmentList() {
    cy.intercept('GET', '/api/aofiRequest/getReferenceList?aofiRequestId=*').as(
      'waitReferenceList'
    );
    cy.intercept('GET', '/api/common/getAttachmentForObject?id=*').as('waitAttachmentList');
  }

  waitReferenceAndAttachmentListLoaded() {
    cy.wait('@waitReferenceList').its('response.statusCode').should('eq', 200);
    cy.wait('@waitAttachmentList').its('response.statusCode').should('eq', 200);
  }

  interceptSalesByMainProductList() {
    cy.intercept('GET', '/api/aofiRequest/getAllProductGroups?aofiRequestId=*').as('waitSalesList');
  }

  waitSalesByMainProductListToLoad() {
    cy.wait('@waitSalesList').its('response.statusCode').should('eq', 200);
  }

  interceptAllCompanyActivities() {
    cy.intercept('GET', '/api/aofiRequest/getAllCompanyActivities*').as(
      'waitCompanyActivitiesToLoad'
    );
  }

  waitAllCompanyActivitiesToLoad() {
    cy.wait('@waitCompanyActivitiesToLoad'); //.its('response.statusCode').should('eq', 200);
  }

  interceptAllObligations() {
    cy.intercept('GET', '/api/aofiRequest/getAllObligations*').as('getAllObligations');
  }

  waitAllObligations() {
    cy.wait('@getAllObligations').its('response.statusCode').should('eq', 200);
  }

  interceptAllLegalEntities() {
    cy.intercept('GET', '/api/aofiRequest/getAllLegalEntity*').as('getAllEntities');
  }

  waitAllLegalEntities() {
    cy.wait('@getAllEntities').its('response.statusCode').should('eq', 200);
  }

  interceptSubmitAofiRequest() {
    cy.intercept('POST', '/api/aofiRequest/submitAofiRequest').as('getSubmitRequest');
  }

  waitSubmitAofiRequest() {
    cy.wait('@getSubmitRequest').its('response.statusCode').should('eq', 200);
  }

  interceptAllDisputes() {
    cy.intercept('GET', '/api/aofiRequest/getAllDispute*').as('getAllDisputes');
  }

  waitAllDisputes() {
    cy.wait('@getAllDisputes').its('response.statusCode').should('eq', 200);
  }

  interceptAndWaitGeneralComments() {
    cy.intercept('GET', '/api/aofiRequest/getGeneralComment*').as('getGeneralComments');
    cy.wait('@getGeneralComments').its('response.statusCode').should('eq', 200);
  }

  interceptAllManagementStructure() {
    cy.intercept('GET', '/api/aofiRequest/getAllManagementStructure*').as(
      'getAllManagementStructure'
    );
  }

  waitForManagementStructureTableToLoad() {
    cy.wait('@getAllManagementStructure').its('response.statusCode').should('eq', 200);
  }

  interceptNewRealEstateSave() {
    cy.intercept('POST', '**/api/aofiRequest/saveRealEstateAsset').as('realEstateSaved');
  }

  waitNewRealEstateSave() {
    cy.wait(1500);
    cy.wait('@realEstateSaved').its('response.statusCode').should('eq', 200);
  }

  interceptExposureOverview() {
    cy.intercept('POST', '/AOFI/ExposureOverviewPage').as('getExposure');
  }

  waitExposureOverview() {
    cy.wait('@getExposure').its('response.statusCode').should('eq', 200);
  }

  interceptDebtState() {
    cy.intercept('POST', '/AOFI/DebtOverviewPage').as('getDebtState');
  }

  waitDebtState() {
    cy.wait('@getDebtState').its('response.statusCode').should('eq', 200);
  }

  interceptExposureOverviewData() {
    cy.intercept('POST', '/AOFI/ExposureDataPage').as('getExposureData');
  }

  waitExposureOverviewData() {
    cy.wait('@getExposureData').its('response.statusCode').should('eq', 200);
  }

  interceptCustomerArrangements() {
    cy.intercept('POST', '/AOFI/CustomerArrangmentsOverviewPage').as('getCustomerArrangements');
  }

  waitCustomerArrangements() {
    cy.wait('@getCustomerArrangements').its('response.statusCode').should('eq', 200);
  }

  interceptCustomerInfo() {
    cy.intercept('POST', '/AOFI/CustomerInfoOverviewPage').as('getCustomerInfo');
  }

  waitCustomerInfo() {
    cy.wait('@getCustomerInfo').its('response.statusCode').should('eq', 200);
  }

  interceptAndWaitTubeIQTasksPageToLoad() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
    cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
  }

  interceptTubeIQFileDownload() {
    cy.intercept('GET', '/common/GenerateAndDownloadFile*').as('tubeIQFileDownloaded');
  }

  waitForTubeIQFileDownload() {
    cy.wait('@tubeIQFileDownloaded').its('response.statusCode').should('eq', 200);
  }

  interceptCollateralData() {
    cy.intercept('POST', '/common/calculate').as('calculate');
    cy.intercept('GET', '/common/getBehaviorMetaDataById*').as('behaviorMeta');
    cy.intercept('GET', '/common/getObjectInstanceById*').as('objectInstance');
  }

  waitForCollateralData() {
    // cy.wait('@calculate');
    cy.wait('@behaviorMeta');
    cy.wait('@objectInstance');
  }

  interceptTubeIQTaskComments() {
    cy.intercept('POST', '/api/command/AddCommentToReference*').as('getTaskComments');
    cy.intercept('GET', '/api/getallcomment*').as('getAllComments');
  }

  waitForTubeIQTaskCommentsToLoad() {
    cy.wait('@getTaskComments'); // .its('response.statusCode').should('eq', 200);
    cy.wait('@getAllComments'); // .its('response.statusCode').should('eq', 200);
  }

  interceptTubeIQFileUpload() {
    cy.intercept('POST', '/common/uploadFile').as('tubeIQFileUpload');
  }

  waitForTubeIQFileUpload() {
    cy.wait('@tubeIQFileUpload').its('response.statusCode').should('eq', 200);
  }

  interceptTubeIQFileUploadDelete() {
    cy.intercept('POST', '/common/deleteFile').as('tubeIQFileDelete');
  }

  waitForTubeIQFileDelete() {
    cy.wait('@tubeIQFileDelete').its('response.statusCode').should('eq', 200);
  }

  interceptTubeIQSubmitSavePrintTaskInstance() {
    cy.intercept('POST', '/common/postBehavior').as('tubeIQSubmitSaveTask');
    cy.intercept('POST', '/common/calculate').as('calculate');
  }

  waitForTubeIQSubmitSavePrintTaskInstance() {
    cy.wait('@tubeIQSubmitSaveTask').its('response.statusCode').should('eq', 200);
    // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
  }

  interceptAndWaitAllInboxItemsTubeIQ() {
    cy.intercept('GET', '/common/getBehaviorType*').as('getBehaviorType');
    cy.intercept('GET', '/common/getBehaviorMetaDataById*').as('getMetaDataByID');
    cy.intercept('GET', '/common/getBehaviorActions*').as('getBehaviorActions');
    cy.intercept('GET', '/common/getObjectInstanceById*').as('getObjectInstanceById');
    cy.intercept('POST', '/common/calculate').as('calculate');
    cy.wait('@getBehaviorType');
    cy.wait('@getMetaDataByID');
    cy.wait('@getBehaviorActions');
    cy.wait('@getObjectInstanceById');
    cy.wait('@calculate');
  }

  interceptAndWaitFilteredInboxItemsTubeIQ() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
  }

  waitFilteredInboxItemsTubeIQ() {
    cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
  }

  interceptAllTubeIQAttachments() {
    cy.intercept('GET', '/content/ViewAttachedDocumentsPartial*').as('getDocumentPartials');
    cy.intercept('GET', '/api/query/GetAllAttachForObjectInstance*').as('getAllAttachments');
  }

  waitForAllTubeIQAttachments() {
    cy.wait('@getDocumentPartials').its('response.statusCode').should('eq', 200);
    cy.wait('@getAllAttachments').its('response.statusCode').should('eq', 200);
  }
}
export const onAPI = new API();
