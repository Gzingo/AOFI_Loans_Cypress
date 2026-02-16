import { Assert } from './assertions.js';

export class LoanRequestFormAOFI {
  fillBasicDataLoanRequest() {
    cy.get('.top-block').find('button').should('be.visible').click();
    Assert.checkBasicDataPopupVisible();
    cy.get('app-select[formcontrolname="aofiCreditProductId"]').click();
    cy.get('[id="ddlelement_popup"]')
      .should('be.visible')
      .within(() => {
        cy.get('ul li')
          .filterByText([
            'A short-term loan with an annuity repayment plan',
            'Kratkoročni kredit sa anuitetnim planom otplate',
            'Краткорочни кредит са ануитетним планом отплате',
          ])
          .click({ force: true });
      });
    cy.get('.currencyAmount').within(() => {
      cy.get('input[id^="numerictextbox_"]').clear().type('420002');
    });
    cy.get('ejs-dropdownlist[id^="ej2_dropdownlist_"]').click();
    cy.get('[id^="ej2_dropdownlist_"][id$="_popup"]')
      .should('be.visible')
      .within(() => {
        cy.get('li[data-value="978"]').click();
      });
    cy.get('text-box[formcontrolname="period"] input').clear().type('12');
    cy.get('number[formcontrolname="installment"]').clear().type('12');
    cy.get('text-box[formcontrolname="explanation"] textarea')
      .clear()
      .type('Automation test AOFI credit request legal entity');
    cy.clickPopupSaveButton();
    cy.closeAllPopups();
    Assert.checkBasicDataFormFilled();
  }

  checkTheMandatoryConditionsCheckbox() {
    cy.get('ejs-checkbox[formcontrolname="familiarWithTerms"]').within(() => {
      cy.get('input[type="checkbox"]').check();
    });
  }

  goToCompanyActivitiesPage() {
    cy.get('ejs-sidebar[id="default-sidebar"]').within(() => {
      cy.get('ul li')
        .filterByText([
          'Activities in which the company is engaged',
          'Delatnosti u kojima je preduzeće angažovano',
          'Делатности у којма је предузеће ангажовано',
        ])
        .click();
    });
  }

  goToDocumentationPage() {
    cy.get('ejs-sidebar[id="default-sidebar"]').within(() => {
      cy.get('ul li')
        .filterByText([
          'Required documentation with the request',
          'Potrebna dokumentacija uz zahtev',
          'Потребна документација уз захтев',
        ])
        .click();
    });
  }

  goToReferenceListPage() {
    cy.get('ejs-sidebar[id="default-sidebar"]').within(() => {
      cy.get('ul li')
        .filterByText([
          'Reference list of the applicant (if extensive, provide as an attachment)',
          'Referentna lista podnosioca zahteva (ukoliko je obimna dati u prilogu)',
          'Референтна листа подносиоца захтева (уколико је обимна дати у прилогу)',
        ])
        .click();
    });
  }
}
export const onLoanRequestForm = new LoanRequestFormAOFI();
