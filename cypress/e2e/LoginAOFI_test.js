/// <reference types="cypress" />
import { onAPI } from '../support/pageObjects/API.js';
import { Assert } from '../support/pageObjects/assertions';
import { onLoginAOFI } from '../support/pageObjects/LoginPageAOFI.js';

describe('login page AOFI test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.goToLoginPage();
  });

  // Successful checks the token and user info login via API and set token in localStorage
  it('successful API token storage', () => {
    cy.apiLoginAndUseToken();
  });

  // Successful login as Pravno lice
  it('successfully login as Pravno lice', () => {
    cy.validLoginPravnoLice();
    Assert.successfulPravnoLiceLogin();
  });

  // Successful login as Preduzetnik
  it('successfully login as Preduzetnik', () => {
    cy.validLoginPreduzetnik();
    Assert.successfulPreduzetnikLogin();
  });

  // Successful login with Enter key
  it('successfully logs in with Enter key', () => {
    onLoginAOFI.loginWithEnterKey();
    Assert.successfulPravnoLiceLogin();
  });

  // Unsuccessful login with empty input fields
  it('unsuccessful login with no input', () => {
    onLoginAOFI.leaveLoginInputsEmpty();
    onLoginAOFI.clickLoginButton();
    Assert.unsuccessfulLoginInput();
  });

  // Unsuccessful login with email input only
  it('unsuccessful login with only email input', () => {
    onLoginAOFI.enterOnlyEmailInput();
    onLoginAOFI.clickLoginButton();
    Assert.unsuccessfulLoginInput();
  });

  // Unsuccessful login with password input only
  it('unsuccessful login with only password input', () => {
    onLoginAOFI.enterOnlyPasswordInput();
    onLoginAOFI.clickLoginButton();
    Assert.unsuccessfulLoginInput();
  });

  // Unsuccessful login with invalid credentials
  it('unsuccessful login with invalid credentials', () => {
    cy.invalidLogin();
    Assert.unsuccessfulLogin();
  });

  // Should not allow SQL Injection
  it('unsuccessful SQL Injection attack', () => {
    cy.loginSQLInjectionAttempt();
    Assert.unsuccessfulLogin();
  });

  it('should extract token, validate JWT structure, and match sub with userName', () => {
    onAPI.validateTokenAndSubject();
  });

  // Should clear session on logout
  it('successful clearing the session on logout', () => {
    cy.validLoginPravnoLice();
    Assert.successfulPravnoLiceLogin();
    onLoginAOFI.clickLogOutButton();
    Assert.successfulLogout();
    onAPI.verifyTokenClearedOnLogout();
  });
});
