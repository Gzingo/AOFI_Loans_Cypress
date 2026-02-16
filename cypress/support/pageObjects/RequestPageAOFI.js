import { onAPI } from './API';

export class RequestPageAOFI {
  clickAddNewCreditButton() {
    cy.get('app-aofi-request-list .top-block')
      .find('button')
      .filterByText(['Креирај захтев за кредит', 'Kreiraj zahtev za kredit', 'Add new credit'])
      .should('be.visible')
      .click({ force: true });
  }

  // Verify that the toast message is visible and the confirmation button is clickable
  confirmNewLoanRequestCreation() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('.e-footer-content button').eq(1).should('be.visible').click({ force: true });
    });
  }

  // Search for created loan request by request ID, status and type
  searchCreatedLoanRequest(requestId) {
    onAPI.interceptAllAOFIRequestsFromList();
    cy.get('.top-block')
      .find('button')
      .filterByText(['Pretraga', 'Search', 'Претрага'])
      .should('be.visible')
      .click({ force: true });
    cy.get('ejs-dropdownlist[id="ddlelement"]').click();
    cy.get('[id="ddlelement_popup"]').within(() => {
      cy.get('li')
        .filterByText(['Kredit', 'Credit', 'Кредит'])
        .should('be.visible')
        .click({ force: true });
    });
    cy.get('ejs-dropdownlist[id="ddlelement"]').filterByText(['kredit', 'Credit', 'Кредит']);
    cy.get('text-box[formcontrolname="aofiRequestNumber"]').within(() => {
      cy.get('input').clear().type(requestId);
    });
    cy.get('ejs-multiselect[id="aofiRequestStatuses"]').find('.e-multiselect').realClick();
    cy.get('ul[id="aofiRequestStatuses_options"]')
      .should('be.visible')
      .within(() => {
        cy.get('.e-list-item')
          .filterByText(['U pripremi', 'Ready', 'У припреми'])
          .should('be.visible')
          .click({ force: true });
      });
    cy.get('.filterButtonConteinerInside').find('button[id="search"]').click({ force: true });
    onAPI.waitAllAOFIRequestsFromList();
  }

  clickEditLoanRequestButton() {
    cy.get('.e-gridcontent')
      .find('td:last-child')
      .within(() => {
        cy.get('.action-buttons button').eq(0).click();
      });
    onAPI.waitBasicDataToLoad();
  }

  clickFinishAnGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-aofi-request-details-credit').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
  }
}
export const onRequestPageAOFI = new RequestPageAOFI();
