export default class BasePage {
    visit(url) {
        cy.visit(url);
    }

    goBack() {
        cy.go('back');
    }

    setMobileViewport() {
        cy.viewport('iphone-x');
    }

    setTabletViewport() {
        cy.viewport('ipad-2');
    }

    setDesktopViewport() {
        cy.viewport('macbook-13');
    }

    setLargeDesktopViewport() {
        cy.viewport('macbook-15');
    }
}
