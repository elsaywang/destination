const savedSearchResponse = require('../fixtures/savedSearch.json');
const searchResultsResponse = require('../fixtures/searchResults.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');
const emptySavedSearchResponse = require('../fixtures/emptySavedSearch.json');
const maxSavedSearchResponse = require('../fixtures/maxSavedSearch.json');

describe('Dashboard Integration Tests', () => {
    describe('Preset saved searches', () => {
        beforeEach(() => {
            cy.server();
            cy.route('GET', '/portal/api/v1/users/self/annotations/aam-portal', savedSearchResponse.savedSearch)
                .as('fetchSavedSearch');

            cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse)
                .as('fetchSearchResults');
            cy.visit('/');
            // cy.scrollTo('bottom');
        });

        it("requests user's saved searches", () => {
            cy.wait('@fetchSavedSearch')
                .its('status')
                .should('eq', 200);
        });

        it("requests user's saved searches result list", () => {
            cy.wait('@fetchSearchResults')
                .its('status')
                .should('eq', 200);
        });

        it('should render first when user-defined saved searches exist with `includeInDashboard` is set to true', () => {
            cy.get('[data-test="saved-search-dashboard"]')
                .should('exist')
                .should('have.length', 4);
            const userDefinedVisibleSavedSearchOne = 'Angus Koss V';
            const userDefinedVisibleSavedSearchTwo = 'Demarco Stiedemann';
            const firstPresetHeading = 'Top Unused Signals';
            const secondPresetHeading = 'New Unused Signals';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', firstPresetHeading);

                    cy.get('[data-test="signals-table"]').as('firstPresetSavedSearchTable');
                    cy.get('@firstPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', secondPresetHeading);
                    cy.get('[data-test="signals-table"]').as('secondPresetSavedSearchTable');
                    cy.get('@secondPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(2)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', userDefinedVisibleSavedSearchOne);

                    cy.get('[data-test="signals-table"]').as(
                        'firstUserDefinedVisibleSavedSearchTable',
                    );
                    cy.get('@firstUserDefinedVisibleSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });
            cy.get('[data-test=saved-search-dashboard]')
                .eq(3)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', userDefinedVisibleSavedSearchTwo);

                    cy.get('[data-test="signals-table"]').as(
                        'secondUserDefinedVisibleSavedSearchTable',
                    );
                    cy.get('@secondUserDefinedVisibleSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });
        });

        it('should render when no user-defined saved searches exist', () => {
            const firstPresetHeading = 'Top Unused Signals';
            const secondPresetHeading = 'New Unused Signals';
            cy.route('/portal/api/v1/users/self/annotations/aam-portal', emptySavedSearchResponse.savedSearch)
                .as('fetchEmptySavedSearch');
            cy.reload();
            // cy.wait('@fetchEmptySavedSearch');

            cy.get('[data-test="saved-search-dashboard"]')
                .should('exist')
                .should('have.length', 2);

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', firstPresetHeading);

                    cy.get('[data-test="signals-table"]').as('firstPresetSavedSearchTable');
                    cy.get('@firstPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', secondPresetHeading);
                    cy.get('[data-test="signals-table"]').as('secondPresetSavedSearchTable');
                    cy.get('@secondPresetSavedSearchTable')
                        .should('exist')
                        .should('have.length', 1);
                });
        });

        it('clicking "View All" for "Top Unused Signals" should populate form correctly and call correct search', () => {
            const buttonLabel = 'View All';
            const currentClickedTagLabel = 'Top Unused Signals';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                    cy.get('@viewAllButton').click();
                });

            cy.url().should('match', /\#\/search/);
            // cy.get('@fetchSearchResults')
            //     .its('status')
            //     .should('eq', 200);

            cy.get('[data-saved-search-preset="top-unused-signals"]').as('topUnusedSignalsTag');
            cy.get('@topUnusedSignalsTag').should('be.visible');
            cy.get('#isCurrentSearch')
                .should('exist')
                .should('have.text', currentClickedTagLabel);
            cy.get('[data-test="key-search-field"]')
                .should('be.visible')
                .should('have.value', '');
            cy.get('[data-test="operator"]').should('have.value', '==');
            cy.get('[data-test="value-search"]').should('have.value', '');
            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="signal-status"]').should('have.value', 'UNUSED');
            cy.get('[data-test="view-records"]').should('have.value', '7D');
            cy.get('[data-test="min-counts"]').should('have.value', '1000');
        });

        it('clicking "View All" for "New Unused Signals" should populate form correctly and call correct search, including `filterNewSignals: true`', () => {
            const buttonLabel = 'View All';
            const currentClickedTagLabel = 'New Unused Signals';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('secondViewAllButton');
                    cy.get('@secondViewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                    cy.get('@secondViewAllButton').click();
                });

            cy.url().should('match', /\/#\/search/);
            // cy.get('@fetchSearchResults')
            //     .its('status')
            //     .should('eq', 200);

            cy.get('[data-saved-search-preset="new-unused-signals"]').as('newUnusedSignalsTag');
            cy.get('@newUnusedSignalsTag').should('be.visible');
            cy.get('#isCurrentSearch')
                .should('exist')
                .should('have.text', currentClickedTagLabel);
            cy.get('[data-test="key-search-field"]')
                .should('be.visible')
                .should('have.value', '');
            cy.get('[data-test="operator"]').should('have.value', '==');
            cy.get('[data-test="value-search"]').should('have.value', '');
            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="signal-status"]').should('have.value', 'UNUSED');
            cy.get('[data-test="view-records"]').should('have.value', '7D');
            cy.get('[data-test="min-counts"]').should('have.value', '1000');
            // cy.getRequestParams('@fetchSearchResults').then(({ filterNewSignals }) => {
            //     expect(filterNewSignals).to.equal(true);
            // });
        });
    });
    describe('No saved search result', () => {
        beforeEach(() => {
            cy.server();
            cy.route('GET', '/portal/api/v1/users/self/annotations/aam-portal', emptySavedSearchResponse.savedSearch)
                .as('fetchEmptySavedSearch');
            cy.route('POST', '/portal/api/v1/signals/list', emptySearchResultsResponse)
                .as('fetchEmptySearchResults');
            cy.visit('/');
            // cy.scrollTo('bottom');
        });
        it("requests user's saved searches", () => {
            cy.wait('@fetchEmptySavedSearch')
                .its('status')
                .should('eq', 200);
        });

        it("requests user's saved searches result list", () => {
            cy.wait('@fetchEmptySearchResults')
                .its('status')
                .should('eq', 200);
        });

        it('should render 2 empty saved search tables when no user-defined saved searches exist ', () => {
            cy.get('[data-test="saved-search-dashboard"]')
                .should('exist')
                .should('have.length', 2);
            const firstPresetHeading = 'Top Unused Signals';
            const secondPresetHeading = 'New Unused Signals';
            const buttonLabel = 'View All';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', firstPresetHeading);

                    cy.get('[data-test="signals-table"]').should('not.exist');
                    cy.get('[data-test="empty"]')
                        .should('exist')
                        .should('have.length', 1);
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                });
            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', secondPresetHeading);

                    cy.get('[data-test="signals-table"]').should('not.exist');
                    cy.get('[data-test="empty"]')
                        .should('exist')
                        .should('have.length', 1);
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                });
        });

        it('should render 2 preset empty tables plus total of user-defined saved searches exist with `includeInDashboard` is set to true with empty results', () => {
            cy.route('GET', '/portal/api/v1/users/self/annotations/aam-portal', savedSearchResponse.savedSearch)
                .as('fetchSavedSearch');
            cy.reload();
            // cy.wait('@fetchSavedSearch');

            cy.get('[data-test="saved-search-dashboard"]')
                .should('exist')
                .should('have.length', 4);
            const userDefinedVisibleSavedSearchOne = 'Angus Koss V';
            const userDefinedVisibleSavedSearchTwo = 'Demarco Stiedemann';
            const firstPresetHeading = 'Top Unused Signals';
            const secondPresetHeading = 'New Unused Signals';
            const buttonLabel = 'View All';

            cy.get('[data-test=saved-search-dashboard]')
                .eq(0)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', firstPresetHeading);
                    cy.get('[data-test="signals-table"]').should('not.exist');
                    cy.get('[data-test="empty"]')
                        .should('exist')
                        .should('have.length', 1);
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(1)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', secondPresetHeading);
                    cy.get('[data-test="signals-table"]').should('not.exist');
                    cy.get('[data-test="empty"]')
                        .should('exist')
                        .should('have.length', 1);
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(2)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', userDefinedVisibleSavedSearchOne);

                    cy.get('[data-test="signals-table"]').should('not.exist');
                    cy.get('[data-test="empty"]')
                        .should('exist')
                        .should('have.length', 1);
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                });

            cy.get('[data-test=saved-search-dashboard]')
                .eq(3)
                .within(() => {
                    cy.get('.spectrum-Heading.spectrum-Heading--subtitle1')
                        .should('exist')
                        .should('have.text', userDefinedVisibleSavedSearchTwo);

                    cy.get('[data-test="signals-table"]').should('not.exist');
                    cy.get('[data-test="empty"]')
                        .should('exist')
                        .should('have.length', 1);
                    cy.get('.spectrum-Button.spectrum-Button--primary').as('viewAllButton');
                    cy.get('@viewAllButton')
                        .should('exist')
                        .should('have.text', buttonLabel);
                });
        });
    });

    describe('Max saved searches by lazy loading', () => {
        beforeEach(() => {
            cy.server();
            cy.route('/portal/api/v1/users/self/annotations/aam-portal', maxSavedSearchResponse.savedSearch)
                .as('fetchMaxSavedSearch');
            cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse)
                .as('fetchSearchResults');
            cy.visit('/');
        });

        it("requests user's saved searches", () => {
            cy.wait('@fetchMaxSavedSearch')
                .its('status')
                .should('eq', 200);
        });

        it("requests user's saved searches result list", () => {
            cy.wait('@fetchSearchResults')
                .its('status')
                .should('eq', 200);
        });

        it.skip('when scrolling to bottom, it should call load more tables till it hits the max allowance', () => {
            const maxTotalSavedSearches = maxSavedSearchResponse.savedSearch.length;

            // TODO: cy.wait(num) should be fixed as it's not best practice

            cy.scrollTo('bottom')
                .then(() => {
                    cy.wait(500);
                    cy.get('[data-test="saved-search-dashboard"]')
                        .should('exist')
                        .should('have.length', 4);
                })
                .then(() => {
                    cy.scrollTo('bottom');
                    cy.wait(500);
                })
                .then(() => {
                    cy.get('[data-test="saved-search-dashboard"]')
                        .should('exist')
                        .should('have.length', 6);
                })
                .then(() => {
                    cy.scrollTo('bottom');
                    cy.wait(500);
                })
                .then(() => {
                    cy.get('[data-test="saved-search-dashboard"]')
                        .should('exist')
                        .should('have.length', maxTotalSavedSearches);
                });
        });
    });
});
