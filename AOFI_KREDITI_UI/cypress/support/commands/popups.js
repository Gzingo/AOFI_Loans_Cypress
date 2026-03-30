/*
 * A custom Cypress command to close all modal popups or overlay elements.
 * This command iterates through common popup selectors and clicks them until
 * no popups remain. Supports case-insensitive text matching and custom selectors.
 * Usage:
 * cy.closeAllPopups();
 * cy.closeAllPopups(['.custom-popup-close', '[data-test="dismiss"]']);
 * @param {string[]} customSelectors - Optional array of additional selectors to check.
 */
Cypress.Commands.add('closeAllPopups', (customSelectors = []) => {
  const defaultSelectors = [
    '[aria-label="Close"]',
    '.modal-close-button',
    '.popup-close',
    '.overlay-dismiss',
    '.modal-button-save', // Yes button
    '.modal-button-close', // No button
    '.modal-error .e-dlg-closeicon-btn', // error dialog close
  ];
  const textSelectors = ['Close', 'Cancel', 'x'];
  const allSelectors = [...defaultSelectors, ...customSelectors];
  const closePopup = () => {
    cy.get('body', { log: false }).then(($body) => {
      let popupFound = false;
      // standard selectors
      for (const selector of allSelectors) {
        const $el = $body.find(selector).filter(':visible');
        if ($el.length > 0) {
          popupFound = true;
          cy.wrap($el.first(), { log: false }).click({ force: true, log: false });
          // scope na parent dialog, ne na sve
          cy.wrap($el.first().closest('[role="dialog"]')).should('not.exist');
          Cypress.log({
            name: 'closeAllPopups',
            displayName: 'closeAllPopups',
            message: `Closed a popup using selector: "${selector}"`,
            consoleProps: () => ({ 'Selector Found': selector }),
          });
          break;
        }
      }
      // text-based buttons
      if (!popupFound) {
        for (const text of textSelectors) {
          const $el = $body
            .find('button:visible')
            .filter((_, el) => el.innerText.trim().toLowerCase() === text.toLowerCase());
          if ($el.length > 0) {
            popupFound = true;
            cy.wrap($el.first(), { log: false }).click({ force: true, log: false });
            cy.wrap($el.first().closest('[role="dialog"]')).should('not.exist');
            Cypress.log({
              name: 'closeAllPopups',
              displayName: 'closeAllPopups',
              message: `Closed a popup button with text: "${text}"`,
              consoleProps: () => ({ 'Text Found': text }),
            });
            break;
          }
        }
      }
      // recursion only if something was actually closed
      if (popupFound) {
        closePopup();
      } else {
        Cypress.log({
          name: 'closeAllPopups',
          displayName: 'closeAllPopups',
          message: 'No more popups found to close.',
        });
      }
    });
  };
  closePopup();
});

/**
 * Custom command to delete all grid rows matching a name.
 * Replaces 10 identical recursive deleteAll methods across page objects.
 *
 * @param {Object} options
 * @param {string} options.gridSelector - Component + grid selector (e.g. 'app-stakeholders-grid .e-gridcontent tbody tr')
 * @param {string} options.name - Text to match in row content
 * @param {string} options.deleteEndpoint - API endpoint for delete (e.g. '/api/aofiRequest/deleteStakeholder')
 * @param {string} options.alias - Cypress alias name (e.g. 'deleteStakeholder')
 * @param {string[]} options.emptyPlaceholders - Placeholder texts that indicate empty grid (from getTestData.emptyPlaceholdersAOFI())
 * @param {string[]} [options.extraWaitAliases] - Additional API aliases to wait after delete (e.g. ['@getAssets'])
 * @param {number} [options.preDelay=0] - Delay in ms before starting deletion
 * @param {string} [options.logContext='grid'] - Name for log messages
 *
 * Usage:
 *   cy.deleteAllMatchingGridRows({
 *     gridSelector: 'app-stakeholders-grid .e-gridcontent tbody tr',
 *     name: getTestData.stakeholderNameAOFI(),
 *     emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
 *     deleteEndpoint: '/api/aofiRequest/deleteStakeholder',
 *     alias: 'deleteStakeholder',
 *   });
 */
Cypress.Commands.add('deleteAllMatchingGridRows', (options) => {
  const {
    gridSelector,
    name,
    emptyPlaceholders,
    deleteEndpoint,
    alias,
    extraWaitAliases = [],
    preDelay = 0,
    logContext = 'grid',
  } = options;

  if (preDelay > 0) {
    cy.wait(preDelay);
  }

  cy.intercept('POST', deleteEndpoint).as(alias);

  function deleteFirstRow() {
    cy.get(gridSelector)
      .first()
      .then(($row) => {
        const text = $row.text().trim();

        if (emptyPlaceholders.some((msg) => text.includes(msg))) {
          cy.log(`[${logContext}] Grid is empty, only placeholder row remains`);
          return;
        }

        if (!text.includes(name)) {
          cy.log(`[${logContext}] No more rows with "${name}" found, deletion complete`);
          return;
        }

        cy.wrap($row).within(() => {
          cy.get('td:last-child')
            .find('.action-btn-div button svg path[d^="M4.21875"]')
            .click({ force: true });
        });

        cy.get('[role="dialog"] .modal-button-save').filter(':visible').click({ force: true });

        cy.get('ejs-dialog.modal-error .e-dlg-closeicon-btn', { timeout: 0 }).then(($btns) => {
          if ($btns.length) {
            cy.wrap($btns).click({ multiple: true, force: true });
            cy.log(`[${logContext}] Closed ${$btns.length} error popups`);
          }
        });

        cy.closeAllPopups();
        cy.wait(`@${alias}`);

        for (const extra of extraWaitAliases) {
          cy.wait(extra);
        }

        deleteFirstRow();
      });
  }

  deleteFirstRow();

  cy.contains(gridSelector, name, { timeout: 2000 }).should('not.exist');
  cy.log(`Successfully deleted all entries "${name}" from the ${logContext} table`);
});