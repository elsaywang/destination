const deferred = require('../utils/deferred');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');

describe('Saved Search Integration Test', function() {
    beforeEach(function() {
        this.fetchSavedSearchDeferred = deferred();
        this.fetchSearchResultsDeferred = deferred();

        cy.visit('#/search', {
            onBeforeLoad(win) {
                cy
                    .stub(win, 'fetch')
                    .withArgs('/api/v1/users/self/annotations/aam-portal')
                    .as('fetchSavedSearch')
                    .returns(this.fetchSavedSearchDeferred.promise)
                    .withArgs('/api/signals/list')
                    .as('fetchSearchResults')
                    .returns(this.fetchSearchResultsDeferred.promise);
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
    });

    it("should show user's saved search", function() {
        cy.get('[data-test="saved-search"]').should('exist');
        cy.get('[data-test="saved-search-tag"]:first').should(function($tag) {
            expect($tag.text()).to.eq(savedSearchResponse.savedSearch[0].name);
        });
    });

    describe('when a Saved Search tag is clicked', function() {
        it('should show a highlighted tag for the saved search that was clicked and a delete button', function() {
            cy.get('[data-test="saved-search-delete-button"]').should('not.exist');
            cy.get('[data-test="saved-search-tag"]:first').click();
            cy.get('#isCurrentSearch').should('exist');
            cy.get('[data-test="saved-search-delete-button"]').should('exist');
        });

        it('should pre-fill the key-value pair fields', function() {
            cy.get('[data-test="saved-search-tag"]:first').click();
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

        it('should execute the saved search and show results', function() {
            cy.get('[data-test="saved-search-tag"]:first').click();
            cy.get('[data-test="signals-table"]').should('have.length', 1);
        });

        describe('when the delete button next to it is clicked', function() {
            it("should remove that saved search from user's saved search", function() {
                cy.get('[data-test="saved-search-tag"]:first').click();
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

    describe('when search is executed', function() {
        beforeEach(function() {
            cy.get('[data-test="saved-search-tag"]:first').click();
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
    });
});
