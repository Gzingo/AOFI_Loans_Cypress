import { onAPI } from '../API';

export class AOFIDataAssertions {
  searchedCreditRequestVisible(requestId) {
    cy.wait(1000); // Wait for the search results to update
    cy.get('[id="table-id"]').should('contain', requestId);
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

  checkReferenceListDocumentAttached() {
    cy.get('app-manage-attachments-for-object').within(() => {
      cy.get('.file-list [class="e-card-details file-details"]').should('not.be.empty');
    });
  }

  verifyCreditRequestSentForFurtherProcessing() {
    const dateUtils = require('../../dateUtils');
    cy.get('#tasks-view-container').within(() => {
      dateUtils.assertTimestampNotInTubeIQTaskList(
        '.behavior-task-info',
        dateUtils.getRecordedTimestamp()
      );
    });
  }
}
