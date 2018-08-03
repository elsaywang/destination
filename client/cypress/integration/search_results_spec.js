const searchResultsResponse = require('../fixtures/searchResults.json');
const searchResultsWithMultiKvpResponse = require('../fixtures/searchResultsWithMultiKvp.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');
const errorResponse = require('../fixtures/error.json');

describe('Search Form Results Integration Tests', function() {
    beforeEach(function() {
        cy.server();
        cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
            'fetchSearchResults',
        );

        cy.visit('#/search');
    });

    describe('before Search button is clicked', function() {
        it('should show empty state with start exploring image', function() {
            cy.get('[data-test="empty"]').should('exist');
            cy.get('[data-test="start-exploring"]').should('exist');
            cy.get('[data-test="signals-table"]').should('not.exist');
        });
    });

    describe('when Search button is clicked', function() {
        // TODO: failing test on jenkins
        // search results does not clear for this test so
        // there is no way to see the loader here
        it.skip('should show loading spinner', function() {
            cy.get('[data-test="clear-all-button"]').click();
            cy.get('[data-test="search-button"]').click();

            cy.get('.spectrum-Loader').should('exist');
        });

        describe('when search results exist', function() {
            it('should render results table', function() {
                cy.get('[data-test="search-button"]').click();

                cy.get('[data-test="signals-table"]').should('exist');
                cy.get('[data-test="empty"]').should('not.exist');
                cy.get('.spectrum-Loader').should('not.exist');
            });
        });

        describe('when there are no search results', function() {
            beforeEach(function() {
                cy.route('POST', '/portal/api/v1/signals/list', emptySearchResultsResponse).as(
                    'fetchEmptySearchResults',
                );
            });

            it('should render empty state with no results found image', function() {
                cy.get('[data-test="search-button"]').click();

                cy.get('[data-test="empty"]').should('exist');
                cy.get('[data-test="no-result-found"]').should('exist');
                cy.get('[data-test="signals-table"]').should('not.exist');
                cy.get('.spectrum-Loader').should('not.exist');
            });
        });

        describe('when search fails on API error', function() {
            beforeEach(function() {
                cy.server({
                    status: errorResponse.status,
                });

                cy.route('POST', '/portal/api/v1/signals/list', errorResponse).as('searchFailed');
            });

            it('should show inline error message and not show any results', function() {
                cy.get('[data-test="search-button"]').click();
                cy.wait('@searchFailed');
                cy.get('[data-test="search-form"] [data-test="inline-error"]').as(
                    'badRequestError',
                );
                cy.get('@badRequestError')
                    .should('exist')
                    .should('have.text', errorResponse.statusText);
                cy.get('[data-test="error-fetching-data"]').should('exist');
                cy.get('[data-test="signals-table"]').should('not.exist');
                cy.get('.spectrum-Loader').should('not.exist');
            });
        });
    });

    describe('Search results with signals that contain multiple key-value pairs', () => {
        beforeEach(() => {
            cy.route('POST', '/portal/api/v1/signals/list', searchResultsWithMultiKvpResponse).as(
                'fetchSearchResultsWithMultiKvp',
            );
        });

        it('should render key-value pairs and their corresponding key names on separate lines', () => {
            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="search-button"]').click();
            cy.wait('@fetchSearchResultsWithMultiKvp');

            cy.get('[data-test="key-value-pair-0"]').should('have.text', 'browser=chrome mobile');
            cy.get('[data-test="key-value-pair-1"]').should('have.text', 'browsertype=xxx');

            cy.get('[data-test="key-name-0"]').should('have.text', 'Browser');
            cy.get('[data-test="key-name-1"]').should('have.text', 'Browser Type');
        });
    });
});
