import loginPage from '../pageObjects/pages/LoginPage';
import signupPage from '../pageObjects/pages/SignupPage';
import trackerPage from '../pageObjects/pages/TrackerPage';
import codeValidationPage from '../pageObjects/pages/CodeValidationPage';
import { createRandomUserData } from '../support/data';

describe('passwordless login logic', () => {
    beforeEach(() => {
        loginPage.visit('/login');
        loginPage.setDesktopViewport();
    });

    it('verifies that user can successfully login using one-time-code', () => {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        // Register user
        cy.visit('/signup');
        signupPage.signup(user.email);
        trackerPage.header.profileButton().click();
        trackerPage.header.profileDropdown.logoutLink().click();
        cy.visit('/login');
        // Submit the login form
        loginPage.loginModal.emailField().type(user.email);
        loginPage.loginModal.continueWithEmailButton().click();
        cy.url().should('include', `enter-code?email=${user.email}`);
        // Handle code validation
        cy.extractOneTimeCode(user.email).then((code) => {
            codeValidationPage.codeInputField().type(code);
            // Verify that user is redirected to the 'Tracker' page
            cy.url().should('include', '/tracker');
        });
    });

    it('verifies that user can successfully login via magic link', () => {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        // Register user
        cy.visit('/signup');
        signupPage.signup(user.email);
        trackerPage.header.profileButton().click();
        trackerPage.header.profileDropdown.logoutLink().click();
        cy.visit('/login');
        // Submit the login form
        loginPage.loginModal.emailField().type(user.email);
        loginPage.loginModal.continueWithEmailButton().click();
        cy.url().should('include', `enter-code?email=${user.email}`);
        // Get magic link and navigate to url
        cy.handleMagicLink(user.email);

        // Verify that user is redirected to the 'Tracker' page
        cy.url().should('include', '/tracker');
    });

    it('verifies that submit button is disabled while email field is empty', function () {
        loginPage.loginModal.continueWithEmailButton().should('be.disabled');
    });

    it('verifies that user cannot login with already used one-time-code', function () {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        // Register user
        cy.visit('/signup');
        signupPage.signup(user.email);
        trackerPage.header.profileButton().click();
        trackerPage.header.profileDropdown.logoutLink().click();
        cy.visit('/login');
        // Submit the login form
        loginPage.loginModal.emailField().type(user.email);
        loginPage.loginModal.continueWithEmailButton().click();
        cy.url().should('include', `enter-code?email=${user.email}`);
        // Handle code validation
        cy.extractOneTimeCode(user.email).then((code) => {
            codeValidationPage.codeInputField().type(code);
            trackerPage.header.profileButton().click();
            trackerPage.header.profileDropdown.logoutLink().click();
            // Submit login form and enter already used code
            loginPage.loginModal.emailField().type(user.email);
            loginPage.loginModal.continueWithEmailButton().click();
            cy.wait(2000);
            codeValidationPage.codeInputField().type(code);
            cy.url().should('include', `enter-code?email=${user.email}`);
            codeValidationPage
                .errorMessage()
                .should('contain', "That code isn't valid. Please try again.");
        });
    });
});
