const routes = require('../fixtures/tabNavRoutes.json');

describe('Integration Tests for routing', function() {
    it('should check the ability for routing in the UI', function(done) {
        cy.on('uncaught:exception', err => {
            expect(err.message).to.include('.props.onClick is not a function');

            // using mocha's async done callback to finish
            // this test so we prove that an uncaught exception
            // was thrown
            done();

            // return false to prevent the error from
            // failing this test
            return false;
        });
        done();
    });

    describe('when routing to Destinations Dashboard (home) URL', () => {
        beforeEach(() => {
            cy.visit('/portal/destinations/');
        });

        xit('url should redirect to destinations by default', () => {
            cy.url().should('match', /\/portal\/destinations/);
        });

        it('should be the dashboard page with Destinations title', () => {
            cy.title().should('contain', 'Destinations');
        });

        it('should contain the Destinations Head and the button for Create Destination and the search bar', () => {
            cy.get('.spectrum-Heading')
                .contains('Destinations')
                .should('be.exist');
            cy.get('.creat-destination-button')
                .contains('Create Destination')
                .should('be.exist');
            cy.get('#destinations-search')
                .should('have.attr', 'placeholder', 'Search')
                .should('be.exist');
        });

        it('should contain all-destinations table list', () => {
            cy.get('[data-test="all-destinations"]').should('be.exist');
        });

        it('should contain valid navigation tabs', () => {
            routes.map(({ route, name }) => cy.contains(name).should('be.exist'));
        });

        it('only the all-destinations navigation tab should be clicked', () => {
            cy.get('.spectrum-Tabs-item.is-selected [data-test="all-nav-link"]').as(
                'selectedNavTab',
            );
            cy.get('@selectedNavTab')
                .contains('All')
                .should('be.exist');

            routes
                .filter(({ name }) => name !== 'All')
                .map(({ route, name }) =>
                    cy
                        .get('.spectrum-Tabs-item.is-selected')
                        .contains(name)
                        .should('not.exist'),
                );
        });
    });

    describe('when click different tab links ', () => {
        beforeEach(() => {
            cy.visit('/portal/destinations/');
        });

        it('should route to all the correct urls and TabLinks ', () => {
            routes.map(({ route, name }) => {
                const routeSelector = `${name.toLowerCase().replace(/\W/g, '-')}-nav-link`;
                const currentDataTest = '[data-test="' + routeSelector + '"]';

                cy.get(currentDataTest)
                    .click()
                    .then(() => {
                        cy.url().should('match', new RegExp(`${route}`));
                    });

                cy.get(`.spectrum-Tabs-item.is-selected ${currentDataTest}`).as('selectedNavTab');
                cy.get('@selectedNavTab')
                    .contains(name)
                    .should('be.exist');
            });
        });

        it('after click the `Integrated Platforms` tab,should contain side nav filter and Integrated Platforms list view', () => {
            cy.get('[data-test="integrated-platforms-nav-link"]')
                .click()
                .then(() => {
                    cy.url().should('match', /destinations\/integratedPlatforms/);
                    cy.get('[data-test="side-nav-filter"]').should('be.exist');
                    ['integrated-platforms', 'people-based', 'device-based'].map(type => {
                        const currentDataTest = '[data-test="' + type + '-type-filter"]';
                        cy.get(currentDataTest).should('be.exist');
                    });
                });
        });
    });

    describe('when click on the configuration button links ', () => {
        beforeEach(() => {
            cy.visit('/portal/destinations/');
        });

        it('should route to Configration page with correct url', () => {
            cy.get('.configuration-button .spectrum-Button').as('configurationButton');

            cy.get('[data-test="configuration-button-link"]')
                .contains('Integrated Accounts')
                .should('be.exist');

            cy.get('@configurationButton')
                .click()
                .then(() => {
                    cy.url().should('match', /\/administration\/integrated-accounts/g);
                    cy.get('.spectrum-Heading')
                        .contains('Integrated Accounts')
                        .should('be.exist');
                });
        });
    });
});
