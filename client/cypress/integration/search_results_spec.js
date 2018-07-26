const searchResultsResponse = require('../fixtures/searchResults.json');
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

    describe('when Search button is clicked', function() {
        // it('should show loading spinner', function() {
        //     cy.reload(true);
        //     cy.get('[data-test="search-button"]').click();

        //     cy.get('.spectrum-Loader').should('exist');
        // });

        describe('when search results exist', function() {
            it('should render results table', function() {
                cy.get('[data-test="search-button"]').click();

                cy.get('[data-test="signals-table"]').should('exist');
                cy.get('[data-test="empty"]').should('not.exist');
            });
        });

        describe('when no search results exist', function() {
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
                cy.get('[data-test="signals-table"]').should('not.exist');
            });
        });
    });

    describe('before Search button is clicked', function() {
        it('should show empty state with start exploring image', function() {
            cy.get('[data-test="empty"]').should('exist');
            cy.get('[data-test="start-exploring"]').should('exist');
            cy.get('[data-test="signals-table"]').should('not.exist');
        });
    });
});
