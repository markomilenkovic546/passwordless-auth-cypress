import signupPage from '../pageObjects/pages/SignupPage';
import trackerPage from '../pageObjects/pages/TrackerPage';
import codeValidationPage from '../pageObjects/pages/CodeValidationPage';
import { createRandomUserData } from '../support/data';

describe('signup logic', () => {
    beforeEach(() => {
        signupPage.visit('/signup');
        signupPage.setDesktopViewport();
    });

    it('verifies that user can successfully signup using one-time-code', () => {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        signupPage.signupModal.emailField().type(user.email);
        signupPage.signupModal
            .termsCheckbox()
            .check({ force: true })
            .should('be.checked');
        signupPage.signupModal.continueWithEmailButton().click();
        cy.url().should('include', `enter-code?email=${user.email}`);
        // Handle code validation
        cy.extractOneTimeCode(user.email).then((code) => {
            codeValidationPage.codeInputField().type(code);
            // Verify that user is redirected to the 'Tracker' page
            cy.url().should('include', '/tracker');
            // Verify that default workspace named by username is created and active
            trackerPage.header
                .workspaceDropdownButton()
                .should('contain', `${user.firstName}'s workspace`);
        });
    });

    it('verifies that user can successfully signup via magic link', () => {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        signupPage.signupModal.emailField().type(user.email);
        signupPage.signupModal
            .termsCheckbox()
            .check({ force: true })
            .should('be.checked');
        signupPage.signupModal.continueWithEmailButton().click();
        cy.url().should('include', `enter-code?email=${user.email}`);
        // Handle signup verification
        cy.handleMagicLink(user.email);
        // Verify that user is redirected to the 'Tracker' page
        cy.url().should('include', '/tracker');
        // Verify that default workspace named by username is created and active
        trackerPage.header
            .workspaceDropdownButton()
            .should('contain', `${user.firstName}'s workspace`);
    });

    it('verifies that "terms" checkbox is unchecked by default', () => {
        signupPage.signupModal.termsCheckbox().should('not.be.checked');
    });

    it('verifies "Continue with email" button disables when "terms" checkbox unchecked ', () => {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        signupPage.signupModal.emailField().type(user.email);
        signupPage.signupModal.continueWithEmailButton().should('be.disabled');
    });

    it('verifies that appropriate message is shown after unchecking "terms" checkbox ', () => {
        // Create a random user data via faker.js
        const user = createRandomUserData();
        signupPage.signupModal.emailField().type(user.email);
        signupPage.signupModal
            .termsCheckbox()
            .check({ force: true })
            .should('be.checked');
        signupPage.signupModal
            .termsCheckbox()
            .uncheck({ force: true })
            .should('not.be.checked');
        signupPage.signupModal
            .continueWithEmailButton()
            .click({ force: true })
            .should('be.disabled');
        cy.url().should('include', '/signup');
        signupPage.signupModal
            .termsError()
            .should('contain', 'You must accept the terms of service')
            .and('be.visible');
    });

    it('verifies that user cannot signup with invalid email format', () => {
        signupPage.signupModal.emailField().type('user@@gmail.com');
        signupPage.signupModal
            .termsCheckbox()
            .check({ force: true })
            .should('be.checked');
        signupPage.signupModal
            .continueWithEmailButton()
            .click({ force: true })
            .should('be.disabled');
        signupPage.signupModal
            .emailFormatError()
            .should('contain', 'Email format is not valid')
            .and('be.visible');
    });
});
