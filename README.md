## Introduction 📖

This project demonstrates a solution for automation the testing of the signup and login features of an application that utilizes passwordless authentication methods, such as magic links or OTPs sent via email. This solution provides access to email inboxes via the third-party service 'mailsac.com,' avoiding the need to access inboxes via a browser. I used 'Clockify' as an example of the application under test.

Access to the email inbox via `mailsac.com` API is facilitated by creating an account on `mailsac.com` and obtaining an API key, which must be attached in the HTTP request header to retrieve the contents of any email inbox associated with the mailsac.com domain. The content of the email inbox is returned by the server in JSON format. The logic pertaining to interaction with the mailsac.com service and extraction of email content has been abstracted into Cypress custom commands, located in cypress/support/commands.js.

Regarding interaction with UI elements, the project follows the Page Object Model (POM) design pattern.
The logic for generating random data is created using the faker.js library. The function that returns an object containing randomly generated user data is located in cypress/support/data.js.

End-to-end tests are located in the cypress/specs directory. It's necessary to create a `.env` file and place the mailsac.com API key in it, as demonstrated in the .env.example file. The Cypress configuration file is set up to load .env variables as Cypress.env variables."

## Install dependencies:

```bash
npm install
# or
pnpm install
```

## Available Scripts 🧪

```bash
npm run e2e-prod:chrome
npm run e2e-prod:edge
npm run e2e-prod:firefox

# or
pnpm run e2e-prod:chrome
pnpm run e2e-prod:edge
pnpm run e2e-prod:firefox
```

## Test Run Reports 📊

After running the tests, the `cypress-mochawesome-reporter` generates the `reports` folder with detailed HTML reports. These reports provide insights into test results, including passed, failed, and skipped tests, along with detailed logs and screenshots.
