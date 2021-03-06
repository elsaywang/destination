const savedSearchResponse = require('../fixtures/savedSearch.json');
const newSavedSearchResponse = require('../fixtures/newSavedSearch.json');
const newSavedSearchResponseWithDefaultName = require('../fixtures/newSavedSearchWithDefaultName.json');
const maxSavedSearchResponse = require('../fixtures/maxSavedSearch.json');
const emptySavedSearchResponse = require('../fixtures/emptySavedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const errorResponse = require('../fixtures/error.json');

describe('Saved Search Integration Test', () => {
    beforeEach(() => {
        cy.server();
        cy.route(
            '/portal/api/v1/users/self/annotations/aam-portal',
            savedSearchResponse.savedSearch,
        ).as('fetchSavedSearch');
        cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
            'fetchSearchResults',
        );

        cy.visit('#/search');
    });
    it("requests user's saved searches", () => {
        cy.wait('@fetchSavedSearch')
            .its('status')
            .should('eq', 200);
    });

    it('should show preset saved searches together with user-defined saved searches', () => {
        cy.get('[data-saved-search-preset]')
            .should('exist')
            .should('have.length', 2);

        cy.get('[data-saved-search-id]')
            .should('exist')
            .should('have.length', 5);

        cy.get('[data-saved-search-id]:first').should($tag => {
            expect($tag.text()).to.eq(savedSearchResponse.savedSearch[0].name);
        });

        cy.get('[data-test="saved-search-tag"]')
            .should('exist')
            .should('have.length', 7);
    });

    it('should not show a delete button', () => {
        cy.get('[data-test="saved-search-delete-button"]').should('have.length', 0);
    });

    describe('when a user-defined Saved Search tag is clicked', () => {
        beforeEach(() => {
            cy.get('[data-saved-search-id]:first').click();
        });

        it('should execute the saved search and show results', () => {
            cy.get('[data-test="signals-table"]').should('have.length', 1);
        });

        it('should show a highlighted tag for the saved search that was clicked and a delete button', () => {
            cy.get('#isCurrentSearch').should('exist');
            cy.get('[data-test="saved-search-delete-button"]').should('exist');
        });

        it('should pre-fill Key-Value Pair fields', () => {
            cy.get('[data-test="key-value-pair"]').should(
                'have.length',
                savedSearchResponse.savedSearch[0].keyValuePairs.length,
            );

            cy.get('[data-test="key-search-field"]:first').should($value => {
                expect($value.val()).to.eq(savedSearchResponse.savedSearch[0].keyValuePairs[0].key);
            });

            cy.get('[data-test="value-search"]:first').should($value => {
                expect($value.val()).to.eq(
                    String(savedSearchResponse.savedSearch[0].keyValuePairs[0].value),
                );
            });
        });

        it('should pre-fill Advanced Search fields', () => {
            cy.get('[data-test="advanced-search-toggle"]').should('be.checked');

            cy.get('[data-test="advanced-search-filter"]').should($value => {
                expect($value.val()).to.eq(savedSearchResponse.savedSearch[0].source.name);
            });
        });

        it('should pre-fill Signal Status field', () => {
            const signalStatus = savedSearchResponse.savedSearch[0].signalStatus;

            cy.get('.signal-status').should($value => {
                expect($value.text()).to.include(
                    signalStatus.slice(0, 1) + signalStatus.slice(1).toLowerCase(),
                );
            });
        });

        it('should pre-fill View Records For fields', () => {
            cy.get('[data-test="view-records"]').should(
                'have.attr',
                'value',
                savedSearchResponse.savedSearch[0].viewRecordsFor,
            );
        });

        it('should pre-fill Minimum Counts field', () => {
            cy.get('[data-test="min-counts"]').should($value => {
                expect($value.val()).to.eq(
                    String(savedSearchResponse.savedSearch[0].minEventFires),
                );
            });
        });

        it('should show "Save This Search" button', () => {
            cy.get('[data-test="save-this-search-button"]').should('be.visible');
        });

        describe('when the delete button next to it is clicked', () => {
            it("should remove that saved search from user's saved search", () => {
                const mockResponseAfterDelete = savedSearchResponse.savedSearch.slice(1);

                cy.route(
                    'PUT',
                    '/portal/api/v1/users/self/annotations/aam-portal',
                    mockResponseAfterDelete,
                ).as('deleteSavedSearch');

                cy.get('#isCurrentSearch ~ [data-test="saved-search-delete-button"]').click();

                cy.get(
                    '[data-test="saved-search-delete-modal"] ~ .spectrum-Dialog-footer .spectrum-Button--warning',
                ).click();

                cy.wait('@deleteSavedSearch');

                cy.get('[data-saved-search-id]').should(
                    'have.length',
                    savedSearchResponse.savedSearch.length - 1,
                );

                cy.get('[data-test="saved-search-tag"]:first').should(
                    'not.have.text',
                    savedSearchResponse.savedSearch[0].name,
                );
            });
        });
    });

    describe('when "Save This Search" button is clicked', () => {
        beforeEach(() => {
            cy.get('[data-test="search-button"]').click();
            cy.get('[data-test="save-this-search-button"]').click();
        });

        it('should show a modal to allow user to save current search', () => {
            cy.get('[data-test="save-this-search-dialog-content"]').should('have.length', 1);
        });

        describe('when user fills out fields in modal, and clicks "Cancel" button', () => {
            it('should reset the modal', () => {
                const searchName = 'Test1234';

                cy.get('[data-test="save-this-search-dialog-content"]').within(() => {
                    cy.get('[data-test="save-this-search-name-field"]').type(searchName);
                });

                cy.get(
                    '.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--secondary',
                ).click();
                cy.get('[data-test="save-this-search-button"]').click();
                cy.get('[data-test="save-this-search-name-field"]').should('be.empty');
            });
        });

        // TODO: add more fields to add values, pending AAM-36729
        describe('when user fills out all fields in modal, and clicks "Save" button', () => {
            beforeEach(() => {
                const mockResponseAfterCreate = savedSearchResponse.savedSearch.concat(
                    newSavedSearchResponse,
                );

                cy.route(
                    'PUT',
                    '/portal/api/v1/users/self/annotations/aam-portal',
                    mockResponseAfterCreate,
                ).as('createSavedSearch');
            });

            it("should save the user's current search with typed searchName", () => {
                const searchName = 'Test1234';

                cy.get('[data-test="save-this-search-dialog-content"]').within(() => {
                    cy.get('[data-test="save-this-search-name-field"]').type(searchName);
                    cy.get('[data-test="save-this-search-checkbox"]').check();
                });

                cy.get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--primary').click();

                cy.wait('@createSavedSearch');

                cy.wait(0).then(() => {
                    cy.get('[data-saved-search-id]')
                        .contains(searchName)
                        .should('exist')
                        .trigger('mouseover');
                    cy.get('[data-test="saved-search-overlay-trigger"]').contains(searchName);
                });
            });
        });

        describe('when user fills out only some of fields then clicks Save button', () => {
            beforeEach(() => {
                const mockResponseAfterCreate = savedSearchResponse.savedSearch.concat(
                    newSavedSearchResponseWithDefaultName,
                );

                cy.route(
                    'PUT',
                    '/portal/api/v1/users/self/annotations/aam-portal',
                    mockResponseAfterCreate,
                ).as('createSavedSearch');
            });

            it('should save the current search with default name formattedSignal when no input', () => {
                const defaultName = '""=""';

                cy.get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--primary').click();

                cy.wait('@createSavedSearch');

                cy.wait(0).then(() => {
                    cy.get('[data-saved-search-id]')
                        .contains(defaultName)
                        .should('exist')
                        .trigger('mouseover');
                    cy.get('[data-test="saved-search-overlay-trigger"]').contains(defaultName);
                });
            });
        });

        describe('when user fills out fields in modal then clicks Save button but failed to create', () => {
            beforeEach(() => {
                cy.server({
                    status: errorResponse.status,
                });

                cy.route(
                    'PUT',
                    '/portal/api/v1/users/self/annotations/aam-portal',
                    errorResponse,
                ).as('createSavedSearchFailed');
            });

            it("should not save the user's current search", () => {
                const searchName = 'Test1234';

                cy.get('[data-test="save-this-search-dialog-content"]').within(() => {
                    cy.get('[data-test="save-this-search-name-field"]').type(searchName);
                });

                cy.get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--primary').click();

                cy.wait('@createSavedSearchFailed');
                cy.get('[data-test="inline-error"]').as('saveSearchError');
                cy.get('@saveSearchError')
                    .should('exist')
                    .should('have.text', errorResponse.statusText);
                cy.get('[data-test="save-this-search-button"]').should('not.exist');
            });
        });
    });

    describe('when a Saved Search tag is hovered over', () => {
        it('should trigger a popover', () => {
            cy.get('[data-test="saved-search-tag"]:first').trigger('mouseover');
            cy.get('[data-test="saved-search-overlay-trigger"]').should('have.length', 1);
        });
    });

    describe('Preset saved searches', () => {
        beforeEach(() => {
            cy.get('[data-saved-search-preset="top-unused-signals"]').as('topUnusedSignalsTag');
            cy.get('[data-saved-search-preset="new-unused-signals"]').as('newUnusedSignalsTag');
        });

        it('should render first when user-defined saved searches exist', () => {
            cy.get('@topUnusedSignalsTag').should('be.visible');
            cy.get('@newUnusedSignalsTag').should('be.visible');

            cy.get('[data-test="saved-search-tag"]:first').should(
                'have.attr',
                'data-saved-search-preset',
                'top-unused-signals',
            );
            cy.get(
                '[data-test="saved-search-tag-list"] > span:nth-child(2) > [data-test="saved-search-tag"]',
            ).should('have.attr', 'data-saved-search-preset', 'new-unused-signals');
            cy.get(
                '[data-test="saved-search-tag-list"] > span:nth-child(3) > [data-test="saved-search-tag"]',
            ).should('have.text', savedSearchResponse.savedSearch[0].name);
        });

        it('should render when no user-defined saved searches exist', () => {
            cy.route(
                '/portal/api/v1/users/self/annotations/aam-portal',
                emptySavedSearchResponse.savedSearch,
            ).as('fetchEmptySavedSearch');
            cy.reload();

            cy.wait('@fetchEmptySavedSearch');

            cy.get('@topUnusedSignalsTag').should('be.visible');
            cy.get('@newUnusedSignalsTag').should('be.visible');
            cy.get('[data-test="saved-search-tag"]').should('have.length', 2);
        });

        it('should be "Top Unused Signals" and "New Unused Signals"', () => {
            cy.get('@topUnusedSignalsTag').should('have.text', 'Top Unused Signals');
            cy.get('@newUnusedSignalsTag').should('have.text', 'New Unused Signals');
        });

        it('"Top Unused Signals" popover should contain all correct search fields', () => {
            cy.get('@topUnusedSignalsTag').trigger('mouseover');
            cy.get('[data-test="saved-search-popover-name"]').should(
                'have.text',
                'Top Unused Signals',
            );
            cy.get('[data-test="saved-search-popover-search-query"]').should('have.text', '""==""');
            cy.get('[data-test="saved-search-popover-signal-category"]').should(
                'have.text',
                'Real-Time and Onboarded',
            );
            cy.get('[data-test="saved-search-popover-signal-type"]').should('not.be.visible');
            cy.get('[data-test="saved-search-popover-signal-source"]').should('not.be.visible');
            cy.get('[data-test="saved-search-popover-filter-new"]').should('not.be.visible');
            cy.get('[data-test="saved-search-popover-view-records-for"]').should(
                'have.text',
                'Last 7 Days',
            );
            cy.get('[data-test="saved-search-popover-sort-by"]').should(
                'have.text',
                'Total Counts',
            );
        });

        it('"New Unused Signals" popover should contain all correct search fields', () => {
            cy.get('@newUnusedSignalsTag').trigger('mouseover');
            cy.get('[data-test="saved-search-popover-name"]').should(
                'have.text',
                'New Unused Signals',
            );
            cy.get('[data-test="saved-search-popover-search-query"]').should('have.text', '""==""');
            cy.get('[data-test="saved-search-popover-signal-category"]').should(
                'have.text',
                'Real-Time and Onboarded',
            );
            cy.get('[data-test="saved-search-popover-signal-type"]').should('not.be.visible');
            cy.get('[data-test="saved-search-popover-signal-source"]').should('not.be.visible');
            cy.get('[data-test="saved-search-popover-filter-new"]').should('have.text', 'Yes');
            cy.get('[data-test="saved-search-popover-view-records-for"]').should(
                'have.text',
                'Last 7 Days',
            );
            cy.get('[data-test="saved-search-popover-sort-by"]').should(
                'have.text',
                'Total Counts',
            );
        });

        it('clicking "Top Unused Signals" should populate form correctly and call correct search', () => {
            cy.get('@topUnusedSignalsTag').click();
            cy.wait('@fetchSearchResults');
            cy.get('[data-test="key-search-field"]').should('have.attr', 'value', '');
            cy.get('[data-test="operator"]').should('have.attr', 'value', '==');
            cy.get('[data-test="value-search"]').should('have.attr', 'value', '');
            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="signal-status"]').should('have.attr', 'value', 'UNUSED');
            cy.get('[data-test="view-records"]').should('have.attr', 'value', '7D');
            cy.get('[data-test="min-counts"]').should('have.attr', 'value', '1000');

            cy.get('@fetchSearchResults')
                .its('status')
                .should('eq', 200);
        });

        it('clicking "New Unused Signals" should populate form correctly and call correct search, including `filterNewSignals: true`', () => {
            cy.get('@newUnusedSignalsTag').click();
            cy.wait('@fetchSearchResults');
            cy.get('[data-test="key-search-field"]').should('have.attr', 'value', '');
            cy.get('[data-test="operator"]').should('have.attr', 'value', '==');
            cy.get('[data-test="value-search"]').should('have.attr', 'value', '');
            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="signal-status"]').should('have.attr', 'value', 'UNUSED');
            cy.get('[data-test="view-records"]').should('have.attr', 'value', '7D');
            cy.get('[data-test="min-counts"]').should('have.attr', 'value', '1000');

            cy.get('@fetchSearchResults')
                .its('status')
                .should('eq', 200);
            cy.getRequestParams('@fetchSearchResults').then(({ filterNewSignals }) => {
                expect(filterNewSignals).to.equal(true);
            });
        });

        it('should not be deletable', () => {
            cy.get('@topUnusedSignalsTag').trigger('mouseover');
            cy.get('[data-test="saved-search-delete-button"]').should('not.exist');
            cy.get('@topUnusedSignalsTag').trigger('mouseout');

            cy.get('@newUnusedSignalsTag').trigger('mouseover');
            cy.get('[data-test="saved-search-delete-button"]').should('not.exist');
            cy.get('@newUnusedSignalsTag').trigger('mouseout');
        });

        it('should not be included in the PUT call executed after saving a new search', () => {
            cy.route(
                'PUT',
                '/portal/api/v1/users/self/annotations/aam-portal',
                savedSearchResponse.savedSearch,
            ).as('createSavedSearch');

            cy.get('[data-test="search-button"]').click();
            cy.get('[data-test="save-this-search-button"]').click();
            cy.get('[data-test="save-this-search-name-field"]').type('Test saved search');
            cy.get('.spectrum-Dialog-footer .spectrum-Button.spectrum-Button--primary').click();

            cy.getRequestParams('@createSavedSearch').then(savedSearchList => {
                expect(
                    savedSearchList.filter(savedSearch => savedSearch.presetId !== null).length,
                ).to.eq(0);
            });
        });

        it('should be counted toward the limit of max saved searches', () => {
            cy.route(
                '/portal/api/v1/users/self/annotations/aam-portal',
                maxSavedSearchResponse.savedSearch,
            ).as('fetchMaxSavedSearch');
            cy.reload();

            cy.get('[data-test="saved-search-tag"]').should('have.length', 10);

            cy.get('[data-test="search-button"]').click();

            cy.get('[data-test="save-this-search-button-overlay-trigger"]').within(() => {
                cy.get('button').trigger('mouseover', { force: true });
            });

            cy.get('[data-test="saved-search-limit-message"]').should(
                'have.text',
                'Saved Search limit (10) reached.',
            );
        });
    });
});
