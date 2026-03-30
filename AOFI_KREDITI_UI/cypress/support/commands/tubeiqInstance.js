/* Custom command to encapsulate Input fields on TubeIQ Instance view and select by index number
 * Usage:
 * - get input from (index 2) and enter text
 * cy.getTubeIQInstanceInputs(2).type('some text');
 * - or get 1.st row
 * cy.getTubeIQInstanceInputs(0).should('be.visible');
 */
Cypress.Commands.add('getTubeIQInstanceInputs', (index) => {
  return cy.get(`.fill-row:nth-child(${index + 1})`).find('input');
});

/* Custom command to encapsulate Dropdown fields and select by index number on TubeIQ Instance view
 * Usage:
 * - get dropdown from index 2 and select value
 * cy.getTubeIQInstanceDropdown(2).click().get('li').contains('Some Option').click();
 * - or select by getting 1.st row...
 * cy.getTubeIQInstanceDropdown(2).should('be.visible');
 * Note:
 * ejs-dropdownList does not support .select(), so you need to use .click() and select options manually
 */
Cypress.Commands.add('getTubeIQInstanceDropdown', (index) => {
  return cy.get(`.fill-row:nth-child(${index + 1})`).find('ejs-dropdownlist .e-dropdownlist');
});

/* Custom command to select option from TubeIQ Collateral dropdown by index and option index
 * Usage:
 * - cy.selectTubeIQCollateralDropdownByOption(2, '1');
 * Note:
 * option Yes = index 1, option No = index 0
 */
Cypress.Commands.add('selectTubeIQDropdownOption', (rowIndex, value) => {
  cy.intercept('POST', 'common/calculate').as('calculate');
  // cy.wait('@calculate');
  cy.wait(300);
  // 1 selector - mitigate .find() chain
  cy.get(`.fill-row:nth-child(${rowIndex + 1}) .tubeiq-select`)
    .should('exist')
    .click({ force: true });
  cy.wait(500); // wait for dropdown
  cy.document().then((doc) => {
    const options = doc.querySelector('#ddlelement_options');
    if (!options) {
      throw new Error('Dropdown options container not found');
    }
    const targetLi = options.querySelector(`li.e-list-item[data-value="${value}"]`);
    if (targetLi) {
      targetLi.click();
      cy.log(`Clicked on option: ${targetLi.textContent}`);
    } else {
      throw new Error(`Option with data-value="${value}" not found`);
    }
  });
});

/* Custom command to enter test data for Collateral text inputs
 * Supports textarea, input, and masked textbox elements
 * Usage: cy.enterTubeIQTextInputs(0, "Test namena plasmana");
 */
Cypress.Commands.add('enterTubeIQTextInputs', (rowIndex, text) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait(300);
  cy.get(`.fill-row:nth-child(${rowIndex + 1})`).then(($row) => {
    let element;
    // try textarea
    if ($row.find('textarea[id^="textbox_"]').length) {
      element = $row.find('textarea[id^="textbox_"]')[0];
    }
    // masked textbox
    else if ($row.find('input.e-maskedtextbox').length) {
      element = $row.find('input.e-maskedtextbox')[0];
    }
    // regular text input
    else if ($row.find('input[type="text"]').length) {
      element = $row.find('input[type="text"]')[0];
    }
    // datepicker input (Syncfusion ej2)
    else if ($row.find('input[id$="_input"].e-input').length) {
      element = $row.find('input[id$="_input"].e-input')[0];
    }
    // fallback
    else if (
      $row.find('input:not([type="button"]):not([type="checkbox"]):not([type="radio"])').length
    ) {
      element = $row.find(
        'input:not([type="button"]):not([type="checkbox"]):not([type="radio"])'
      )[0];
    }
    if (element) {
      element.value = text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true })); // bitno za datepicker
      cy.log(`Entered text in ${element.tagName.toLowerCase()}:`, text);
    } else {
      throw new Error(`No text input element found in row ${rowIndex}`);
    }
  });
  // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
});

/*
 * Custom command to enter date values into TubeIQ date input fields
 * Usage:
 * cy.enterTubeIQDateInput("03.02.2025");
 * OR with test data function:
 * cy.enterTubeIQDateInput(getTestData.proposalApplicantExposureTubeIQ());
 */
Cypress.Commands.add('enterTubeIQDateInput', (dateString) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait(300);
  cy.get('input#selectedDate[data-filed-name="selectedDate"]').then(($el) => {
    const element = $el[0];
    if (element) {
      element.value = dateString; // npr. "03.02.2025"
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      cy.log(`Entered date: ${dateString}`);
    } else {
      throw new Error('Date input element not found');
    }
  });
  // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
});

/* Custom command to enter numeric values into TubeIQ numeric input fields
 * Usage:
 * cy.enterTubeIQNumberInputs(0, '1234')
 * cy.enterTubeIQNumberInputs(6, getTestData.proposalDraftLoanAmountTubeIQ());
 */
Cypress.Commands.add('enterTubeIQNumberInputs', (rowIndex, number) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait(300);
  const normalizeNumber = (num) => {
    if (num == null) return '';
    return String(num).replace(/[^\d]/g, '');
  };
  cy.get(`.fill-row:nth-child(${rowIndex + 1})`).then(($row) => {
    let element;
    // visible numerictextbox
    if ($row.find('input.e-numerictextbox').length) {
      element = $row.find('input.e-numerictextbox')[0];
    }
    // fallback: id numerictextbox_*
    else if ($row.find('input[id^="numerictextbox_"]').length) {
      element = $row.find('input[id^="numerictextbox_"]')[0];
    }
    // fallback: hidden numeric input
    else if ($row.find('input.e-numeric-hidden').length) {
      element = $row.find('input.e-numeric-hidden')[0];
    }
    if (element) {
      const normalized = normalizeNumber(number);
      element.value = normalized;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      cy.log(`Entered number in ${element.tagName.toLowerCase()}:`, normalized);
    } else {
      throw new Error(`No numeric input element found in row ${rowIndex}`);
    }
  });
  // cy.wait('@calculate').its('response.statusCode').should('eq', 200);
});

/*Note:
 * Custom command that:
 * - For each key in the object, it checks whether the field is dropdown (.tubeiq-select).
 * - If it is, it clicks to open it, then via document.querySelector('#ddlelement_options')
 * it finds <li> with innerText/data-value and clicks/selects it.
 * - If it is not a dropdown, it treats it as a regular input and fills in the value.
 * - Supports finding fields by label OR placeholder.
 * Usage examples:
 * cy.openAndFillCollateralTableInputs(2, { Godina: '2025', Iznos: '1500', Valuta: 'EUR', Komentar: 'Test' });
 * cy.openAndFillCollateralTableInputs(2, { Valuta: { value: '2' } });
 */
Cypress.Commands.add('openAndFillCollateralTableInputs', (rowIndex, values) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait('@calculate');
  cy.wait(300);
  // Click na "Add new row" - koristi nth-child
  cy.get(`form .fill-row:nth-child(${rowIndex + 1})`)
    .find('button')
    .contains(/Add new row|Dodaj novi red/i)
    .click({ force: true });
  cy.wait('@calculate').its('response.statusCode').should('eq', 200);
  // Wait for popup/dialog to open
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible', { timeout: 10000 }).should('exist');
  // Iterate through values
  Object.entries(values).forEach(([fieldIdentifier, value]) => {
    // Check if it's a dropdown by querying the DOM directly
    cy.document().then((doc) => {
      // Try to find by label first
      let labelElement = Array.from(doc.querySelectorAll('.form-field__label')).find(
        (el) => el.textContent.trim() === fieldIdentifier
      );
      let formField = null;
      let hasDropdown = false;
      if (labelElement) {
        // Found by label
        formField = labelElement.closest('.form-field');
        hasDropdown = formField.querySelector('.tubeiq-select') !== null;
      } else {
        // Try to find by placeholder
        const inputByPlaceholder = doc.querySelector(
          `.e-dlg-content input[placeholder="${fieldIdentifier}"], .e-dlg-content textarea[placeholder="${fieldIdentifier}"]`
        );
        if (inputByPlaceholder) {
          formField = inputByPlaceholder.closest('.form-field');
          hasDropdown = formField ? formField.querySelector('.tubeiq-select') !== null : false;
        }
      }
      if (!formField && !hasDropdown) {
        // If no form field found, assume it's a direct input by placeholder
        cy.get('.e-dlg-content:visible')
          .find(
            `input[placeholder="${fieldIdentifier}"], textarea[placeholder="${fieldIdentifier}"]`
          )
          .type(value, { force: true });
        return;
      }
      if (hasDropdown) {
        // Dropdown logic - try to find by label first, then fallback to other methods
        if (labelElement) {
          cy.contains('.form-field__label', fieldIdentifier)
            .parents('.form-field')
            .find('.tubeiq-select .e-ddl-icon')
            .click({ force: true });
        } else {
          // Find dropdown within the form field that contains the input with placeholder
          cy.get('.e-dlg-content:visible')
            .find(
              `input[placeholder="${fieldIdentifier}"], textarea[placeholder="${fieldIdentifier}"]`
            )
            .parents('.form-field')
            .find('.tubeiq-select .e-ddl-icon')
            .click({ force: true });
        }
        cy.wait(500); // small delay for popup to mount
        cy.document().then((doc) => {
          const options = doc.querySelector('#ddlelement_options');
          if (!options) throw new Error('Dropdown options container not found');
          const targetLi =
            typeof value === 'object' && value.value
              ? options.querySelector(`li.e-list-item[data-value="${value.value}"]`)
              : Array.from(options.querySelectorAll('li.e-list-item')).find(
                  (li) => li.textContent.trim() === value
                );
          if (targetLi) {
            targetLi.click(); // direct DOM click
            cy.log(`Clicked on dropdown option for ${fieldIdentifier}:`, targetLi.textContent);
          } else {
            throw new Error(`Option "${value}" not found in dropdown for ${fieldIdentifier}`);
          }
        });
      } else {
        // Regular input/textarea logic - by placeholder
        cy.get('.e-dlg-content:visible')
          .find(
            `input[placeholder="${fieldIdentifier}"], textarea[placeholder="${fieldIdentifier}"]`
          )
          .type(value, { force: true });
      }
    });
  });
  cy.saveTubeIQInstancePopup();
});

// Custom command to fill in text input popups
Cypress.Commands.add('openAndFillCollateralSWOTTables', (rowIndex, value) => {
  cy.intercept('POST', '/common/calculate').as('calculate');
  cy.wait('@calculate');
  cy.wait(300);
  // nth-child is 1-indexed, so +1 to rowIndex
  cy.get(`.fill-row:nth-child(${rowIndex + 1})`)
    .find('button')
    .contains(/Add new row|Dodaj novi red/i)
    .click({ force: true });
  cy.wait('@calculate').its('response.statusCode').should('eq', 200);
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible', { timeout: 10000 }).should('exist');
  // Fill input in dialog
  cy.get('.e-dlg-content:visible').find('input, textarea').type(value, { force: true });
  // Save
  cy.saveTubeIQInstancePopup();
});

// Custom command to open file from dropzone by container name
// Usage: cy.openFileFromContainer('RiskMisljenje', 'Risk mišljenje.docx');
Cypress.Commands.add('openFileFromContainer', (containerName, fileName) => {
  cy.get(`div[data-name="${containerName}"]`)
    .should('exist')
    .within(() => {
      cy.get('.dz-filename span[data-dz-name]').should('contain.text', fileName); // validate file name
      cy.get('a.dz-open').should('contain', 'Open file').click({ force: true }); // click "Open file"
    });
});

// Custom command to print TubeIQ documents from instance view
Cypress.Commands.add('printDocumentsInstanceView', () => {
  cy.get('generate-documents ejs-dialog #dialog_dialog-content')
    .find('button')
    .shouldContainAnyText(['Print', 'Štampaj'])
    .click({ force: true });
});

// Custom command to close TubeIQ documents instance view
Cypress.Commands.add('closeDocumentsInstanceView', () => {
  cy.get('generate-documents ejs-dialog .e-footer-content')
    .find('button')
    .shouldContainAnyText(['Close', 'Zatvori'])
    .click({ force: true });
});

// Custom command to close instance view popup
Cypress.Commands.add('cancelTubeIQInstancePopup', () => {
  cy.get('ejs-dialog.tubeiq-relationship-dialog.e-popup-open:visible', { timeout: 10000 }).should(
    'exist'
  );
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible')
    .find('button.relationship-dialog-custom-close-button')
    .click({ force: true });
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible').should('not.exist');
});

// Custom command to close instance popup by Save button
Cypress.Commands.add('saveTubeIQInstancePopup', () => {
  cy.get('ejs-dialog.tubeiq-relationship-dialog.e-popup-open:visible', { timeout: 10000 }).should(
    'exist'
  );
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible')
    .find('button')
    .filterByText(['Sačuvaj', 'Save'])
    .click({ force: true });
  cy.get('ejs-dialog.tubeiq-relationship-dialog:visible').should('not.exist');
});

/* Custom command to delete all TubeIQ Instance attachments from a specific uploader box
 * Usage:
 *   cy.deleteAllTubeIQInstanceAttachmentsFromBox()    // default prvi box (index 0)
 *   cy.deleteAllTubeIQInstanceAttachmentsFromBox(1)   // drugi box
 */
Cypress.Commands.add('deleteAllTubeIQInstanceAttachmentsFromBox', (boxIndex = 0) => {
  function deleteNext() {
    cy.get('.tubeiq-uploader')
      .eq(boxIndex)
      .find('.e-upload-files')
      .then(($container) => {
        const items = $container.find('li.e-upload-file-list');
        if (items.length > 0) {
          cy.wrap(items[0]).find('.e-file-remove-btn').click({ force: true });
          cy.wait(300); // Syncfusion DOM refresh
          deleteNext(); // repeat while there are files
        } else {
          cy.log(`No attachments left in box ${boxIndex}`);
        }
      });
  }
  deleteNext();
});

/* Custom command to delete all TubeIQ Instance attachments
 * Usage: cy.deleteAllTubeIQInstanceAttachments()
 */
Cypress.Commands.add('deleteAllTubeIQInstanceAttachments', () => {
  function deleteNext() {
    cy.get('.e-upload-files').then(($container) => {
      const items = $container.find('.e-upload-file-list');
      if (items.length > 0) {
        // click on first delete button
        cy.wrap(items[0]).find('.e-file-remove-btn').click({ force: true });
        // wait for DOM refresh
        cy.wait(300);
        // recurse
        deleteNext();
      } else {
        cy.log('No attachments left');
      }
    });
  }
  deleteNext();
});
