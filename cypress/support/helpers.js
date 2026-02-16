// Text normalization (whitespace + case)
export const normalizeText = (text) => {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
};

// Check if expected files exist within selected container
export const verifyFilesInContainer = (containerId, expectedFileNames) => {
  const normalizeText = (text) =>
    String(text || '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();
  cy.get(containerId).within(() => {
    cy.get('.dz-preview').then(($preview) => {
      if ($preview.length === 0) {
        // fallback: no files
        cy.log(`There are no available files in ${containerId}`);
        return;
      }
      expectedFileNames.forEach((fileName) => {
        const normalizedExpected = normalizeText(fileName);
        cy.get('.dz-filename span').should(($els) => {
          const texts = $els.toArray().map((el) => normalizeText(el.innerText));
          expect(texts).to.include(normalizedExpected);
        });
      });
    });
  });
};

// Text normalization and comparison with expected text
export const normalizeTextAndCompare = (actualText, expectedTexts) => {
  const normalized = normalizeText(actualText);
  expectedTexts.forEach((expected) => {
    const normalizedExpected = normalizeText(expected);
    expect(normalized, `Expected text to contain: "${normalizedExpected}"`).to.include(
      normalizedExpected
    );
  });
};
