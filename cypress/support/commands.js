// Get OTP email message using Mailsac service, extract url and navigate to it to complete signup process
Cypress.Commands.add('handleMagicLink', (email, attempts = 3) => {
    if (attempts === 0) {
        throw new Error('Inbox is empty');
    }
    // Wait email to be sent
    cy.wait(3000);
    cy.request({
        url: `${Cypress.env('mailsacApiBaseUrl')}/addresses/${email}/messages`,
        method: 'GET',
        headers: {
            'Mailsac-Key': Cypress.env('MAILSAC_API_KEY')
        }
    }).then((response) => {
        assert.equal(response.status, 200);
        if (response.body.length !== 0) {
            const signupLink = response.body[0].links[0];
            cy.visit(signupLink);
        } else {
            cy.handleMagicLink(email, attempts - 1);
        }
    });
});

// Get OTP email message using Mailsac service and extract one-time-code
Cypress.Commands.add('extractOneTimeCode', (email, attempts = 3) => {
    if (attempts === 0) {
        throw new Error('Inbox is empty');
    }
    // Wait for the email to be sent, then make the request to fetch messages
    cy.wait(3000);

    return cy
        .request({
            url: `${Cypress.env('mailsacApiBaseUrl')}/addresses/${email}/messages`,
            method: 'GET',
            headers: {
                'Mailsac-Key': Cypress.env('MAILSAC_API_KEY')
            }
        })
        .then((response) => {
            // Ensure the response status is 200
            assert.equal(response.status, 200);
            if (response.body.length !== 0) {
                // Extract a code from the email message
                const code = response.body[0].subject.split(' ')[0];
                return code;
            } else {
                cy.extractOneTimeCode(email, attempts - 1);
            }
        });
});
