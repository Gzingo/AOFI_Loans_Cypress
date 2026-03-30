import { onAPI } from '../API';

export class TaskSearchTubeIQ {
  setSearchForCreditCreditDptHead() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Obrada zahteva - rukovodilac kreditnog sektora', { force: true });
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 25, force: true });
        // cy.get('.input-group-btn button[type="submit"]').click({ force: true });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForCreditCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Inicijalna obrada zahteva - kreditni referent', { force: true });
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parameters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 25, force: true });
        cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForCollateralEntryCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Unos kolaterala', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 25, force: true });
        cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    // onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForProposalDraftEntryCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Kreditni Proces', { force: true });
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('Priprema', { delay: 20, force: true });
        cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForDecisionProposalEntryCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Predlog odluke', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForDecisionProposalVerificationCreditDptHead() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Verifikacija predloga kreditne odluke', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForPrintingTheDecisionProposalCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Štampa predloga kreditne odluke', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForForwardingTheRequestByRiskDptHead() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Prosleđivanje zahteva savetniku za rizike', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForRiskOpinionVerificationByRiskDptHead() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Verifikacija', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForRiskOpinionByRiskAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Obrada zahteva - Risk mišljenje', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForRiskOpinionFinalizationByRiskDptHead() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Finalizacija mišljenja rizika', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForDecisionIOByLegalServiceOfficer() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search').clear({ force: true }).type('Odluka IO', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForDecisionCreationByLegalServiceOfficer() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Kreiranje odluke', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForContractCreationByLegalServiceOfficer() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Kreiranje ugovora - pravna služba', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForPreparationOfContractRealizationByCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Priprema za realizaciju ugovora', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForContractSigningByCreditAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Potpisivanje ugovora', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForRiskOpinionCompletionByRiskAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Kompletiranje predloga sa risk mišljenjem', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForRiskOpinionFinalizationByRiskAdvisor() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Finalizacija mišljenja rizika', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }

  setSearchForCreditRealisationByFinanceServiceOfficer() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        // refine search
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        cy.get('.file-manager').within(() => {
          cy.get('div[id="accordion"]').toggleAccordion(['Process', 'Proces']);
        });
        // set status to 'Ready' only, than close Refine menu (uncheck status 'Active')
        cy.get('[id="collapseStatus"] ul li')
          .filterTubeIQByText(['Active', 'Aktivan'])
          .find('input[type="checkbox"]')
          .click({ force: true });
        cy.get('button').filterTubeIQByText(['Refine', 'Preraditi']).click({ force: true });
        // set the search bar text input
        cy.get('input#list-input-search')
          .clear({ force: true })
          .type('Realizacija', { force: true });
        //////
        // sort by latest date
        cy.get('#btnSortMenu').click({ force: true });
        cy.get('#sortMenu li a')
          .filterTubeIQByText(['Datum izmene - Najnoviji', 'Modified Date - Newest'])
          .click({ force: true });
        // Execute search by parmeters
        cy.get('.input-group-btn button[type="submit"]').click({ force: true });
        // click show filter and set filter text
        cy.get('button#btnListMenu').click({ force: true });
        cy.get('ul#listMenu').within(() => {
          cy.get('li a')
            .last()
            .shouldContainAnyText(['Show filter', 'Prikaži filter'])
            .click({ force: true });
        });
        // apply filter to get valid results
        cy.get('input#filterTxt')
          .clear({ force: true })
          .type('QATesting', { delay: 20, force: true });
        // cy.get('.filter-input-box button[type="submit"]').should('exist').click({ force: true });
        // cy.get('.filter-input-box').within(() => {
        //   cy.get('button[type="submit"]').should('exist');
        // });
      });
    onAPI.interceptAndWaitFilteredInboxItemsTubeIQ();
  }
}
