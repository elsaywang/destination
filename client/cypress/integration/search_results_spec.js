const deferred = require('../utils/deferred');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const datasourcesResponse = require('../fixtures/reportSuites.json');

describe('when Search button is clicked', function() {
    beforeEach(function() {
        this.fetchSavedSearchDeferred = deferred();
        this.fetchSearchResultsDeferred = deferred();
        this.fetchReportSuitesDeferred = deferred();

        cy.visit('#/search', {
            onBeforeLoad(win) {
                cy
                    .stub(win, 'fetch')
                    .withArgs('/api/v1/users/self/annotations/aam-portal')
                    .as('fetchSavedSearch')
                    .returns(this.fetchSavedSearchDeferred.promise)
                    .withArgs('/api/signals/list')
                    .as('fetchSearchResults')
                    .returns(this.fetchSearchResultsDeferred.promise)
                    .withArgs('/api/v1/report-suites')
                    .as('fetchReportSuites')
                    .returns(this.fetchReportSuitesDeferred.promise);
            },
        });

        this.fetchSavedSearchDeferred.resolve({
            json() {
                return savedSearchResponse.savedSearch;
            },
            ok: true,
        });

        this.fetchSearchResultsDeferred.resolve({
            json() {
                return searchResultsResponse;
            },
            ok: true,
        });

        this.fetchReportSuitesDeferred.resolve({
            json() {
                return datasourcesResponse.list;
            },
            ok: true,
        });
    });

    it('should render results table', function() {
        cy.get('[data-test="search-button"]').click();
        cy.get('[data-test="signals-table"]').should('have.length', 1);
    });
});
