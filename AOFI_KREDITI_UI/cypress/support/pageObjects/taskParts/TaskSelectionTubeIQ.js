import { recordCurrentTimestamp } from '../../dateUtils';

export class TaskSelectionTubeIQ {
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
      .filterTubeIQByText(['Realizacija ugovora', 'QATest'])
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
}
