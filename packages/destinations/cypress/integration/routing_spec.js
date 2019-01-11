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
            cy.visit('/');
        });

        it('url should redirect to destinations by default', () => {
            cy.url().should('match', /destinations/);
        });

        it('should be the dashboard page with Destinations title', () => {
            cy.title().should('contain', 'Destinations');
        });

        it('should contain the Destinations Head and the button for Create Destination', () => {
            cy.get('.spectrum-Heading')
                .contains('Destinations')
                .should('be.exist');
            cy.get('.creat-destination-dropdown')
                .contains('Create Destination')
                .should('be.exist');
        });
        it('should contain peopel-based-destions including sideNav filter,search, and table', () => {
            cy.get('[data-test="people-based-destinations"]').as('peopleBasedDestinations');
            cy.get('@peopleBasedDestinations').should('be.exist');
            // Verify - sideNav filter,search, and table
            cy.get('@peopleBasedDestinations').within(el => {
                cy.get('.spectrum-Search').should('be.exist');
                cy.get('.spectrum-Table').should('be.exist');
            });
        });

        it('should contain valid navigation tabs', () => {
            routes.map(({ route, name }) => cy.contains(name).should('be.exist'));
        });

        it('only the People-Based navigation tab should be clicked', () => {
            cy.get('.spectrum-Tabs-item.is-selected [data-test="people-based-nav-link"]').as(
                'selectedNavTab',
            );
            cy.get('@selectedNavTab')
                .contains('People-Based')
                .should('be.exist');

            routes
                .filter(({ name }) => name !== 'People-Based')
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
            cy.visit('/');
        });

        it('should route to all the correct urls and TabLinks ', () => {
            routes.map(({ route, name }) => {
                const routeSelector = `${name.toLowerCase()}-nav-link`;
                const currentDataTest = '[data-test="' + routeSelector + '"]';

                cy.get(currentDataTest)
                    .click()
                    .then(() => {
                        const regRoute = new RegExp(`${route}`);
                        cy.url().should('match', regRoute);
                    });

                cy.get(`.spectrum-Tabs-item.is-selected ${currentDataTest}`).as('selectedNavTab');
                cy.get('@selectedNavTab')
                    .contains(name)
                    .should('be.exist');
            });
        });
    });

    describe('when click on the configuration button links ', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('should route to Configration page with correct url', () => {
            cy.get('.configuration-button .spectrum-Button').as('configurationButton');

            cy.get('[data-test="configuration-button-link"]')
                .contains('Configuration')
                .should('be.exist');

            cy.get('@configurationButton')
                .click()
                .then(() => {
                    cy.url().should('match', /configuration/);
                    cy.get('.spectrum-Heading')
                        .contains('Configuration')
                        .should('be.exist');
                });
        });
    });
});
