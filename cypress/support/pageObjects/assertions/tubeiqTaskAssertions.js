export class TubeIQTaskAssertions {
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

  checkTubeIQTasksListSearchContractCreationBySelectedLegalServiceOfficer() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Kreiranje ugovora - pravna služba',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
    cy.iterateTaskItems(requiredTexts);
  }

  checkTubeIQTasksListSearchContractSigningBySelectedCreditAdvisor() {
    cy.get('#items-wrapper').should('exist');
    const requiredTexts = [
      'Potpisivanje ugovora',
      'Nikola Nikolic',
      'Kreditni Process - QATesting',
    ];
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
    const requiredTexts = ['Realizacija', 'Kreditni Process - QATesting'];
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

  verifyTubeIQTaskSuccessfullyAssignedToCreditDptHead() {
    cy.get('.behavior-task-info')
      .eq(0)
      .shouldContainAnyText(['Rukovodilac sektora za kredite', 'Руководилац сектора за кредите']);
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
