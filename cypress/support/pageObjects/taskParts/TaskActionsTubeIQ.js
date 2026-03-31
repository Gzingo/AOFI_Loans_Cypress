import { recordCurrentTimestamp } from '../../dateUtils';
import { onAPI } from '../API';

export class TaskActionsTubeIQ {
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
    cy.intercept('POST', '/common/calculate').as('calculate');
    cy.get('.sticky-navbar ul li a')
      .contains(/Instance|Instanca/)
      .click({ force: true });
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
