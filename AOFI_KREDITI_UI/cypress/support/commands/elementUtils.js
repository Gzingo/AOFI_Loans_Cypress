/* Custom command to filter elements by multiple text variants (case-insensitive)
 * Usage with single string: cy.get('selector').filterByText('Some Text')
 * Usage with array: cy.get('selector').filterByText(['Text1', 'Text2', 'Текст3'])
 */
Cypress.Commands.add('filterByText', { prevSubject: 'element' }, (subject, variants) => {
  const texts = Array.isArray(variants) ? variants : [variants]; // normalization
  return cy.wrap(subject).filter((i, el) => {
    const text = Cypress.$(el).text().trim().toLowerCase();
    return texts.some((v) => text.includes(v.toLowerCase())); // substring match
  });
});

/* Custom command to filter AOFI task items by multiple text variants (case-insensitive)
 * Usage with single string: cy.get('selector').filterAOFIByText('Some Text')
 * Usage with array: cy.get('selector').filterAOFIByText(['Text1', 'Text2', 'Text3'])
 */
Cypress.Commands.add('filterAOFIByText', { prevSubject: 'element' }, (subject, variants) => {
  const texts = Array.isArray(variants) ? variants : [variants];
  const filtered = Cypress.$(subject).filter((i, el) => {
    const text = Cypress.$(el).text().trim().toLowerCase();
    return texts.some((v) => text.includes(v.toLowerCase()));
  });
  return cy.wrap(filtered); // ovo vraća Cypress chainable
});

/* Custom command to filter TubeIQ task items by multiple text variants (case-insensitive)
 * Usage with single string: cy.get('selector').filterTubeIQByText('Some Text')
 * Usage with array: cy.get('selector').filterTubeIQByText(['Text1', 'Text2', 'Text3'])
 */
Cypress.Commands.add('filterTubeIQByText', { prevSubject: 'element' }, (subject, variants) => {
  const texts = Array.isArray(variants) ? variants : [variants];
  const filtered = Cypress.$(subject).filter((i, el) => {
    const text = Cypress.$(el).text().trim().toLowerCase();
    return texts.some((v) => text.includes(v.toLowerCase()));
  });
  return filtered; // returns jQuery collection
});

/* Custom command to assert that the element's text matches any of the provided variants (case-insensitive)
 * Usage: cy.get('selector').shouldContainAnyText(['Text1', 'Text2', 'Текст3'])
 */
Cypress.Commands.add('shouldContainAnyText', { prevSubject: 'element' }, (subject, variants) => {
  const normalizeText = (text) =>
    text
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/[\n\r\t]+/g, ' ')
      .trim()
      .toLowerCase();
  cy.wrap(subject).then(($el) => {
    const rawText = Cypress.$($el).text();
    // Debug log can be uncommented if needed
    // cy.log(`Actual text: "${rawText}"`);
    const normalized = normalizeText(rawText);
    const match = variants.some((v) => normalized.includes(normalizeText(v)));
    expect(match, `Element should contain one of: ${variants.join(', ')}`).to.be.true;
  });
});

// Custom command to scroll to botom of the TUbeIQ Task page
Cypress.Commands.add('scrollToBottom', (index = 0) => {
  cy.get('#full-page').within(() => {
    cy.get('.scroll-y').eq(index).scrollTo('bottom', { easing: 'linear' });
  });
});

/* Custom command to assert every task contains "<text>" - with normalization and support for multiple variants
 * Usage:
 * - cy.iterateTaskItems(); default text
 * - or cy.iterateTaskItems('Some Other Text'); custom text
 */
Cypress.Commands.add('iterateTaskItems', (searchText) => {
  const normalizeText = (text) =>
    String(text || '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();
  const toRequiredArray = (input) => {
    if (Array.isArray(input)) {
      return input.map(normalizeText).filter(Boolean);
    }
    if (typeof input === 'string') {
      return input.split(',').map(normalizeText).filter(Boolean);
    }
    const asString = normalizeText(String(input || ''));
    return asString ? asString.split(',').map(normalizeText).filter(Boolean) : [];
  };
  const requiredTexts = toRequiredArray(searchText);
  cy.get('#items-wrapper li.taskitem').then(($els) => {
    const allTexts = $els.toArray().map((el) => normalizeText(el.innerText));
    requiredTexts.forEach((req) => {
      const found = allTexts.some((text) => text.includes(req));
      expect(found, `Should contain "${req}"`).to.be.true;
    });
  });
});

/* Custom command to assert digit inputs - chainable
 * Usage: cy.assertReadonlyDigits(3, 8); - through index
 * cy.get(...).assertReadonlyDigits(8);
 */
Cypress.Commands.add(
  'assertReadonlyDigits',
  { prevSubject: 'element' }, // makes this command chainable
  (subject, count) => {
    const regex = new RegExp(`^\\d{${count}}$`);
    cy.wrap(subject).should(($input) => {
      expect($input.val()).to.match(regex);
    });
  }
);

// Custom command to click "Load More" button based on total comments count
Cypress.Commands.add('clickLoadMoreTubeIQCommentsByCount', (count) => {
  const clicksNeeded = Math.floor((count - 1) / 10);
  cy.log(`Total comments: ${count}, clicks needed: ${clicksNeeded}`);
  for (let i = 0; i < clicksNeeded; i++) {
    cy.get('#btLoadMore').then(($btn) => {
      if ($btn.is(':visible')) {
        cy.wrap($btn).click({ force: true });
        cy.log(`Clicked Load More (${i + 1}/${clicksNeeded})`);
      } else {
        cy.log('Load More button hidden, stopping early');
      }
    });
  }
});
