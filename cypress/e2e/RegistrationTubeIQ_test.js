/// <reference types="cypress" />
import { Assert } from '../support/pageObjects/assertions.js';
import { onRegistrationTubeIQ } from '../support/pageObjects/RegistrationPageTubeIQ.js';

describe('registration page test', () => {
  // Enable before() hook for CI pipeline
  // before(() => {
  //   cy.startSmtp();
  // });
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearEmailInbox();
    cy.goToTubeIQRegistrationPage();
  });

  it('enter email, password and check that register button is enabled', () => {
    Assert.successfulRegistrationPageLoad();
    onRegistrationTubeIQ.enterTubeIQRegistrationEmail();
    onRegistrationTubeIQ.enterTubeIQRegistrationPassword();
    Assert.checkRegisterButton();
  });

  it('Registracija i provera emaila u smtp4dev', () => {
    cy.registerAndCheckEmailInbox();
    onRegistrationTubeIQ.readEmail();
    Assert.successfulConfirmEmailPageLoad();
  });
});
