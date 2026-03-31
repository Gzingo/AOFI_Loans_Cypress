import { Assert } from '../pageObjects/assertions';

/* Custom command to upload file in AOFI portal from presetted file path by file name and type
 * Usage: cy.uploadFileAOFI('document.pdf');
 */
Cypress.Commands.add('uploadFileAOFI', (fileName) => {
  const filePath = `cypress/fixtures/${fileName}`;
  cy.get('#file')
    .invoke('show') // removes display:none
    .selectFile(filePath);
});

/* Custom command to upload a file from fixtures folder to TubeIQ Instance attachment uploader, selecting uploader by index
 * Usage: cy.uploadFileTubeIQ('document.docx', 0);
 */
Cypress.Commands.add('uploadFileTubeIQ', (fileName, index = 0) => {
  const filePath = `cypress/fixtures/${fileName}`;
  cy.get('[id^="uploader_"]')
    .eq(index)
    .should('exist')
    .invoke('show') // remove display:none
    .selectFile(filePath, { force: true });
  // post-condition: check that the file appeared in the list
  cy.get('.e-upload-files .file-name').contains(fileName).should('exist');
  cy.log(`Uploaded file: ${fileName} into uploader #${index}`);
});

/* Custom command to upload files from downloads folder to TubeIQ Instance attachment uploader, selecting uploader by index
 * Usage: cy.uploadDocumentFileTubeIQ('document.docx', 0)
 * cy.uploadD
 */
Cypress.Commands.add('uploadDocumentFileTubeIQ', (fileName, index = 0, options = {}) => {
  const filePath = `cypress/downloads/${fileName}`;
  const timeout = options.timeout || 10000;
  // Check if the file exists in file path
  cy.readFile(filePath).should('exist');
  // Select real <input type="file">
  cy.get('input[type="file"][id^="uploader_"]', { timeout })
    .eq(index)
    .should('exist')
    .selectFile(filePath, { force: true, action: 'select' });
  // Wait for upload to finish
  cy.get('.e-upload-files', { timeout }).should('exist');
  cy.get('.e-upload-files .file-name', { timeout })
    .contains(fileName)
    .should('exist')
    .then(() => {
      cy.log(`✓ File uploaded successfully: ${fileName}`);
    });
});

/* Custom command to verify file extensions
 * checks if the file exists in cypress/downloads, if the name matches one of the allowed names (with or without extension),
 * if it ends with the expected extension, and logs what was actually found:
 * Usage:
 * - Only file name, path is set to: cypress/downloads/
 * 1. cy.verifyFileNameAndExtension('KreditniProcesKreditiPredlog.docx', '.docx');
 * 2. cy.verifyFileNameAndExtension(
 * ['KreditniProcesKreditiPredlog', 'Kreditni predlog'],'docx');
 * 3. cy.verifyFileNameAndExtension('data', 'xlsx');
 * - Or use full path:
 * 1. cy.verifyFileNameAndExtension('cypress/downloads/document.docx', '.docx');
 * 2. cy.verifyFileNameAndExtension('cypress/downloads/report.pdf', 'pdf');
 * 3. cy.verifyFileNameAndExtension('cypress/downloads/data.xlsx', '.xlsx');
 */
Cypress.Commands.add('verifyFileNameAndExtension', (fileOrNames, expectedExtension) => {
  const downloadsFolder = 'cypress/downloads';
  // Normalizuj ekstenziju (uvek sa tačkom, mala slova)
  const extension = expectedExtension.startsWith('.')
    ? expectedExtension.toLowerCase()
    : `.${expectedExtension.toLowerCase()}`;
  // Ako je prosleđen string → pretvori u array
  const names = Array.isArray(fileOrNames) ? fileOrNames : [fileOrNames];
  // Formiraj punu putanju za svaki naziv
  const possiblePaths = names.map((name) => {
    const fullName = name.toLowerCase().endsWith(extension) ? name : `${name}${extension}`;
    return fullName.includes(downloadsFolder) ? fullName : `${downloadsFolder}/${fullName}`;
  });
  // Proveri da li se bilo koji od path-ova završava na očekivanu ekstenziju
  const regex = new RegExp(`\\${extension}$`, 'i');
  const match = possiblePaths.some((path) => regex.test(path));
  expect(
    match,
    `File should have one of the names with ${extension} extension: ${possiblePaths.join(', ')}`
  ).to.be.true;
});

/* Custom command to read all file types
 * Usage:
 * - For text files:
 * cy.readDownloadedFile('document.txt').should('contain', 'expected text');
 * - For binary files (without encoding):
 * cy.readDownloadedFile('document.pdf', 'binary').should('exist');
 */
Cypress.Commands.add('readDownloadedFile', (fileName, encoding = null) => {
  const filePath = fileName.includes('cypress/downloads/')
    ? fileName
    : `cypress/downloads/${fileName}`;
  return cy.readFile(filePath, encoding, { timeout: 10000 });
});

/* Custom command to read Word documents
 * Usage:
 * - For .docx with text extraction:
 * cy.readDocxFile('KreditniProcesKreditiPredlog.docx')
 *  .should('contain', getTestData.creditProposalDocumentData());
 */
Cypress.Commands.add('readDocxFile', (fileName) => {
  const filePath = fileName.includes('cypress/downloads/')
    ? fileName
    : `cypress/downloads/${fileName}`;
  return cy.task('readDocxFile', filePath);
});

/* Custom command to verify .docx content with normalization + regex fallback
 * Usage:
 * - Single file:
 *   cy.verifyDocxContent('KreditniProcesKreditiPredlog.docx', getTestData.creditProposalDocumentData());
 * - Multiple possible files:
 *   cy.verifyDocxContent(['KreditniProcesKreditiPredlog.docx', 'Kreditni predlog .docx'], getTestData.creditProposalDocumentData());
 */
Cypress.Commands.add('verifyDocxContent', (fileOrNames, expectedData) => {
  const downloadsFolder = 'cypress/downloads';
  const names = Array.isArray(fileOrNames) ? fileOrNames : [fileOrNames];
  const normalizeText = (text) =>
    String(text || '')
      .replace(/\s+/g, ' ') // all whitespace to one space
      .replace(/\u00A0/g, ' ') // non-breaking space
      .replace(/\u00AD/g, '') // soft hyphen
      .replace(/[^\x20-\x7EčćžšđČĆŽŠĐ]/g, '') // remove all outside standard range except our letters
      .trim()
      .toLowerCase();
  cy.task('findFirstExistingFile', { folder: downloadsFolder, fileNames: names }).then(
    (foundFile) => {
      expect(foundFile, `Expected one of: ${names.join(', ')} but none were found`).to.not.be.null;
      cy.log(`Found file: ${foundFile}`);
      cy.task('readDocxFile', foundFile).then((docText) => {
        const normalizedDoc = normalizeText(docText);
        expectedData.forEach((expected) => {
          const normalizedExpected = normalizeText(expected);
          // regex fallback for patterns like "datum: ____ godine."
          if (normalizedExpected.startsWith('datum:')) {
            const regex = /datum:\s*_+\s*godine\./i;
            expect(regex.test(normalizedDoc), `Expected DOCX to contain pattern: "${expected}"`).to
              .be.true;
          } else {
            expect(
              normalizedDoc.includes(normalizedExpected),
              `Expected DOCX to contain: "${expected}"`
            ).to.be.true;
          }
        });
      });
    }
  );
});

// Custom command to delete downloads
Cypress.Commands.add('clearDownloadsFolder', () => {
  const downloadsFolder = 'cypress/downloads';
  cy.task('deleteFolder', downloadsFolder);
});

/* Custom command: attachDocumentByIndex
 * Usage: cy.attachDocumentByIndex(0, 'file.pdf', 'Automated Test Note');
 */
Cypress.Commands.add('attachDocumentByIndex', (index, fileName, noteText) => {
  const filePath = `cypress/fixtures/${fileName}`;
  // Make sure that there are no open popups before start
  cy.get('ejs-dialog.e-dlg-modal.e-popup-open').should('not.exist');
  cy.get('app-documents .padding-container.with-status-bar app-manage-attachments-for-object')
    .eq(index)
    .within(() => {
      cy.get('.e-dlg-overlay').should('not.exist');
      cy.get('.top-block button').should('be.enabled').click({ force: true });
    });
  // Wait for popup to appear
  cy.get('ejs-dialog.e-dlg-modal.e-popup-open', { timeout: 10000 })
    .should('be.visible')
    .first()
    .within(() => {
      cy.get('textarea.e-textbox.e-input').clear({ force: true }).type(noteText, {
        force: true,
      });
      cy.get('#file').invoke('show').selectFile(filePath, { force: true });
      Assert.fileAttachmentsVisible(fileName);
      cy.clickPopupSaveButton();
    });
  Assert.dataSuccessfullySavedToastVisible();
  // Wait for popup to really close before next call
  cy.get('ejs-dialog.e-dlg-modal.e-popup-open').should('not.exist');
});
