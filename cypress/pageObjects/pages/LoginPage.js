import BasePage from './BasePage';

class LoginPage extends BasePage {
    constructor() {
        super();
        // DOM Elements
        this.signupLink = () => cy.get('a:contains("Sign Up")');

        // Login modal component elements
        this.loginModal = {
            emailField: () => cy.get('#email'),
            continueWithEmailButton: () => {
                return cy.get('[data-test-id="login-button"]')
                
            },
            continueWithGoogleButton: () =>
                cy.get('[data-testid="sso-containers"]'),
            termsError: () =>
                cy.get('div:contains("You must accept the terms of service")'),
            emailFormatError: () => cy.get('[data-test-id="invalid-email"]'),
            loginManuallyLink: () => cy.get('[data-test-id="login-manual"]'),
            passwordField: () => cy.get('#password'),
            controlPasswordVisibilityToggle: () =>
                cy.get('.cl-form-control__visibility-toggle'),
            forgotPasswordLink: () =>
                cy.get('a:contains(" Forgot password? ")'),
            loginButton: () => cy.get('[data-test-id="login-button"]'),
            invalidEmailOrPasswordError: () => {
                return cy
                    .get('[data-cy="error"]')
                    .contains('Invalid email or password');
            }
        };
    }
}
const loginPage = new LoginPage();

export default loginPage
