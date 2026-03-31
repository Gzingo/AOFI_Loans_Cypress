import { Assert } from './assertions';

/**
 * Helper: creates an intercept/wait pair for one or more endpoints.
 *
 * @param {Array<{method: string, url: string, alias: string}>} endpoints
 * @param {Object} [options]
 * @param {number} [options.preDelay=0] - ms to wait before cy.wait
 * @param {boolean} [options.assertStatus=true] - assert 200 on wait
 * @returns {{ intercept: Function, wait: Function }}
 *
 * Usage (single endpoint):
 *   const stakeholders = apiWait([{ method: 'GET', url: '/api/aofiRequest/getAllStakeholders*', alias: 'getStakeholder' }]);
 *   stakeholders.intercept();
 *   // ...do something...
 *   stakeholders.wait();
 *
 * Usage (multi endpoint):
 *   const exports = apiWait([
 *     { method: 'GET', url: '/api/aofiRequest/getAllRegionalExportSchedules*', alias: 'getExports' },
 *     { method: 'GET', url: '/api/aofiRequest/getAllUncollectedExportReceivables*', alias: 'getReceivables' },
 *   ]);
 *   exports.intercept();
 *   exports.wait();
 */
function apiWait(endpoints, options = {}) {
  const { preDelay = 0, assertStatus = true } = options;
  return {
    intercept() {
      for (const ep of endpoints) {
        cy.intercept(ep.method, ep.url).as(ep.alias);
      }
    },
    wait() {
      if (preDelay > 0) cy.wait(preDelay);
      for (const ep of endpoints) {
        if (assertStatus) {
          cy.wait(`@${ep.alias}`).its('response.statusCode').should('eq', 200);
        } else {
          cy.wait(`@${ep.alias}`);
        }
      }
    },
  };
}

// Pre-built intercept/wait pairs
const apiPairs = {
  stakeholders: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getAllStakeholders*', alias: 'getStakeholder' },
  ]),
  supplierList: apiWait(
    [
      {
        method: 'GET',
        url: '/api/aofiRequest/getAllDomesticOrForeign*',
        alias: 'waitSupplierListToLoad',
      },
    ],
    { preDelay: 1500 }
  ),
  customerTable: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getAllTermsOfSale*', alias: 'waitCutomersListToLoad' },
  ]),
  exportActivityTables: apiWait([
    {
      method: 'GET',
      url: '/api/aofiRequest/getAllRegionalExportSchedules*',
      alias: 'getExportActivitiesToLoad',
    },
    {
      method: 'GET',
      url: '/api/aofiRequest/getAllUncollectedExportReceivables*',
      alias: 'getAllExportReceivables',
    },
    {
      method: 'GET',
      url: '/api/aofiRequest/getBusinessRelationshipHistory*',
      alias: 'getBusinessRelationship',
    },
  ]),
  allTransactions: apiWait([
    {
      method: 'GET',
      url: '/api/aofiRequest/getAllDomesticTransactions*',
      alias: 'getDomesticTransactions',
    },
    {
      method: 'GET',
      url: '/api/aofiRequest/getAllForeignTransactions*',
      alias: 'getForeignTransactions',
    },
  ]),
  allCustomerData: apiWait(
    [
      { method: 'GET', url: '/api/aofiRequest/getAllDomesticOrForeign*', alias: 'getCutomersList' },
      { method: 'GET', url: '/api/aofiRequest/getAllClaim*', alias: 'getAllClaims' },
    ],
    { preDelay: 1000 }
  ),
  companyStatusChanges: apiWait([
    { method: 'GET', url: 'getAllCompanyStatusChange*', alias: 'waitCompanyStatusToLoad' },
  ]),
  jobsFinanced: apiWait(
    [
      {
        method: 'GET',
        url: '/api/aofiRequest/getAllJobFinanced*',
        alias: 'waitJobsFinancedToLoad',
      },
    ],
    { assertStatus: false, preDelay: 1000 }
  ),
  basicData: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getBasicInformationCredit*', alias: 'basicInfoCredit' },
  ]),
  allAOFIRequests: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getAllAofiRequests*', alias: 'getAllAofiRequests' },
  ]),
  realEstateAssets: apiWait([
    {
      method: 'GET',
      url: '**/api/aofiRequest/getAllLandAssets?aofiRequestId=*',
      alias: 'getLandAssets',
    },
    {
      method: 'GET',
      url: '**/api/aofiRequest/getAllRealEstateAssets?aofiRequestId=*',
      alias: 'getRealEstateAssets',
    },
    {
      method: 'GET',
      url: '**/api/aofiRequest/getAllEquipmentAssets?aofiRequestId=*',
      alias: 'getEquipmentAssets',
    },
  ]),
  referenceAndAttachmentList: apiWait([
    {
      method: 'GET',
      url: '/api/aofiRequest/getReferenceList?aofiRequestId=*',
      alias: 'waitReferenceList',
    },
    { method: 'GET', url: '/api/common/getAttachmentForObject?id=*', alias: 'waitAttachmentList' },
  ]),
  salesByMainProduct: apiWait([
    {
      method: 'GET',
      url: '/api/aofiRequest/getAllProductGroups?aofiRequestId=*',
      alias: 'waitSalesList',
    },
  ]),
  companyActivities: apiWait(
    [
      {
        method: 'GET',
        url: '/api/aofiRequest/getAllCompanyActivities*',
        alias: 'waitCompanyActivitiesToLoad',
      },
    ],
    { assertStatus: false }
  ),
  allObligations: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getAllObligations*', alias: 'getAllObligations' },
  ]),
  allLegalEntities: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getAllLegalEntity*', alias: 'getAllEntities' },
  ]),
  submitAofiRequest: apiWait([
    { method: 'POST', url: '/api/aofiRequest/submitAofiRequest', alias: 'getSubmitRequest' },
  ]),
  allDisputes: apiWait([
    { method: 'GET', url: '/api/aofiRequest/getAllDispute*', alias: 'getAllDisputes' },
  ]),
  managementStructure: apiWait([
    {
      method: 'GET',
      url: '/api/aofiRequest/getAllManagementStructure*',
      alias: 'getAllManagementStructure',
    },
  ]),
  newRealEstateSave: apiWait(
    [{ method: 'POST', url: '**/api/aofiRequest/saveRealEstateAsset', alias: 'realEstateSaved' }],
    { preDelay: 1500 }
  ),
  exposureOverview: apiWait([
    { method: 'POST', url: '/AOFI/ExposureOverviewPage', alias: 'getExposure' },
  ]),
  debtState: apiWait([{ method: 'POST', url: '/AOFI/DebtOverviewPage', alias: 'getDebtState' }]),
  exposureOverviewData: apiWait([
    { method: 'POST', url: '/AOFI/ExposureDataPage', alias: 'getExposureData' },
  ]),
  customerArrangements: apiWait([
    {
      method: 'POST',
      url: '/AOFI/CustomerArrangmentsOverviewPage',
      alias: 'getCustomerArrangements',
    },
  ]),
  customerInfo: apiWait([
    { method: 'POST', url: '/AOFI/CustomerInfoOverviewPage', alias: 'getCustomerInfo' },
  ]),
  tubeIQFileDownload: apiWait([
    { method: 'GET', url: '/common/GenerateAndDownloadFile*', alias: 'tubeIQFileDownloaded' },
  ]),
  tubeIQFileUpload: apiWait([
    { method: 'POST', url: '/common/uploadFile', alias: 'tubeIQFileUpload' },
  ]),
  tubeIQFileDelete: apiWait([
    { method: 'POST', url: '/common/deleteFile', alias: 'tubeIQFileDelete' },
  ]),
};

export class API {
  // ─── Special methods (not simple intercept/wait pairs) ─────────────────────

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
      const parts = token.split('.');
      expect(parts.length, 'Token should have 3 parts').to.eq(3);
      const payload = JSON.parse(atob(parts[1]));
      expect(payload).to.include.all.keys('sub', 'exp', 'iss');
      cy.log('Decoded JWT payload:', payload);
      expect(payload.sub, 'sub in token should match userName').to.eq(userName);
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

  // ─── Special: combined intercept+wait in one call ──────────────────────────

  waitForAllDocumentationAttachmentsToLoad() {
    cy.intercept('GET', '/api/common/getAttachmentForObject*').as('getAllDocumentationAttachments');
    cy.wait('@getAllDocumentationAttachments');
  }

  interceptAndWaitGeneralComments() {
    cy.intercept('GET', '/api/aofiRequest/getGeneralComment*').as('getGeneralComments');
    cy.wait('@getGeneralComments').its('response.statusCode').should('eq', 200);
  }

  interceptAndWaitTubeIQTasksPageToLoad() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
    cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
  }

  interceptCollateralData() {
    cy.intercept('POST', '/common/calculate').as('calculate');
    cy.intercept('GET', '/common/getObjectInstanceById*').as('objectInstance');
  }

  waitForCollateralData() {
    cy.wait('@calculate');
    cy.wait('@objectInstance');
  }

  interceptTubeIQTaskComments() {
    cy.intercept('POST', '/api/command/AddCommentToReference*').as('getTaskComments');
    cy.intercept('GET', '/api/getallcomment*').as('getAllComments');
  }

  waitForTubeIQTaskCommentsToLoad() {
    cy.wait('@getTaskComments');
    cy.wait('@getAllComments');
  }

  interceptTubeIQSubmitSavePrintTaskInstance() {
    cy.intercept('POST', '/common/postBehavior').as('tubeIQSubmitSaveTask');
    cy.intercept('POST', '/common/calculate').as('calculate');
  }

  waitForTubeIQSubmitSavePrintTaskInstance() {
    cy.wait('@tubeIQSubmitSaveTask').its('response.statusCode').should('eq', 200);
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

  // ─── Delegated to apiPairs (backward-compatible method names) ──────────────

  interceptAllStakeholders() {
    apiPairs.stakeholders.intercept();
  }
  waitForStakeholdersTableToLoad() {
    apiPairs.stakeholders.wait();
  }

  interceptSuppliersList() {
    apiPairs.supplierList.intercept();
  }
  waitSupplierListToLoad() {
    apiPairs.supplierList.wait();
  }

  interceptCustomerTable() {
    apiPairs.customerTable.intercept();
  }
  waitCustomerTableToLoad() {
    apiPairs.customerTable.wait();
  }

  interceptExportActivityTables() {
    apiPairs.exportActivityTables.intercept();
  }
  waitExportActivityTablesToLoad() {
    apiPairs.exportActivityTables.wait();
  }

  interceptAllTransactions() {
    apiPairs.allTransactions.intercept();
  }
  waitAllTransactionsDataToLoad() {
    apiPairs.allTransactions.wait();
  }

  interceptAllCustomerData() {
    apiPairs.allCustomerData.intercept();
  }
  waitAllCustomerDataToLoad() {
    apiPairs.allCustomerData.wait();
  }

  interceptAllCompanyStatusChanges() {
    apiPairs.companyStatusChanges.intercept();
  }
  waitCompanyStatusTableToLoad() {
    apiPairs.companyStatusChanges.wait();
  }

  interceptAllJobsFinanced() {
    apiPairs.jobsFinanced.intercept();
  }
  waitJobsFinancedTableToLoad() {
    apiPairs.jobsFinanced.wait();
  }

  waitBasicDataToLoad() {
    apiPairs.basicData.intercept();
    apiPairs.basicData.wait();
  }

  interceptAllAOFIRequestsFromList() {
    apiPairs.allAOFIRequests.intercept();
  }
  waitAllAOFIRequestsFromList() {
    apiPairs.allAOFIRequests.wait();
  }

  interceptAllRealEstateAssets() {
    apiPairs.realEstateAssets.intercept();
  }
  waitAllRealEstateAssetsToLoad() {
    apiPairs.realEstateAssets.wait();
  }

  interceptReferenceAndAttachmentList() {
    apiPairs.referenceAndAttachmentList.intercept();
  }
  waitReferenceAndAttachmentListLoaded() {
    apiPairs.referenceAndAttachmentList.wait();
  }

  interceptSalesByMainProductList() {
    apiPairs.salesByMainProduct.intercept();
  }
  waitSalesByMainProductListToLoad() {
    apiPairs.salesByMainProduct.wait();
  }

  interceptAllCompanyActivities() {
    apiPairs.companyActivities.intercept();
  }
  waitAllCompanyActivitiesToLoad() {
    apiPairs.companyActivities.wait();
  }

  interceptAllObligations() {
    apiPairs.allObligations.intercept();
  }
  waitAllObligations() {
    apiPairs.allObligations.wait();
  }

  interceptAllLegalEntities() {
    apiPairs.allLegalEntities.intercept();
  }
  waitAllLegalEntities() {
    apiPairs.allLegalEntities.wait();
  }

  interceptSubmitAofiRequest() {
    apiPairs.submitAofiRequest.intercept();
  }
  waitSubmitAofiRequest() {
    apiPairs.submitAofiRequest.wait();
  }

  interceptAllDisputes() {
    apiPairs.allDisputes.intercept();
  }
  waitAllDisputes() {
    apiPairs.allDisputes.wait();
  }

  interceptAllManagementStructure() {
    apiPairs.managementStructure.intercept();
  }
  waitForManagementStructureTableToLoad() {
    apiPairs.managementStructure.wait();
  }

  interceptNewRealEstateSave() {
    apiPairs.newRealEstateSave.intercept();
  }
  waitNewRealEstateSave() {
    apiPairs.newRealEstateSave.wait();
  }

  interceptExposureOverview() {
    apiPairs.exposureOverview.intercept();
  }
  waitExposureOverview() {
    apiPairs.exposureOverview.wait();
  }

  interceptDebtState() {
    apiPairs.debtState.intercept();
  }
  waitDebtState() {
    apiPairs.debtState.wait();
  }

  interceptExposureOverviewData() {
    apiPairs.exposureOverviewData.intercept();
  }
  waitExposureOverviewData() {
    apiPairs.exposureOverviewData.wait();
  }

  interceptCustomerArrangements() {
    apiPairs.customerArrangements.intercept();
  }
  waitCustomerArrangements() {
    apiPairs.customerArrangements.wait();
  }

  interceptCustomerInfo() {
    apiPairs.customerInfo.intercept();
  }
  waitCustomerInfo() {
    apiPairs.customerInfo.wait();
  }

  interceptTubeIQFileDownload() {
    apiPairs.tubeIQFileDownload.intercept();
  }
  waitForTubeIQFileDownload() {
    apiPairs.tubeIQFileDownload.wait();
  }

  interceptTubeIQFileUpload() {
    apiPairs.tubeIQFileUpload.intercept();
  }
  waitForTubeIQFileUpload() {
    apiPairs.tubeIQFileUpload.wait();
  }

  interceptTubeIQFileUploadDelete() {
    apiPairs.tubeIQFileDelete.intercept();
  }
  waitForTubeIQFileDelete() {
    apiPairs.tubeIQFileDelete.wait();
  }
}
export const onAPI = new API();
