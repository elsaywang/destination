const mockResponse = require('../utils/mockResponse');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const reportSuitesResponse = require('../fixtures/reportSuites.json');

describe('Saved Search Integration Test', function() {
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
                    .returns(mockResponse(reportSuitesResponse.list));
            },
        });
    });
    it("requests user's saved searches", function() {
        cy
            .window()
            .its('fetch')
            .should('be.calledWith', '/portal/api/v1/users/self/annotations/aam-portal');
    });

    it("should show user's saved searches, with no delete buttons visible", function() {
        cy.get('[data-test="saved-search"]').should('exist');
        cy.get('[data-test="saved-search-tag"]:first').should(function($tag) {
            expect($tag.text()).to.eq(savedSearchResponse.savedSearch[0].name);
        });
        cy.get('[data-test="saved-search-delete-button"]').should('have.length', 0);
    });

    describe('when a Saved Search tag is clicked', function() {
        beforeEach(function() {
            cy.get('[data-test="saved-search-tag"]:first').click();
        });

        it('should execute the saved search and show results', function() {
            cy.get('[data-test="signals-table"]').should('have.length', 1);
        });

        it('should show a highlighted tag for the saved search that was clicked and a delete button', function() {
            cy.get('#isCurrentSearch').should('exist');
            cy.get('[data-test="saved-search-delete-button"]').should('exist');
        });

        it('should pre-fill Key-Value Pair fields', function() {
            cy
                .get('[data-test="key-value-pair"]')
                .should('have.length', savedSearchResponse.savedSearch[0].keyValuePairs.length);

            cy.get('[data-test="key-search-field"]:first').should(function($value) {
                expect($value.val()).to.eq(savedSearchResponse.savedSearch[0].keyValuePairs[0].key);
            });

            cy.get('[data-test="value-search"]:first').should(function($value) {
                expect($value.val()).to.eq(
                    String(savedSearchResponse.savedSearch[0].keyValuePairs[0].value),
                );
            });
        });

        // TODO: why is this breaking on build only...
        it.skip('should pre-fill Advanced Search fields', function() {
            cy.get('.advanced-search-toggle').should(function($value) {
                expect($value.val()).to.eq(savedSearchResponse.savedSearch[0].advanced);
            });

            cy.get('[data-test="advanced-search-filter"]').should(function($value) {
                expect($value.val()).to.eq(savedSearchResponse.savedSearch[0].source.name);
            });
        });

        it('should pre-fill Signal Status field', function() {
            const signalStatus = savedSearchResponse.savedSearch[0].signalStatus;

            cy.get('.signal-status').should(function($value) {
                expect($value.text()).to.include(
                    signalStatus.slice(0, 1) + signalStatus.slice(1).toLowerCase(),
                );
            });
        });

        it('should pre-fill View Records For fields', function() {
            cy.get('[data-test="view-records"]').should(function($value) {
                expect($value.val()).to.eq(savedSearchResponse.savedSearch[0].viewRecordsFor);
            });
        });

        it('should pre-fill Minimum Counts field', function() {
            cy.get('[data-test="min-counts"]').should(function($value) {
                expect($value.val()).to.eq(
                    String(savedSearchResponse.savedSearch[0].minEventFires),
                );
            });
        });

        it('should show "Save This Search" button', function() {
            cy.get('[data-test="save-this-search-button"]').should('be.visible');
        });

        describe('when "Save This Search" button is clicked', function() {
            beforeEach(function() {
                cy.get('[data-test="save-this-search-button"]').click();
            });

            it('should show a modal to allow user to save current search', function() {
                cy.get('[data-test="save-this-search-dialog-content"]').should('have.length', 1);
            });

            describe('when user fills out fields in modal, and clicks "Cancel" button', function() {
                it('should reset the modal', function() {
                    const searchName = 'Test1234';

                    cy.get('[data-test="save-this-search-dialog-content"]').within(() => {
                        cy.get('[data-test="save-this-search-name-field"]').type(searchName);
                    });

                    cy
                        .get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--secondary')
                        .click();
                    cy.get('[data-test="save-this-search-button"]').click();
                    cy.get('[data-test="save-this-search-name-field"]').should('be.empty');
                });
            });

            // TODO: add more fields to add values, pending AAM-36729
            describe('when user fills out fields in modal, and clicks "Save" button', function() {
                it("should save the user's current search", function() {
                    const searchName = 'Test1234';

                    cy.get('[data-test="save-this-search-dialog-content"]').within(() => {
                        cy.get('[data-test="save-this-search-name-field"]').type(searchName);
                    });

                    cy
                        .get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--primary')
                        .click();

                    cy
                        .get('[data-test="saved-search-tag"]')
                        .contains(searchName)
                        .should('exist');

                    cy
                        .get('[data-test="saved-search-tag"]')
                        .contains(searchName)
                        .trigger('mouseover');
                    cy.get('[data-test="saved-search-overlay-trigger"]').contains(searchName);
                });
            });
        });

        describe('when the delete button next to it is clicked', function() {
            it("should remove that saved search from user's saved search", function() {
                cy.get('#isCurrentSearch ~ button').click();

                cy
                    .get('[data-test="saved-search-tag"]')
                    .should('have.length', savedSearchResponse.savedSearch.length - 1);

                cy
                    .get('[data-test="saved-search-tag"]:first')
                    .should('not.have.text', savedSearchResponse.savedSearch[0].name);
            });
        });
    });

    describe('when a Saved Search tag is hovered over', function() {
        it('should trigger a popover', function() {
            cy.get('[data-test="saved-search-tag"]:first').trigger('mouseover');
            cy.get('[data-test="saved-search-overlay-trigger"]').should('have.length', 1);
        });
    });
});
