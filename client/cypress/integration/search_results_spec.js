const deferred = require('../utils/deferred');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const datasourcesResponse = require('../fixtures/reportSuites.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');

describe.skip('Search Form Results Integration Tests', function() {
    describe('when Search button is clicked', function() {
        describe('it has search results', function() {
            beforeEach(function() {
                this.fetchSavedSearchDeferred = deferred();
                this.fetchSearchResultsDeferred = deferred();
                this.fetchReportSuitesDeferred = deferred();

                cy.visit('#/search', {
                    onBeforeLoad(win) {
                        cy.stub(win, 'fetch')
                            .withArgs('/portal/api/v1/users/self/annotations/aam-portal')
                            .as('fetchSavedSearch')
                            .returns(this.fetchSavedSearchDeferred.promise)
                            .withArgs('/portal/api/v1/signals/list')
                            .as('fetchSearchResults')
                            .returns(this.fetchSearchResultsDeferred.promise)
                            .withArgs('/portal/api/v1/report-suites')
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

        describe('it has no search result', function() {
            beforeEach(function() {
                this.fetchSavedSearchDeferred = deferred();
                this.fetchSearchResultsDeferred = deferred();
                this.fetchReportSuitesDeferred = deferred();

                cy.visit('#/search', {
                    onBeforeLoad(win) {
                        cy.stub(win, 'fetch')
                            .withArgs('/portal/api/v1/users/self/annotations/aam-portal')
                            .as('fetchSavedSearch')
                            .returns(this.fetchSavedSearchDeferred.promise)
                            .withArgs('/portal/api/signals/list')
                            .as('fetchSearchResults')
                            .returns(this.fetchSearchResultsDeferred.promise)
                            .withArgs('/portal/api/v1/report-suites')
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
                        return emptySearchResultsResponse;
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
