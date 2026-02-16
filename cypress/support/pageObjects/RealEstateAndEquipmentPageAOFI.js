import { onAPI } from './API';
import { Assert } from './assertions';
import { getTestData } from './TestData';

export class RealEstateAndEquipmentPageAOFI {
  addNewCompanyRealEstate() {
    cy.get('app-real-estate-grid')
      .find('button')
      .filterByText(['Add new row', 'Dodaj novi red', 'Додај нови ред'])
      .click();
    Assert.checkRealEstatePopupVisible();
  }

  clickFinishAndGoToNextButton() {
    cy.intercept('POST', '/api/aofiRequest/updateAofiRequestFillStatus').as('updateStatus');
    cy.get('app-tab-assets-and-equipment-view-component').within(() => {
      cy.clickFinishAndGoToNextButton();
    });
    cy.wait('@updateStatus');
  }

  fillInRealEstateData() {
    cy.get(
      'ejs-dialog[class="e-control e-dialog e-lib modal-block e-dlg-modal e-popup e-popup-open"]'
    ).within(() => {
      cy.get('text-box[formcontrolname="object"]')
        .clear()
        .type('Automated Test - Company Property');
      cy.get('text-box[formcontrolname="location"]')
        .clear()
        .type('Automated Test - Company Location');
      cy.get('text-box[formcontrolname="area"]')
        .clear()
        .type('Automated Test - Company Property Area');
      cy.get('text-box[formcontrolname="owner"]')
        .clear()
        .type('Automated Test - Company Property Owner');
      cy.get('text-box[formcontrolname="encumbrance"]')
        .clear()
        .type('Automated Test - Company Property Encumbrance', { delay: 10 });
    });
    onAPI.interceptNewRealEstateSave();
    cy.clickPopupSaveButton();
    Assert.dataSuccessfullySavedToastVisible();
  }

  // Recursive function to delete all rows matching specific criteria
  deleteAllFirstMatchingRealEstate() {
    const name = getTestData.realEstatePropertyNameAOFI();
    const emptyPlaceholders = getTestData.emptyPlaceholdersAOFI();
    cy.intercept('POST', '/api/aofiRequest/deleteRealEstateAsset').as('deleteAsset');
    cy.intercept('GET', '/api/aofiRequest/getAllRealEstateAssets*').as('getAssets');
    function deleteFirstRow() {
      cy.get('app-real-estate-grid .e-gridcontent tbody tr:first-child').then(($row) => {
        const text = $row.text().trim();
        if (emptyPlaceholders.some((msg) => text.includes(msg))) {
          cy.log('Grid is empty – only placeholder row remains');
          return;
        }
        if (!text.includes(name)) {
          cy.log(`No more rows with "${name}" found – deletion complete`);
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
            cy.log(`Closed ${$btns.length} error popups`);
          }
        });
        cy.closeAllPopups();
        cy.wait('@deleteAsset');
        cy.wait('@getAssets');
        // recursive
        deleteFirstRow();
      });
    }
    deleteFirstRow();
    cy.contains('app-real-estate-grid .e-gridcontent tbody tr', name, { timeout: 1500 }).should(
      'not.exist'
    );
    cy.log(`Successfully deleted all entries "${name}" from the real estate table`);
  }
}

export const onRealEstatePage = new RealEstateAndEquipmentPageAOFI();
