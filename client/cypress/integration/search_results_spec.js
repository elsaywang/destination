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
        describe('it has search results', function() {
            it('should render results table', function() {
                cy.get('[data-test="search-button"]').click();
                cy.get('[data-test="signals-table"]').should('have.length', 1);
            });
        });

        describe('it has no search result', function() {
            beforeEach(function() {
                cy.get('@fetchSearchResults').then(function($stub) {
                    $stub
                        .as('fetchEmptySearchResults')
                        .returns(mockResponse(emptySearchResultsResponse));
                });
            });

            it('should not render results table', function() {
                cy.get('[data-test="search-button"]').click();
                cy.get('[data-test="signals-table"]').should('have.length', 0);
            });

            it('should render empty with no results found image', function() {
                cy.get('[data-test="search-button"]').click();
                cy.get('[data-test="empty"]').should('exist');
                cy.get('[data-test="no-result-found"]').should('exist');
            });
        });
    });
});
