import BasePage from './BasePage';
import trackerPage from './TrackerPage';
import { createRandomUserData } from '../../support/data';

class SignupPage extends BasePage {
    constructor() {
        super();
        // DOM Elements
        this.loginLink = () => cy.get('a:contains("Log In")');
        this.signupModal = {
            emailField: () => cy.get('[name="emailSignup"]'),
            termsCheckbox: () => cy.get('#agreeCake'),
            termsOfUseLink: () => cy.get('a:contains("Terms of Use")'),
            continueWithEmailButton: () => cy.get('button[type="submit"]'),
            continueWithGoogleButton: () =>
                cy.get('[data-testid="sso-containers"]'),
            termsError: () => cy.get('.cl-invalid-feedback'),
            emailFormatError: () => cy.get('[data-test-id="invalid-email"]')
        };
    }

    signup(email) {
        this.signupModal.emailField().type(email);
        this.signupModal
            .termsCheckbox()
            .check({ force: true })
            .should('be.checked');
        this.signupModal.continueWithEmailButton().click();
        cy.url().should('include', `enter-code?email=${email}`);
        // Handle signup verification
        cy.handleMagicLink(email);
        // Verify that user is redirected to the 'Tracker' page
        cy.url().should('include', '/tracker')
    }
}
const signupPage = new SignupPage();
export default signupPage;
