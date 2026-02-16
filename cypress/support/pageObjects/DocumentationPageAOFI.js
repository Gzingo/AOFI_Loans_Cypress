import { onAPI } from './API';
import { Assert } from './assertions';

export class DocumentationPageAOFI {
  clickFinishButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-documents .padding-container.with-status-bar').within(() => {
      cy.clickFinishButton();
    });
    cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
    Assert.cardSuccessfullyCompletedToastVisible();
  }

  clickSubmitRequestButton() {
    onAPI.interceptSubmitAofiRequest();
    onAPI.interceptAllAOFIRequestsFromList();
    cy.get('app-documents .status-bar .submit-button').should('be.visible').click();
  }

  // Recursive function to delete all rows matching specific criteria across all attachment blocks
  deleteAllMatchingAttachments() {
    // Intercepts for backend actions
    cy.intercept('POST', '/api/common/deleteAttachment').as('deleteAttachment');
    cy.intercept('GET', '/api/common/getAttachmentForObject*').as('loadAttachmentList');
    // Recursively delete all files within a single block
    function deleteFilesInBlock($block) {
      // Query the container and inspect rows via jQuery
      return cy
        .wrap($block)
        .find('.file-list')
        .then(($list) => {
          const $rows = $list.find('.e-card-header');
          if ($rows.length === 0) {
            // If there are no files in the block: stop recursion
            cy.log('Block is empty – no files to delete');
            return;
          }
          // Click delete on the first file row
          cy.wrap($rows.first()).within(() => {
            cy.get('.action-buttons .delete-btn').click({ force: true });
          });
          // Close any error dialogs if present
          cy.get('ejs-dialog.modal-error .e-dlg-closeicon-btn', { timeout: 0 }).then(($btns) => {
            if ($btns.length) {
              cy.wrap($btns).click({ multiple: true, force: true });
              cy.log(`Closed ${$btns.length} error popups`);
            }
          });
          // Close other popups and wait for backend updates
          cy.closeAllPopups();
          cy.wait('@loadAttachmentList').its('response.statusCode').should('eq', 200);
          cy.wait('@deleteAttachment');
          // Recurse until the block is empty
          return deleteFilesInBlock($block);
        });
    }
    // Iterate through blocks one by one
    cy.get('app-manage-attachments-for-object').each(($block, index) => {
      cy.log(`Processing block ${index}`);
      // Ensure recursion is chained so Cypress waits
      deleteFilesInBlock($block).then(() => {
        // Safe end-of-block assertion: assert on the container, then validate there are 0 rows inside it
        cy.wrap($block)
          .find('.file-list')
          .should(($list) => {
            const count = $list.find('.e-card-header').length;
            expect(count, 'file rows remaining in block').to.eq(0);
          });
      });
    });
    cy.log('Successfully deleted all files from all attachment blocks');
  }

  attachRequestForApprovalOfPlacementDocument() {
    // open 1.st attachment block & click on "New document" button
    cy.attachDocumentByIndex(
      0,
      '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
      'Zahtev za odobravanje plasmana'
    );
    cy.attachDocumentByIndex(
      1,
      '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
      'Upitnik za izradu kreditnog dosijea'
    );
    cy.attachDocumentByIndex(
      2,
      '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
      'Kopija Ugovora o izvoznom poslu'
    );
    cy.attachDocumentByIndex(
      3,
      '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
      'Osnivački akt'
    );
    cy.attachDocumentByIndex(
      5,
      '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
      'Izvod iz registra privrednih subjekata'
    );
    cy.attachDocumentByIndex(6, '7. OP obrazac.pdf', 'OP Obrazac');
    cy.attachDocumentByIndex(
      7,
      '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
      'Karton deponovanih potpisa'
    );
    cy.attachDocumentByIndex(
      8,
      '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
      'Identifikacioni dokument ovlašćenog lica klijenta'
    );
    cy.attachDocumentByIndex(9, '10. Bilans stanja.pdf', 'Bilans stanja');
    cy.attachDocumentByIndex(10, '11. Bilans uspeha.pdf', 'Bilans uspeha');
    cy.attachDocumentByIndex(
      16,
      '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
      'Zaključni list 31.12.'
    );
    cy.attachDocumentByIndex(
      17,
      '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
      'Zaključni list iz tekuće godine'
    );
    cy.attachDocumentByIndex(
      19,
      '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
      'Potvrda nadležne poreske uprave o izmerenim poreskim obavezama'
    );
    cy.attachDocumentByIndex(
      20,
      '21. Analitičke kartice kupaca i dobavljača.pdf',
      'Analitičke kartice'
    );
    cy.attachDocumentByIndex(
      21,
      '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      'Saglasnost klijenta'
    );
  }
}
export const onDocumentationPage = new DocumentationPageAOFI();
