import { getTestData } from '../TestData';
import { verifyFilesInContainer } from '../../helpers';

export class TubeIQDocumentAssertions {
  fileAttachmentsVisible(fileNames) {
    const files = Array.isArray(fileNames) ? fileNames : [fileNames];
    files.forEach((name) => {
      cy.get('.filesAttachments').should('contain', name);
    });
  }

  tubeIQInstanceAttachmentVisible(fileNames) {
    const files = Array.isArray(fileNames) ? fileNames : [fileNames];
    files.forEach((name) => {
      cy.get('.e-upload-files .file-name').should('exist').and('contain', name);
      cy.log(`Attachment visible: ${name}`);
      console.log(`Attachment visible: ${name}`);
    });
  }

  verifyCreditRequestDocumentsAttached() {
    const expectedDocs = getTestData.creditRequestDocumentsAOFI();
    expectedDocs.forEach(({ index, fileName, note }) => {
      cy.get('app-documents .padding-container.with-status-bar app-manage-attachments-for-object')
        .eq(index)
        .within(() => {
          cy.get('.file-list .file-icon').should('exist');
          cy.get('.file-list .e-card-header-title')
            .invoke('text')
            .then((text) => {
              expect(text.trim()).to.include(fileName);
            });
          cy.get('.file-list .document-note span')
            .invoke('text')
            .then((noteText) => {
              expect(noteText.trim()).to.include(note);
            });
        });
    });
  }

  verifyPrintDocumentPopupOpen() {
    cy.get('generate-documents ejs-dialog').should('be.visible');
    cy.get('generate-documents ejs-dialog #dialog_dialog-content').shouldContainAnyText([
      'Kreditni',
      'Proces',
      'Krediti',
      'Predlog',
      'OsnovniUsloviNovo',
      '.docx',
    ]);
  }

  verifyCreditPropositionDownloaded() {
    cy.verifyFileNameAndExtension(['KreditniProcesKreditiPredlog', 'Kreditni predlog'], 'docx');
  }

  verifySignedContractDocumentDownloaded() {
    cy.verifyFileNameAndExtension(['UgovorOKreditu', 'Potpisan ugovor'], 'docx');
    // cy.verifyDocxContent(
    //   ['UgovorOKreditu.docx', 'Potpisan ugovor .docx'],
    //   getTestData.signedCreditContractDocumentData()
    // );
  }

  verifyDecisionIODocumentDownloaded() {
    cy.verifyFileNameAndExtension(['OdlukaIO', 'Odluka IO'], 'docx');
    // cy.verifyDocxContent(
    //   ['OdlukaIO.docx', 'Odluka IO .docx'],
    //   getTestData.decisionIODocumentData()
    // );
  }

  verifyCreditDecisionPropositionDownloaded() {
    cy.verifyFileNameAndExtension(['PredlogOdlukeNovo', 'Predlog odluke - kredit'], 'docx');
    cy.verifyDocxContent(
      ['PredlogOdlukeNovo.docx', 'Kreditni predlog .docx'],
      getTestData.creditCreditDecisionProposalDocumentData()
    );
  }

  verifyBasicConditionsDocumentDownloaded() {
    cy.verifyFileNameAndExtension(['OsnovniUsloviNovo', 'Osnovni uslovi'], 'docx');
    cy.verifyDocxContent(
      ['OsnovniUsloviNovo.docx', 'Osnovni uslovi .docx'],
      getTestData.basicConditionsDocumentData()
    );
  }

  verifyRiskOpinionDocumentReadyForUpload() {
    cy.verifyFileNameAndExtension(['Risk mišljenje'], 'docx');
  }

  verifyFinalRiskOpinionDocumentDownloaded() {
    cy.verifyFileNameAndExtension(['Risk mišljenje'], 'docx');
    cy.verifyDocxContent('Risk mišljenje.docx', getTestData.riskOpinionFinalDocumentTestData());
  }

  verifyApplicantExposurePopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Izloženost aplikanta', 'Applicant exposure']);
      });
  }

  verifyDebtStatePopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Stanje duga', 'Debt state']);
      });
  }

  verifyCustomerArrangementsPopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Pregled po partijama iz KDP', 'Customer arrangments']);
      });
  }

  verifyCustomerInfoPopupOpen() {
    cy.get('#ajax-modal')
      .should('be.visible')
      .within(() => {
        cy.get('.modal-header')
          .should('be.visible')
          .shouldContainAnyText(['Podaci o klijentu iz CIF-a', 'Customer info']);
      });
  }

  verifyAttachmentsInTubeIQ(expectedFileNames) {
    cy.scrollToBottom(1);
    cy.get('#document-container-Dokumentacija').within(() => {
      expectedFileNames.forEach((fileName) => {
        cy.get('.dz-filename span').then(($els) => {
          const texts = $els
            .toArray()
            .map((el) => el.innerText.trim().toLowerCase().replace(/\s+/g, ' '));
          const normalizedExpected = fileName.trim().toLowerCase().replace(/\s+/g, ' ');
          expect(texts).to.include(normalizedExpected);
        });
      });
    });
  }

  verifyCompleteDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompleteRequestForwardingDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompletePropositionDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
  }

  verifyCompleteRiskDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
  }

  verifyCompleteDecisionIODocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
  }

  verifyCompleteDecisionCreationDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
  }

  verifyCompleteContractCreationDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-ObavestenjeODostavljenojDokumentaciji',
      expectedAttachments.ObavestenjeODostavljenojDokumentaciji
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompleteContractSigningDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-DokumentSaglasnosti',
      expectedAttachments.DokumentSaglasnosti
    );
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-ObavestenjeODostavljenojDokumentaciji',
      expectedAttachments.ObavestenjeODostavljenojDokumentaciji
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompleteContractSigningDocumentationWithRealisationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-DokumentSaglasnosti',
      expectedAttachments.DokumentSaglasnosti
    );
    verifyFilesInContainer(
      '#document-container-PotpisanUgovor',
      expectedAttachments.PotpisanUgovor
    );
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer(
      '#document-container-OdlukaNakonSednicaNadleznogTela',
      expectedAttachments.OdlukaNakonSednicaNadleznogTela
    );
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-ObavestenjeODostavljenojDokumentaciji',
      expectedAttachments.ObavestenjeODostavljenojDokumentaciji
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
  }

  verifyCompletePreparationForContractRealizationDocumentationInTubeIQ(expectedAttachments) {
    cy.scrollToBottom(1);
    verifyFilesInContainer(
      '#document-container-KreditniPredlog',
      expectedAttachments.KreditniPredlog
    );
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
    verifyFilesInContainer('#document-container-Dokumentacija', expectedAttachments.Dokumentacija);
    verifyFilesInContainer('#document-container-PredlogOdluke', expectedAttachments.PredlogOdluke);
    verifyFilesInContainer('#document-container-RiskMisljenje', expectedAttachments.RiskMisljenje);
    verifyFilesInContainer('#document-container-OsnovniUslovi', expectedAttachments.OsnovniUslovi);
    verifyFilesInContainer(
      '#document-container-OdlukaSaSedniceIO',
      expectedAttachments.OdlukaSaSedniceIO
    );
  }
}
