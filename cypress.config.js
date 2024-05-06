const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
    env: {
        ...process.env,
        mailsacApiBaseUrl: 'https://mailsac.com/api'
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    e2e: {
        chromeWebSecurity: false,
        specPattern: 'cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
        reporter: 'cypress-mochawesome-reporter',
        testIsolation: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('cypress-mochawesome-reporter/plugin')(on);
        },
        baseUrl: 'https://app.clockify.me/en',
        retries: 1
        
    }
});
