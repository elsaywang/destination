const mockResponse = require('../utils/mockResponse');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const datasourcesResponse = require('../fixtures/reportSuites.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');

describe('Search Form Results Integration Tests', function() {
    beforeEach(function() {
        cy.visit('#/search', {
            onBeforeLoad(win) {
                cy
                    .stub(win, 'fetch')
                    .withArgs('/portal/api/v1/users/self/annotations/aam-portal')
                    .as('fetchSavedSearch')
                    .returns(mockResponse(savedSearchResponse.savedSearch))
                    .withArgs('/portal/api/v1/signals/list')
                    .as('fetchSearchResults')
                    .returns(mockResponse(searchResultsResponse))
                    .withArgs('/portal/api/v1/report-suites')
                    .as('fetchReportSuites')
                    .returns(mockResponse(datasourcesResponse.list));
            },
        });
    });

    describe('when Search button is clicked', function() {
        describe('when search results exist', function() {
            it('should render results table', function() {
                cy.get('[data-test="search-button"]').click();

                cy.get('[data-test="signals-table"]').should('exist');
                cy.get('[data-test="empty"]').should('not.exist');
            });
        });

        describe('when no search results exist', function() {
            beforeEach(function() {
                cy.get('@fetchSearchResults').then(function($stub) {
                    $stub
                        .as('fetchEmptySearchResults')
                        .returns(mockResponse(emptySearchResultsResponse));
                });
            });

            it('should render empty state with no results found image', function() {
                cy.get('[data-test="search-button"]').click();

                cy.get('[data-test="empty"]').should('exist');
                cy.get('[data-test="no-result-found"]').should('exist');
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
