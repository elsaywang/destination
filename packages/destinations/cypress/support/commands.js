// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getRequestParams', requestAlias =>
    cy.get(requestAlias).then($xhr => $xhr.request.body),
);

// Until 'fetch' can be properly mocked, remove `fetch` to force tests to executes XHRs.
Cypress.on('window:before:load', win => {
    win.fetch = null;
});

Cypress.Commands.add('seedAndLoadIntegratedAccountsPage', (authentications = 'fixture:authentications') => {
    cy.server();
    // Stub out API after it's integrated
    // cy.route('GET', '/api/v1/destinations', authentications).as('load')
    cy.visit('portal/administration/integrated-accounts')
    // cy.wait('@load')
})

Cypress.Commands.add('seedAndLoadDestinationPage', (destinations = 'fixture:destinations') => {
    cy.server();
    cy.route('GET', '**/api/**', destinations).as('load')
    cy.visit('/portal/destinations')
    cy.wait('@load')
})
