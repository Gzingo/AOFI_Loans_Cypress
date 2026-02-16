/// <reference types="cypress" />

import { Assert } from '../support/pageObjects/assertions';
import { onLoginTubeIQPage } from '../support/pageObjects/LoginPageTubeIQ';

describe('login page TubeIQ test', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.goToTubeIQLoginPage();
  });

  it('successfully login as TubeIQ user', () => {
    Assert.confirmTubeIQLoginURL();
    onLoginTubeIQPage.fillInLoginEmail();
    onLoginTubeIQPage.fillInLoginPassword();
    onLoginTubeIQPage.clickLoginButton();
    Assert.confirmTubeIQDashboardURL();
  });

  // Unsuccessful user login via API
  it('API login fails when token is missing', () => {
    cy.tubeIQApiLogin().then((resp) => {
      Assert.apiLoginTubeIQFails(resp);
    });
  });

  // Successful login with Enter key
  it('successfully logs in with Enter key', () => {
    Assert.confirmTubeIQLoginURL();
    onLoginTubeIQPage.fillInLoginEmail();
    onLoginTubeIQPage.fillInLoginPassword();
    onLoginTubeIQPage.pressEnterOnLoginButton();
    Assert.confirmTubeIQDashboardURL();
  });

  // Unsuccessful login with empty input fields
  it('unsuccessful login with no input', () => {
    onLoginTubeIQPage.leaveLoginInputFieldsEmpty();
    onLoginTubeIQPage.clickLoginButton();
    Assert.confirmTubeIQLoginURL();
  });

  // Unsuccessful login with email input only
  it('unsuccessful login with only email input', () => {
    onLoginTubeIQPage.leavePasswordInputEmpty();
    onLoginTubeIQPage.clickLoginButton();
    Assert.confirmTubeIQLoginURL();
  });

  // Unsuccessful login with password input only
  it('unsuccessful login with only password input', () => {
    onLoginTubeIQPage.leaveEmailInputEmpty();
    onLoginTubeIQPage.clickLoginButton();
    Assert.confirmTubeIQLoginURL();
  });

  // Unsuccessful login with invalid credentials
  it('unsuccessful login with invalid credentials', () => {
    onLoginTubeIQPage.invalidLoginInputs();
    onLoginTubeIQPage.clickLoginButton();
    Assert.confirmTubeIQLoginURL();
  });

  // Should not allow SQL Injection
  it('unsuccessful SQL Injection attack', () => {
    cy.loginSQLInjectionAttemptTubeIQ();
    Assert.unsuccessfulTubeIQLogin();
  });
});
