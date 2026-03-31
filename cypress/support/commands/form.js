// Custom command to fill form field by formcontrolname with retries
Cypress.Commands.add('fillFormField', (formControlName, value, retries = 2) => {
  const selector = `[formcontrolname="${formControlName}"] input`;
  const attemptType = (attempt) => {
    Cypress.Promise.try(() => {
      cy.get(selector)
        .should('be.visible')
        .clear({ force: true })
        .type(value, { delay: 30, force: true })
        .should('have.value', value);
    }).catch(() => {
      if (attempt < retries) {
        Cypress.log({
          name: 'fillFormField',
          message: `Retry ${attempt + 1} for '${formControlName}'`,
        });
        cy.wait(500);
        attemptType(attempt + 1);
      } else {
        throw new Error(
          `Failed to fill '${formControlName}' with '${value}' after ${retries + 1} attempts`
        );
      }
    });
  };
  attemptType(0);
});

// Custom command to fill form field by ID or name with retries
Cypress.Commands.add('fillFormFieldTubeIQ', (fieldName, value, retries = 2) => {
  const selector = `input[id="${fieldName}"], input[name="${fieldName}"]`;
  const attemptType = (attempt) => {
    Cypress.Promise.try(() => {
      cy.get(selector)
        .should('be.visible')
        .clear({ force: true })
        .type(value, { delay: 30, force: true })
        .should('have.value', value);
    }).catch(() => {
      if (attempt < retries) {
        Cypress.log({
          name: 'fillFormFieldByIdOrName',
          message: `Retry ${attempt + 1} for '${fieldName}'`,
        });
        cy.wait(500);
        attemptType(attempt + 1);
      } else {
        throw new Error(
          `Failed to fill '${fieldName}' with '${value}' after ${retries + 1} attempts`
        );
      }
    });
  };
  attemptType(0);
});

// Compound command: intercept updateStatus, click Finish within app component, wait for response
Cypress.Commands.add('finishAndGoToNext', (appSelector, options = {}) => {
  cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
  cy.get(appSelector).within(() => {
    cy.clickFinishAndGoToNextButton();
  });
  const interception = cy.wait('@updateStatus');
  if (options.verifyStatus) {
    interception.its('response.statusCode').should('eq', 200);
  }
});

// Custom command to click Finish and Go to Next button
Cypress.Commands.add('clickFinishAndGoToNextButton', () => {
  cy.get('button')
    .filterByText([
      'Finish and Go to Next',
      'Završi i pređi na sledeće',
      'Заврши и пређи на следеће',
    ])
    .click({ force: true });
});

// Custom command to click Finish button when request card is completed
Cypress.Commands.add('clickFinishButton', () => {
  cy.get('button').filterByText(['Finish', 'Završi', 'Заврши']).click({ force: true });
});

// Custom command to click on Save button within the popup window
Cypress.Commands.add('clickPopupSaveButton', () => {
  cy.get('.e-footer-content')
    .find('button')
    .filterByText(['Save', 'Sačuvaj', 'Сачувај'])
    .click({ force: true });
});

/* Custom command to select radio buttons by label text (supports multiple variants)
 * Usage: cy.selectRadioByLabel('No'); cy.selectRadioByLabel('Ne');
 * cy.selectRadioByLabel('Да'); cy.selectRadioByLabel('Yes'); cy.selectRadioByLabel('Da');
 */
Cypress.Commands.add('selectRadioByLabel', (labelText) => {
  const variants = {
    No: ['No', 'Ne', 'Не'],
    Yes: ['Yes', 'Da', 'Да'],
  };
  // find all texts for given labelText
  const texts = variants[labelText] || [labelText];
  // find the label that holds any text variant
  cy.contains('label', new RegExp(texts.join('|')))
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).check({ force: true });
    });
});

/* Custom command to toggle accordion panels using filterByText
 * Usage:
 * cy.toggleAccordion(['Process', 'Proces']); - toggle by text variants
 * cy.toggleAccordion('Tasks');               - toggle by single text
 * cy.toggleAccordion('#collapseProcess');    - toggle by href
 */
Cypress.Commands.add('toggleAccordion', (labelOrVariants) => {
  if (typeof labelOrVariants === 'string' && labelOrVariants.startsWith('#')) {
    // Match by href
    cy.get(`a.accordion-toggle[href="${labelOrVariants}"]`).click({ force: true });
  } else {
    // Match by text variants (array or single string) using filterByText
    const variants = Array.isArray(labelOrVariants) ? labelOrVariants : [labelOrVariants];
    cy.get('a.accordion-toggle').filterByText(variants).click({ force: true });
  }
});

// Custom command to get Toast messages and verify text
Cypress.Commands.add('getToastWithText', (expectedTexts) => {
  // expectedTexts can be an array of strings or regex
  const regex = Array.isArray(expectedTexts) ? new RegExp(expectedTexts.join('|')) : expectedTexts;
  return cy.get('[id^="toast_"] .e-toast-message').filter((_, el) => regex.test(el.innerText));
});

/*Custom command to normalize text (removes extra whitespace, tabs, newlines)
 *Usage:
 *- For manual text normalization:
 * cy.normalizeText('Text  with   multiple    spaces').then((normalized) => {
 *  expect(normalized).to.equal('Text with multiple spaces');
 *});
 */
Cypress.Commands.add('normalizeText', (text) => {
  return text.replace(/\s+/g, ' ').trim();
});

/* Custom command for selecting a menu item by partial text match
 * Usage: cy.selectMenuItemByPartialText('MyAll');
 */
Cypress.Commands.add('selectMenuItemByPartialText', (partialText) => {
  cy.get('#btnListMenu').click({ force: true });
  cy.get('#listMenu li a')
    .filter((i, el) => el.innerText.toLowerCase().includes(partialText.toLowerCase()))
    .first()
    .click({ force: true });
});
