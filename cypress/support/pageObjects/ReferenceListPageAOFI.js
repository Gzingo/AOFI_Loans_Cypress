import { Assert } from './assertions';
import { getTestData } from './TestData';

export class ReferenceListPageAOFI {
  attachNewDocument() {
    const fileName = getTestData.referenceListUploadDocumentNameAOFI();
    cy.get('app-manage-attachments-for-object .top-block').find('button').click();
    Assert.attachNewDocumentPopupVisible();
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="note"]').type('Automated Test Reference List');
      // upload files for attachment
      cy.uploadFileAOFI(fileName);
      //assert attachment added
      Assert.fileAttachmentsVisible(fileName);
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  fillInReferenceData() {
    cy.get('app-reference-list')
      .find('form .top-block')
      .eq(0)
      .within(() => {
        cy.get('button')
          .filterByText([
            'Edit reference list',
            'Izmeni referentnu listu',
            'Измени референтну листу',
          ])
          .click();
      });
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('textarea[role="textbox"]')
        .clear()
        .type(
          'This is the Test Reference list:\n\n    1# Test Reference 1\n    2# Test Reference 2\n    3# Test Reference 3'
        );
      cy.clickPopupSaveButton();
    });
    Assert.dataSuccessfullySavedToastVisible();
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingAttachment() {
    const name = getTestData.referenceListAttachmentNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/common/deleteAttachment').as('deleteAttachment');
    cy.intercept('GET', '/api/common/getAttachmentForObject*').as('loadAttachmentList');
    function deleteFirstRow() {
      cy.get('app-manage-attachments-for-object .file-list', { timeout: 2000 }).then(($list) => {
        const $rows = $list.find('.e-card .e-card-header');
        if (!$rows.length) {
          // check placeholder for text
          const placeholderText = $list.text().trim();
          if (emptyPlaceholders.some((msg) => placeholderText.includes(msg))) {
            cy.log('Grid is empty – only placeholder row remains');
          } else {
            cy.log('Grid is empty – no entries available');
          }
          return;
        }
        const firstRowText = $rows.first().text().trim();
        if (!firstRowText.includes(name)) {
          cy.log(`No more rows with "${name}" found – deletion complete`);
          return;
        }
        // delete the row
        cy.wrap($rows.first()).within(() => {
          cy.get('.action-buttons button').click({ force: true });
        });
        // handle error popups
        cy.get('ejs-dialog.modal-error .e-dlg-closeicon-btn', { timeout: 0 }).then(($btns) => {
          if ($btns.length) {
            cy.wrap($btns).click({ multiple: true, force: true });
            cy.log(`Closed ${$btns.length} error popups`);
          }
        });
        cy.closeAllPopups();
        cy.wait('@loadAttachmentList').its('response.statusCode').should('eq', 200);
        cy.wait('@deleteAttachment');
        // recurse
        deleteFirstRow();
      });
    }
    deleteFirstRow();
    cy.contains('app-manage-attachments-for-object .file-list .e-card .e-card-header', name, {
      timeout: 2000,
    }).should('not.exist');
    cy.log(
      `Successfully deleted all entries "${name}" from the Company management structure table`
    );
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-reference-list').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus').its('response.statusCode').should('eq', 200);
  }
}
export const onReferenceListPage = new ReferenceListPageAOFI();
