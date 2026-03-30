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
    cy.finishAndGoToNext('app-tab-assets-and-equipment-view-component');
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

  deleteAllFirstMatchingRealEstate() {
    cy.intercept('GET', '/api/aofiRequest/getAllRealEstateAssets*').as('getAssets');
    cy.deleteAllMatchingGridRows({
      gridSelector: 'app-real-estate-grid .e-gridcontent tbody tr',
      name: getTestData.realEstatePropertyNameAOFI(),
      emptyPlaceholders: getTestData.emptyPlaceholdersAOFI(),
      deleteEndpoint: '/api/aofiRequest/deleteRealEstateAsset',
      alias: 'deleteAsset',
      extraWaitAliases: ['@getAssets'],
      logContext: 'Real estate',
    });
  }
}

export const onRealEstatePage = new RealEstateAndEquipmentPageAOFI();
