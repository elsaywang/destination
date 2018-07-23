const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');
const emptySavedSearchResponse = require('../fixtures/emptySavedSearch.json');
const newSavedSearchResponse = require('../fixtures/newSavedSearch.json');

describe('Dashboard Integration Tests', function() {
    beforeEach(function() {
        cy.server();
        cy.route(
            '/portal/api/v1/users/self/annotations/aam-portal',
            savedSearchResponse.savedSearch,
        ).as('fetchSavedSearch');
        cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
            'fetchSearchResults',
        );
        cy.visit('/');
    });

    it("requests user's saved searches", function() {
        cy.wait('@fetchSavedSearch')
            .its('status')
            .should('eq', 200);
    });

    it("requests user's saved searches result list", function() {
        cy.wait('@fetchSearchResults')
            .its('status')
            .should('eq', 200);
    });

    it('should navigate user to dashboard after clicking Signals on top nav', function() {
        cy.title().should('contain', 'Signals');
    });

    describe('Preset saved searches', () => {
        beforeEach(function() {
            cy.scrollTo('bottom');
        });

        it('should render first when user-defined saved searches exist with `includeInDashboard` is set to true', () => {
            cy.get('[data-test="saved-search-dashboard"]')
                .should('exist')
                .should('have.length', 4);
            const userDefinedVisibleSavedSearchOne = 'Angus Koss V';
            const userDefinedVisibleSavedSearchTwo = 'Demarco Stiedemann';
            const firstPresetHeading = 'Top Unused Signals';
            const secondPresetHeading = 'New Unused Signals';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', firstPresetHeading);

                    cy.get('[data-test="signals-table"]').as('firstPresetSavedSearchTable');
                    cy.get('@firstPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', secondPresetHeading);
                    cy.get('[data-test="signals-table"]').as('secondPresetSavedSearchTable');
                    cy.get('@secondPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(2)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', userDefinedVisibleSavedSearchOne);

                    cy.get('[data-test="signals-table"]').as(
                        'firstUserDefinedVisibleSavedSearchTable',
                    );
                    cy.get('@firstUserDefinedVisibleSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });
            cy.get('[data-test=saved-search-dashboard]')
                .eq(3)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', userDefinedVisibleSavedSearchTwo);

                    cy.get('[data-test="signals-table"]').as(
                        'secondUserDefinedVisibleSavedSearchTable',
                    );
                    cy.get('@secondUserDefinedVisibleSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });
        });

        it('should render when no user-defined saved searches exist', () => {
            const firstPresetHeading = 'Top Unused Signals';
            const secondPresetHeading = 'New Unused Signals';
            cy.route(
                '/portal/api/v1/users/self/annotations/aam-portal',
                emptySavedSearchResponse.savedSearch,
            ).as('fetchEmptySavedSearch');
            cy.reload();

            cy.wait('@fetchEmptySavedSearch');

            cy.get('[data-test="saved-search-dashboard"]')
                .should('exist')
                .should('have.length', 2);

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', firstPresetHeading);

                    cy.get('[data-test="signals-table"]').as('firstPresetSavedSearchTable');
                    cy.get('@firstPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', secondPresetHeading);
                    cy.get('[data-test="signals-table"]').as('secondPresetSavedSearchTable');
                    cy.get('@secondPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });
        });

        it('clicking "View All" for "Top Unused Signals" should populate form correctly and call correct search', () => {
            const buttonLabel = 'View All';
            const currentClickedTagLabel = 'Top Unused Signals';

            cy.get('[data-test=saved-search-dashboard]:first').within(() => {
                cy.get('.spectrum-Button.spectrum-Button--primary').as('firstViewAllButton');
                cy.get('@firstViewAllButton')
                    .should('exist')
                    .should('have.text', buttonLabel);
                cy.get('@firstViewAllButton').click();
            });

            cy.url().should('match', /\#\/search/);
            cy.get('@fetchSearchResults')
                .its('status')
                .should('eq', 200);

            cy.get('[data-saved-search-preset="top-unused-signals"]').as('topUnusedSignalsTag');
            cy.get('@topUnusedSignalsTag').should('be.visible');
            cy.get('#isCurrentSearch')
                .should('exist')
                .should('have.text', currentClickedTagLabel);
            cy.get('[data-test="key-search-field"]')
                .should('be.visible')
                .should('have.value', '');
            cy.get('[data-test="operator"]').should('have.value', '==');
            cy.get('[data-test="value-search"]').should('have.value', '');
            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="signal-status"]').should('have.value', 'UNUSED');
            cy.get('[data-test="view-records"]').should('have.value', '7D');
            cy.get('[data-test="min-counts"]').should('have.value', '1000');
        });

        it('clicking "View All" for "New Unused Signals" should populate form correctly and call correct search, including `filterNewSignals: true`', () => {
            const buttonLabel = 'View All';
            const currentClickedTagLabel = 'New Unused Signals';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('secondViewAllButton');
                    cy.get('@secondViewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                    cy.get('@secondViewAllButton').click();
                });

            cy.url().should('match', /\/#\/search/);
            cy.get('@fetchSearchResults')
                .its('status')
                .should('eq', 200);

            cy.get('[data-saved-search-preset="new-unused-signals"]').as('newUnusedSignalsTag');
            cy.get('@newUnusedSignalsTag').should('be.visible');
            cy.get('#isCurrentSearch')
                .should('exist')
                .should('have.text', currentClickedTagLabel);
            cy.get('[data-test="key-search-field"]')
                .should('be.visible')
                .should('have.value', '');
            cy.get('[data-test="operator"]').should('have.value', '==');
            cy.get('[data-test="value-search"]').should('have.value', '');
            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="signal-status"]').should('have.value', 'UNUSED');
            cy.get('[data-test="view-records"]').should('have.value', '7D');
            cy.get('[data-test="min-counts"]').should('have.value', '1000');

            cy.getRequestParams('@fetchSearchResults').then(({ filterNewSignals }) => {
                expect(filterNewSignals).to.equal(true);
            });
        });
    });
});
