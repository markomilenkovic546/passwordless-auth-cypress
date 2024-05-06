import BasePage from './BasePage';

class CodeValidationPage extends BasePage {
    constructor() {
        super()
        this.codeInputField = () => cy.get('input').eq(0),
        this.errorMessage = () => cy.get('.cl-invalid-feedback')
    }
}

const codeValidationPage = new CodeValidationPage();
export default codeValidationPage
