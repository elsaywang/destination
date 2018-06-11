const savedSearchResponse = require('../fixtures/savedSearch.json');
const newSavedSearchResponse = require('../fixtures/newSavedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');

describe('Saved Search Integration Test', function() {
    beforeEach(function() {
        cy.server();
        cy
            .route(
                '/portal/api/v1/users/self/annotations/aam-portal',
                savedSearchResponse.savedSearch,
            )
            .as('fetchSavedSearch');
        cy
            .route('POST', '/portal/api/v1/signals/list', searchResultsResponse)
            .as('fetchSearchResults');

        cy.visit('#/search');
    });
    it("requests user's saved searches", function() {
        cy
            .wait('@fetchSavedSearch')
            .its('status')
            .should('eq', 200);
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

        it('should pre-fill Advanced Search fields', function() {
            cy.get('[data-test="advanced-search-toggle"]').should('be.checked');

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
                beforeEach(function() {
                    const mockResponseAfterCreate = savedSearchResponse.savedSearch.concat(
                        newSavedSearchResponse,
                    );

                    cy
                        .route(
                            'PUT',
                            '/portal/api/v1/users/self/annotations/aam-portal',
                            mockResponseAfterCreate,
                        )
                        .as('fetchSavedSearchAfterCreate');
                });

                it("should save the user's current search", function() {
                    const searchName = 'Test1234';

                    cy.get('[data-test="save-this-search-dialog-content"]').within(() => {
                        cy.get('[data-test="save-this-search-name-field"]').type(searchName);
                    });

                    cy
                        .get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--primary')
                        .click();

                    cy.wait('@fetchSavedSearchAfterCreate');

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
                const mockResponseAfterDelete = savedSearchResponse.savedSearch.slice(1);

                cy
                    .route(
                        'PUT',
                        '/portal/api/v1/users/self/annotations/aam-portal',
                        mockResponseAfterDelete,
                    )
                    .as('fetchSavedSearchAfterDelete');

                cy.get('#isCurrentSearch ~ div > [data-test="saved-search-delete-button"]').click();

                cy
                    .get(
                        '[data-test="saved-search-delete-modal"] ~ .spectrum-Dialog-footer .spectrum-Button--warning',
                    )
                    .click();

                cy.wait('@fetchSavedSearchAfterDelete');

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

    describe.only('Preset saved searches', function() {
        it('should render first when user-defined saved searches exist', () => {});

        it('should render when no user-defined saved searches exist', () => {});

        it('should be "Top Unused Signals" and "New Unused Signals", in that order', () => {});

        it('clicking "Top Unused Signals" should populate form correctly and call correct search', () => {});

        it('clicking "New Unused Signals" should populate form correctly and call correct search, including `filterNewSignals: true`', () => {});

        it('should not be editable', () => {});

        it('should not be deletable', () => {});

        it('should not be included in the PUT call executed after saving a new search', () => {});

        it('should be counted toward the limit of max saved searches', () => {});
    });
});
