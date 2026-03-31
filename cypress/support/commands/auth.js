// Custom command for login by token
Cypress.Commands.add('loginByToken', () => {
  cy.env(['first_user', 'first_password']).then(({ first_user, first_password }) => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: first_user,
        password: first_password,
      },
    }).then((response) => {
      const {
        email,
        firstName,
        lastName,
        ous,
        payload,
        roles,
        token,
        tokenHash,
        workAsFirstName,
        workAsLastName,
        workAsOus,
        workAsUsername,
      } = response.body;
      const loginData = {
        email,
        firstName,
        lastName,
        ous,
        payload,
        roles,
        token,
        tokenHash,
        workAsFirstName,
        workAsLastName,
        workAsOus,
        workAsUsername,
      };
      window.localStorage.setItem('loginData', JSON.stringify(loginData));
    });
  });
});

// Custom command to generate a unique test email address
Cypress.Commands.add('generateTestEmail', (prefix = 'qaTestUser') => {
  const suffix = Math.random().toString(36).slice(2, 6); // 4-char alphanumeric
  const email = `${prefix}_${suffix}@example.com`;
  return cy.wrap(email);
});

// Custom command to perform Login via API and return token and user info
Cypress.Commands.add('apiLoginAndUseToken', () => {
  return cy
    .env([
      'preduzetnik_email',
      'preduzetnik_password',
      'preduzetnik_firstName',
      'preduzetnik_lastName',
      'preduzetnik_username',
    ])
    .then(
      ({
        preduzetnik_email,
        preduzetnik_password,
        preduzetnik_firstName,
        preduzetnik_lastName,
        preduzetnik_username,
      }) => {
        return cy
          .request({
            method: 'POST',
            url: '/api/account/login',
            body: {
              email: preduzetnik_email,
              password: preduzetnik_password,
            },
          })
          .then((resp) => {
            expect(resp.status).to.eq(200);
            const { token, userName, firstName, lastName, organizationId, user } = resp.body.value;
            expect(token, 'Token should exist').to.exist;
            expect(userName, 'userName should exist').to.exist.and.equal(preduzetnik_email);
            expect(firstName, 'firstName should exist')
              .to.be.a('string')
              .and.equal(preduzetnik_firstName);
            expect(lastName, 'lastName should exist')
              .to.be.a('string')
              .and.equal(preduzetnik_lastName);
            expect(organizationId, 'organizationId should exist')
              .to.be.a('number')
              .and.to.be.greaterThan(0);
            const fullName = `${firstName} ${lastName}`.trim();
            expect(fullName, 'Full name should match user').to.equal(preduzetnik_username);
            const payload = JSON.parse(atob(token.split('.')[1]));
            expect(payload.sub).to.eq(userName);
            return cy
              .request({
                method: 'GET',
                url: '/api/clientconfiguration/get',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((protectedResp) => {
                expect(protectedResp.status).to.eq(200);
                return { token, userName, firstName, lastName, organizationId, user };
              });
          });
      }
    );
});

// Custom command for valid TubeIQ Login
Cypress.Commands.add('validLoginTubeIQ', () => {
  // Intercept the form GET
  cy.intercept('GET', 'api/query/GetAllGetStartedProcess*').as('getAllStartedProcess');
  cy.env(['tubeIQ_valid_login_email', 'tubeIQ_valid_login_password']).then(
    ({ tubeIQ_valid_login_email, tubeIQ_valid_login_password }) => {
      // Fill the form with valid credentials
      cy.fillFormFieldTubeIQ('Email', tubeIQ_valid_login_email).should(
        'have.value',
        tubeIQ_valid_login_email
      );
      cy.fillFormFieldTubeIQ('Password', tubeIQ_valid_login_password).should(
        'have.value',
        tubeIQ_valid_login_password
      );
      // Submit the form
      cy.get('form input[type="submit"]').should('be.enabled').click();
      // Assert the result
      cy.wait('@getAllStartedProcess').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        // Since TubeIQ returns HTML, check for dashboard markers and assert on DOM
        cy.get('.full-page-right')
          .shouldContainAnyText(['Welcome to TubeIQ', 'Dobrodošli na TubeIQ!'])
          .and('be.visible');
        cy.log(`Login successful for TubeIQ user: ${tubeIQ_valid_login_email}`);
      });
    }
  );
});

// Custom command to keep the user signed in if pop-up appears
Cypress.Commands.add('keepUserSignedIn', () => {
  // Check if the popup is visible
  cy.get('body').then(($body) => {
    if ($body.find('.timeout-dialog').length > 0) {
      cy.log('Timeout dialog detected, keeping user signed in...');
      cy.get('.timeout-dialog').find('#timeout-keep-signin-btn').click();
      cy.get('#timeout-sign-out-button').should('be.visible');
    } else {
      cy.log('No timeout dialog present, continuing...');
    }
  });
});

// Custom command for valid AOFI Login as Pravno Lice
Cypress.Commands.add('validLoginPravnoLice', () => {
  cy.intercept('POST', '**/api/account/login').as('loginCall');
  cy.env(['pravnoLice_email', 'pravnoLice_password']).then(
    ({ pravnoLice_email, pravnoLice_password }) => {
      cy.fillFormField('email', pravnoLice_email).should('have.value', pravnoLice_email);
      cy.fillFormField('password', pravnoLice_password).should('have.value', pravnoLice_password);
      cy.get('button[type="submit"]').should('be.enabled').click();
      cy.wait('@loginCall').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        if (!response.body.isValid || !response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unknown error'}`
          );
        }
        cy.log(`Login successful for: ${response.body.value.userName}`);
      });
    }
  );
});

// Custom command for valid AOFI Login as Preduzetnik
Cypress.Commands.add('validLoginPreduzetnik', () => {
  cy.intercept('POST', `**/api/account/login`).as('loginCall');
  cy.env(['preduzetnik_email', 'preduzetnik_password']).then(
    ({ preduzetnik_email, preduzetnik_password }) => {
      cy.fillFormField('email', preduzetnik_email).should('have.value', preduzetnik_email);
      cy.fillFormField('password', preduzetnik_password).should('have.value', preduzetnik_password);
      cy.get('button[type="submit"]').should('be.enabled').click();
      cy.wait('@loginCall').then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        if (!response.body.isValid || !response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unknown error'}`
          );
        }
        cy.log(`Login successful for: ${response.body.value.userName}`);
      });
    }
  );
});

// Custom command to attempt SQL Injection during login attempt on Aofi portal
Cypress.Commands.add('loginSQLInjectionAttempt', () => {
  cy.intercept('POST', '**/api/account/login').as('loginCall');
  cy.env(['sql_inject_email', 'sql_inject_password']).then(
    ({ sql_inject_email, sql_inject_password }) => {
      cy.fillFormField('email', sql_inject_email).should('have.value', sql_inject_email);
      cy.fillFormField('password', sql_inject_password).should('have.value', sql_inject_password);
      cy.get('button[type="submit"]').should('be.enabled').click();
      cy.wait('@loginCall').then(({ response }) => {
        expect(response.statusCode).to.eq(500);
        if (response.body.isValid || response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unsuccessful login attempt'}`
          );
        }
        cy.log(`SQL Injection attempt was successfully prevented!!`);
      });
    }
  );
});

// Custom command to attempt SQL Injection during login attempt on TubeIQ platform
Cypress.Commands.add('loginSQLInjectionAttemptTubeIQ', () => {
  cy.env(['sql_inject_email', 'sql_inject_password']).then(
    ({ sql_inject_email, sql_inject_password }) => {
      // Fill the form with SQL injection values
      cy.fillFormFieldTubeIQ('Email', sql_inject_email).should('have.value', sql_inject_email);
      cy.fillFormFieldTubeIQ('Password', sql_inject_password).should(
        'have.value',
        sql_inject_password
      );
      // Submit the form
      cy.get('form input[type="submit"]').should('be.enabled').click();
      // Assert the result directly on the page after reload
      cy.url().should('include', '148/'); // still on login page
      cy.contains('Prijava u TubeIQ').should('be.visible'); // marker of login form
      cy.log(`SQL Injection attempt blocked – login page returned`);
    }
  );
});

// Custom command to perform Login via API and store token in LocalStorage
Cypress.Commands.add('loginByToken', () => {
  cy.env(['pravnoLice_email', 'pravnoLice_password']).then(
    ({ pravnoLice_email, pravnoLice_password }) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}api/account/login`,
        body: {
          email: pravnoLice_email,
          password: pravnoLice_password,
        },
        failOnStatusCode: false,
      }).then((response) => {
        if (!response.body.isValid || !response.body.value) {
          throw new Error(
            `Login failed: ${response.body?.validationFailures?.[0]?.errorMessage || 'Unknown error'}`
          );
        }
        const {
          userId,
          userName,
          token,
          cultureCode,
          activities,
          requiresAuthorization,
          homePage,
          organizationId,
          firstName,
          lastName,
        } = response.body.value;
        const loginData = {
          userId,
          userName,
          token,
          cultureCode,
          activities,
          requiresAuthorization,
          homePage,
          organizationId,
          firstName,
          lastName,
        };
        window.localStorage.setItem('loginData', JSON.stringify(loginData));
      });
    }
  );
});

// Custom command to perform an invalid login attempt
Cypress.Commands.add('invalidLogin', () => {
  cy.intercept('POST', '**/api/account/login').as('loginCall');
  cy.env(['invalid_email', 'invalid_password']).then(({ invalid_email, invalid_password }) => {
    cy.fillFormField('email', invalid_email);
    cy.fillFormField('password', invalid_password);
    cy.get('button[type="submit"]').should('be.enabled').click();
    cy.wait('@loginCall').then(({ response }) => {
      const statusCode = response?.statusCode;
      const body = response?.body;
      expect(statusCode).to.eq(500);
      if (!body?.isValid) {
        const messages = Array.isArray(body.validationFailures)
          ? body.validationFailures
              .map((f) => f.errorMessage)
              .filter(Boolean)
              .join(' | ')
          : 'Unknown error';
        cy.log(`Login failed as expected: ${messages}`);
      } else {
        throw new Error('Login unexpectedly succeeded');
      }
    });
  });
});

// Custom command for TubeIQ API login attempt
Cypress.Commands.add('tubeIQApiLogin', () => {
  return cy
    .env(['tubeIQ_valid_login_email', 'tubeIQ_valid_login_password'])
    .then(({ tubeIQ_valid_login_email, tubeIQ_valid_login_password }) => {
      return cy.request('GET', '/Account/Login').then((resp) => {
        const $html = Cypress.$(resp.body);
        const domToken = $html.find('input[name="__RequestVerificationToken"]').val();
        const cookies = resp.headers['set-cookie'];
        let tokenCookie;
        if (cookies) {
          const match = cookies.find((c) => c.startsWith('__RequestVerificationToken'));
          if (match) {
            tokenCookie = match.split(';')[0];
          }
        }
        // If there is no token → immediately return response so the test can assert negative
        if (!domToken || !tokenCookie) {
          return { status: 400, body: 'Missing CSRF token' };
        }
        // Otherwise send POST as fetch does
        return cy.request({
          method: 'POST',
          url: '/', // root
          form: true,
          failOnStatusCode: false,
          body: {
            __RequestVerificationToken: domToken,
            Email: tubeIQ_valid_login_email,
            Password: tubeIQ_valid_login_password,
          },
          headers: {
            Cookie: tokenCookie,
            'content-type': 'application/x-www-form-urlencoded',
            referrer: '/Account/Login',
          },
        });
      });
    });
});
