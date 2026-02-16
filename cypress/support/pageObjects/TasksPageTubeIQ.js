import { recordCurrentTimestamp } from '../dateUtils';
import { onAPI } from './API';

export class TasksPageTubeIQ {
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

  sortByFilterViewAssignedToMe() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        cy.selectMenuItemByPartialText('to me');
      });
  }

  sortByFilterViewPending() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        cy.selectMenuItemByPartialText('pending');
      });
  }

  sortByFilterViewFinished() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        cy.selectMenuItemByPartialText('finished');
      });
  }

  sortByFilterViewMyAll() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        cy.selectMenuItemByPartialText('my all');
      });
  }

  sortByFilterViewCoWorkers() {
    cy.get('[id="inboxPanel"]')
      .should('be.visible')
      .within(() => {
        cy.selectMenuItemByPartialText('co-workers');
      });
  }

  selectLatestCreditRequestFromListAsDptHead() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Obrada zahteva - rukovodilac kreditnog sektora',
        'Rukovodilac sektora za kredite',
      ])
      .find('p')
      .shouldContainAnyText([
        'Obrada zahteva - rukovodilac kreditnog sektora',
        'Kreditni Process - QATesting',
      ])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectInitialProcessingRequestFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Inicijalna obrada zahteva - kreditni referent',
        'Nikola Nikolic',
        'Kreditni Process - QATesting',
      ])
      .find('h3')
      .filterTubeIQByText('Nikola Nikolic')
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
    cy.wait(3000);
  }

  selectCollateralEntryFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Unos kolaterala, dodatnih elemenata i kreiranje kreditnog predloga',
        'Kreditni Process - QATesting',
      ])
      .find('h3')
      .filterTubeIQByText(['Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectProposalDraftFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Priprema za izradu predloga odluke'])
      .find('h3')
      .filterTubeIQByText(['Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectDecisionProposalFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Predlog odluke - kreditni referent', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectPreparationForContractRealizationFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Priprema za realizaciju ugovora', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectContractSigningFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Potpisivanje ugovora', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectContractRealisationFromListAsFinanceOfficer() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Realizacija ugovora', 'Saradnik u sektoru finansija'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectDecisionProposalVerificationFromListAsDptHead() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Verifikacija predloga kreditne odluke',
        'Rukovodilac sektora za kredite',
        'Nikola Nikolic',
      ])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectPrintingTheDecisionProposalFromListAsCreditAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Štampa predloga kreditne odluke - kreditni referent', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectForwardingTheRequestFromListAsRiskDptHead() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Prosleđivanje zahteva savetniku za rizike',
        'Direktor direkcije za upravljanje rizicima',
      ])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectRiskOpinionForVerificationFromListAsRiskDptHead() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Verifikacija', 'Direktor direkcije za upravljanje rizicima'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectRiskOpinionFromListAsSelectedRiskAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText('Nikola Nikolic')
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectRiskOpinionFinalizationFromListAsAnyRiskAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Finalizacija mišljenja rizika',
        'Savetnik organizacionog dela za rizike',
      ])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectRiskOpinionFinalizationFromListAsSelectedRiskAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Finalizacija mišljenja rizika', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectRiskOpinionCompletionFromListAsSelectedRiskAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Kompletiranje predloga sa risk mišljenjem', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectDecisionIOFromListAsSelectedLegalServiceOfficer() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Odluka IO', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectDecisionCreationFromListAsSelectedLegalServiceOfficer() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Kreiranje odluke', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectContractCreationFromListAsSelectedLegalServiceOfficer() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText(['Kreiranje ugovora - pravna služba', 'Nikola Nikolic'])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectRiskOpinionFromListAsAnyRiskAdvisor() {
    cy.get('#messageItems li.taskitem')
      .should('exist')
      .filterTubeIQByText([
        'Obrada zahteva - Risk mišljenje',
        'Savetnik organizacionog dela za rizike',
      ])
      .first()
      .click({ force: true });
    recordCurrentTimestamp();
  }

  selectCreditRequestByIndexFromList(index) {
    cy.get('#messageItems li.taskitem').eq(index).click({ force: true });
    recordCurrentTimestamp();
  }

  clickAssignToMeButton() {
    cy.scrollToBottom(1);
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Assign to me', 'Dodeli meni'])
      .then(($btns) => {
        if ($btns.length > 0) {
          // check that the button exists
          cy.wrap($btns.first()).should('exist').and('be.enabled').click({ force: true });
          recordCurrentTimestamp();
        } else {
          // if there's no button → skip
          cy.log('Assign to me button not found, skipping...');
        }
      });
  }

  clickAssignToMe() {
    cy.get('tubeiq-behavior-actions button')
      .filterTubeIQByText(['Assign to me', 'Dodeli meni'])
      .then(($btns) => {
        if ($btns.length > 0) {
          // check that the button exists
          cy.wrap($btns.first()).should('exist').and('be.enabled').click({ force: true });
          recordCurrentTimestamp();
        } else {
          // if there's no button → skip
          cy.log('Assign to me button not found, skipping...');
        }
      });
  }

  navigateToInstanceTab() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
    cy.intercept('POST', '/common/calculate').as('calculate');
    cy.get('.sticky-navbar ul li a')
      .contains(/Instance|Instanca/)
      .click({ force: true });
    cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
    cy.wait('@calculate');
  }

  goToInstanceTab() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
    cy.get('.sticky-navbar ul li a')
      .contains(/Instance|Instanca/)
      .click({ force: true });
    cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
  }

  navigateToAttachmentsTab() {
    onAPI.interceptAllTubeIQAttachments();
    cy.get('.sticky-navbar ul li a')
      .contains(/Attachments|Prikačeni dokumenti/)
      .click({ force: true });
    onAPI.waitForAllTubeIQAttachments();
  }

  navigateToPrintDocumentsTab() {
    cy.get('.sticky-navbar ul li a')
      .contains(/Print documents|Dokumenta za štampu/)
      .click({ force: true });
  }

  navigateToCommentsTab() {
    cy.get('.sticky-navbar ul li a')
      .contains(/Comments|Komentari/)
      .click({ force: true });
  }
}
export const onTubeIQTasksPage = new TasksPageTubeIQ();
