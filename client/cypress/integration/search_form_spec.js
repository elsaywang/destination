const searchResultsResponse = require('../fixtures/searchResults.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const reportSuitesResponse = require('../fixtures/reportSuites.json');
const signalKeysResponse = require('../fixtures/signalKeys.json');
const signalKeysExternalServiceUnavailableResponse = require('../fixtures/signalKeysWithExternalServiceUnavailable.json');

describe('Search Form Integration Tests', function() {
    beforeEach(function() {
        cy.clock(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)

        cy.server();
        cy.route(
            '/portal/api/v1/users/self/annotations/aam-portal',
            savedSearchResponse.savedSearch,
        ).as('fetchSavedSearch');
        cy.route('POST', '/portal/api/v1/signals/list', emptySearchResultsResponse).as(
            'fetchSearchResults',
        );
        cy.route('/portal/api/v1/report-suites', reportSuitesResponse.list).as('fetchReportSuites');

        cy.visit('#/search');
    });

    afterEach(function() {
        cy.clock().then(function(clock) {
            clock.restore();
        });
    });

    it('should show search form when navigating with URL', function() {
        cy.get('[data-test="search-form"]').should('exist');
    });

    describe('when Advanced toggle is clicked', function() {
        beforeEach(function() {
            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="advanced-search-filter"]').as('advancedFilter');
            cy.wait('@fetchReportSuites');
        });

        it('should enable filter to filter by user-friendly key names', function() {
            cy.get('@advancedFilter').should('be.enabled');
        });

        it('should allow you to type a report suite name and press enter on list of suggestions', function() {
            cy.get('@advancedFilter')
                .type('te{enter}')
                .then(function($text) {
                    cy.get('@advancedFilter').should(function($filter) {
                        expect($filter.val()).to.contains($text.val());
                    });
                });
        });

        it('should allow you to select a report suite through drop down when you click on the dropdown button', function() {
            cy.get('@advancedFilter')
                .siblings('button')
                .click()
                .then(function($text) {
                    cy.get('@advancedFilter').should(function($filter) {
                        expect($filter.val()).to.contains($text.text());
                    });
                });
        });
    });

    describe('when typing in text in Key input with external services available', function() {
        beforeEach(function() {
            cy.route(/\/portal\/api\/v1\/signals\/keys\?search=.+&total=8/, signalKeysResponse).as(
                'fetchSignalKeys',
            );

            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a');
            cy.wait('@fetchSignalKeys');
        });

        it('should show autocomplete with suggestions', function() {
            cy.get('.spectrum-Popover.is-open').should('have.length', 1);
            cy.get('.spectrum-SelectList-item').should('have.length', 8);
        });

        describe('when an option is clicked', function() {
            it('should have the same key value as clicked option', function() {
                cy.get('.spectrum-Popover.is-open .spectrum-SelectList-item.is-focused')
                    .click()
                    .then(function($item) {
                        cy.get('@keyInput').should(function($keyInput) {
                            expect($keyInput.val()).to.contains($item.text());
                        });
                    });
            });
        });
    });

    describe('when typing in text in Key input with external services unavailable', function() {
        beforeEach(function() {
            cy.route(
                /\/portal\/api\/v1\/signals\/keys\?search=.+&total=8/,
                signalKeysExternalServiceUnavailableResponse,
            ).as('signalKeysExternalServiceUnavailableResponse');
            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a');
            cy.wait('@signalKeysExternalServiceUnavailableResponse');
        });

        it('should not show any autocomplete with suggestions', function() {
            cy.get('.spectrum-Popover.is-open').should('not.exist');
            cy.get('.spectrum-SelectList-item').should('not.exist');
        });

        it('should show the in-line error message caused by the unavailable external services', function() {
            const inlineErrorMessage = 'Key friendly names are not available.';
            cy.get('[data-test="inline-error"]').should('be.visible');
            cy.get('[data-test="inline-error"]').should('have.text', inlineErrorMessage);
        });
    });

    describe('when Operator select is changed', function() {
        it('should change the value to selected option', function() {
            cy.get('.operator')
                .click()
                .get('[role=option]:last')
                .click()
                .then(function($option) {
                    cy.get('.operator').should(function($operator) {
                        expect($operator.text()).to.contains($option.text());
                    });
                });
        });
    });

    describe('when typing in text in Value input', function() {
        beforeEach(function() {
            cy.route(/\/portal\/api\/v1\/signals\/keys\?search=.+&total=8/, signalKeysResponse).as(
                'fetchSignalKeys',
            );
            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a');
            cy.wait('@fetchSignalKeys');
        });

        it('should allow you to type a value in the field after Key field has value', function() {
            const value = '1';
            cy.get('[data-test="value-search"]').type(value);

            cy.get('[data-test="value-search"]').should(function($text) {
                expect($text.val()).to.contains(value);
            });
        });

        it('should not show any in-line error message', function() {
            cy.get('[data-test="inline-error"]').should('not.exist');
        });

        it('should show in-line error message `Key cannot be empty when value is specified.` if Key input field is clear and type value in Value field', function() {
            const value = '1';
            const inlineErrorMessage = 'Key cannot be empty when value is specified.';
            cy.get('@keyInput').clear();
            cy.get('[data-test="value-search"]').type(value);

            cy.get('[data-test="inline-error"]').should('be.visible');
            cy.get('[data-test="inline-error"]').should('have.text', inlineErrorMessage);
        });
    });

    describe('when Add button is clicked', function() {
        it('should add a row', function() {
            cy.get('[data-test="add-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 2);
            cy.get('[data-test="remove-button"]').should('have.length', 1);
        });
    });

    describe('when 3 rows are added', function() {
        it('should render 3 rows with remove buttons and no Add button', function() {
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 3);
            cy.get('[data-test="remove-button"]').should('have.length', 2);
            cy.get('[data-test="add-button"]').should('have.length', 0);
        });
    });

    describe('when Remove button is clicked', function() {
        it('should remove a row', function() {
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="remove-button"]:last').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 2);
        });
    });

    describe('when rows are removed down to 1', function() {
        it('should only show the Add button next to a row', function() {
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="remove-button"]:last').click();
            cy.get('[data-test="remove-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="remove-button"]').should('have.length', 0);
            cy.get('[data-test="add-button"]').should('have.length', 1);
        });
    });

    describe('when Signal Status select is changed', function() {
        it('should change the value to selected option', function() {
            cy.get('.signal-status')
                .click()
                .get('[role=option]:last')
                .click()
                .then(function($option) {
                    cy.get('.signal-status').should(function($signalStatus) {
                        expect($signalStatus.text()).to.contains($option.text());
                    });
                });
        });
    });

    describe('when View Records For select is changed', function() {
        it('should change the value to selected option', function() {
            cy.get('.view-records')
                .click()
                .get('.spectrum-SelectList-item:first')
                .click()
                .then(function($option) {
                    cy.get('.view-records').should(function($viewRecords) {
                        expect($viewRecords.text()).to.contains($option.text());
                    });
                });
        });
    });

    describe('when Mininum Counts select is changed', function() {
        it('should change the value to selected option', function() {
            const value = 50000;

            cy.get('[data-test="min-counts"]')
                .clear()
                .type(value)
                .should('have.value', String(value));
        });
    });

    describe('when "Custom Date Range" in the View Records For select is selected', function() {
        beforeEach(function() {
            cy.get('.view-records')
                .click()
                .get('.spectrum-SelectList-item:last')
                .click();
            cy.get('[data-test="custom-start-date"]').as('customStartDate');
            cy.get('[data-test="custom-end-date"]').as('customEndDate');
        });

        it('should show custom start and end date datepickers', function() {
            cy.get('@customStartDate').should('be.visible');
            cy.get('@customEndDate').should('be.visible');
        });

        it('should default the custom start date to 7 days ago', function() {
            cy.get('@customStartDate').should('have.value', '04/24/2018');
        });

        it('should default the custom end date to today', function() {
            cy.get('@customEndDate').should('have.value', '05/01/2018');
        });
    });

    describe('when Clear All button is clicked', function() {
        beforeEach(function() {
            const minCounts = 50000;

            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="advanced-search-filter"]').type('te{enter}');

            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();

            cy.get('.signal-status')
                .click()
                .get('[role=option]:last')
                .click();

            cy.get('.view-records')
                .click()
                .get('.spectrum-SelectList-item:first')
                .click();

            cy.get('[data-test="min-counts"]')
                .clear()
                .type(minCounts);

            cy.get('[data-test="search-button"]').click();

            cy.get('[data-test="clear-all-button"]').click();
        });

        it('should reset the form and clear the results', function() {
            cy.get('[data-test="advanced-search-filter"]').should('have.length', 0);
            cy.get('[data-test="key-search-field"]').should('have.value', '');
            cy.get('.operator').should('contain', '==');
            cy.get('[data-test="value-search"]').should('have.value', '');
            cy.get('.signal-status').should('contain', 'All');
            cy.get('.view-records').should('contain', '7 Days');
            cy.get('[data-test="min-counts"]').should('have.value', '1000');
            cy.get('[data-test="signals-table"]').should('have.length', 0);
        });
    });

    describe('Normalizing search form inputs into API request parameters', function() {
        describe('Key-value pair inputs', () => {
            describe('When one key-value pair with empty key and empty value is searched', () => {
                it('`search` should be excluded', () => {
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(
                        ({ search }) => expect(search).to.be.undefined,
                    );
                });
            });

            describe('When multiple key-value pairs all with empty key and empty value are searched', () => {
                it('`search` should be excluded', () => {
                    cy.get('[data-test="add-button"]').click();
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(
                        ({ search }) => expect(search).to.be.undefined,
                    );
                });
            });

            describe('When multiple key-value pairs are searched and some have empty key and empty value', () => {
                it('`search` should only include the non-empty key-value pairs', () => {
                    cy.get('[data-test="key-search-field"]').type('a');
                    cy.get('[data-test="value-search"]').type('b');

                    cy.get('[data-test="add-button"]').click();
                    cy.get('[data-test="add-button"]').click();
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(({ search }) =>
                        expect(search).to.equal('"a"=="b"'),
                    );
                });
            });
        });

        describe('Signal Status dropdown', () => {
            describe('When the default "All" option is selected', () => {
                it('`signalStatus` should be excluded', () => {
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(
                        ({ signalStatus }) => expect(signalStatus).to.be.undefined,
                    );
                });
            });

            describe('When "Unused Signals" or "Signals Included In Traits" are selected', () => {
                it('`signalStatus` should be the dropdown option value', () => {
                    cy.get('.signal-status')
                        .click()
                        .get('[role=option]:nth-of-type(2)')
                        .click();

                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(({ signalStatus }) =>
                        expect(signalStatus).to.equal('UNUSED'),
                    );

                    cy.get('.signal-status')
                        .click()
                        .get('[role=option]:last')
                        .click();

                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(({ signalStatus }) =>
                        expect(signalStatus).to.equal('USED'),
                    );
                });
            });
        });

        describe('View Records For dropdown', function() {
            describe('When a date range preset is selected (ex: "Last X Days")', function() {
                it('`startDate` should be X days ago at UTC midnight in ms and endDate should be excluded', function() {
                    const expectedStartDates = [
                        1525046400000, // 1 day ago (April 30), UTC midnight
                        1524528000000, // 7 days ago (April 24), UTC midnight
                        1523923200000, // 14 days ago (April 17), UTC midnight
                        1522540800000, // 30 days ago (April 1), UTC midnight
                    ];

                    for (let i = 0; i < expectedStartDates.length; i++) {
                        cy.get('.view-records')
                            .click()
                            .get(`.spectrum-SelectList-item:nth-child(${i + 1})`)
                            .click()
                            .get('[data-test="search-button"]')
                            .click()
                            .then(() =>
                                cy
                                    .getRequestParams('@fetchSearchResults')
                                    .then(({ startDate, endDate }) => {
                                        expect(startDate).to.equal(expectedStartDates[i]);
                                        expect(endDate).to.be.undefined;
                                    }),
                            );
                    }
                });
            });

            describe('When a custom date range is selected', function() {
                it('`startDate` and `endDate` should be the selected dates at UTC midnight in ms', function() {
                    const expectedStartDate = 1524355200000; // April 22, UTC midnight
                    const expectedEndDate = 1524528000000; // April 24, UTC midnight

                    cy.get('.view-records')
                        .click()
                        .get(`.spectrum-SelectList-item:last-child`)
                        .click()
                        .get('[data-test="custom-start-date"]')
                        .clear()
                        .type('04/22/18')
                        .get('[data-test="custom-end-date"]')
                        .clear()
                        .type('04/24/18')
                        .get('[data-test="search-button"]')
                        .click()
                        .then(() =>
                            cy
                                .getRequestParams('@fetchSearchResults')
                                .then(({ startDate, endDate }) => {
                                    expect(startDate).to.equal(expectedStartDate);
                                    expect(endDate).to.equal(expectedEndDate);
                                }),
                        );
                });
            });
        });

        describe('Source filters', () => {
            beforeEach(() => {
                cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                    'fetchSearchResults',
                );
            });

            describe('When no source filters are selected', () => {
                it('`source` should be excluded', () => {
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(
                        ({ source }) => expect(source).to.be.undefined,
                    );
                });
            });

            describe('When only a non-default signal type filter is selected', () => {
                it('`source` should be included and only contain `sourceType`', () => {
                    cy.get('[data-test="search-button"]').click();

                    cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                        'fetchFilteredSearchResults',
                    );

                    cy.get('[data-test="alf-signal-type-filter"]').click();
                    cy.wait('@fetchFilteredSearchResults');

                    cy.getRequestParams('@fetchFilteredSearchResults').then(
                        ({ source: { sourceType, reportSuiteIds, dataSourceIds } }) => {
                            expect(sourceType).to.equal('ALF');
                            expect(reportSuiteIds).to.be.undefined;
                            expect(dataSourceIds).to.be.undefined;
                        },
                    );
                });
            });

            describe('When a Report Suite is selected in "advanced search"', () => {
                it('`source` should be included and contain `sourceType` and `reportSuiteIds`', () => {
                    cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                        'fetchAdvancedSearchResults',
                    );

                    cy.get('[data-test="advanced-search-toggle"]').click();
                    cy.wait('@fetchReportSuites');
                    cy.get('[data-test="advanced-search-filter"]').type('te{enter}');
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchAdvancedSearchResults');

                    cy.getRequestParams('@fetchAdvancedSearchResults').then(
                        ({ source: { sourceType, reportSuiteIds, dataSourceIds } }) => {
                            expect(sourceType).to.equal('ANALYTICS');
                            expect(reportSuiteIds[0]).to.equal(
                                'test-report-suite-edited1505153440289',
                            );
                            expect(dataSourceIds).to.be.undefined;
                        },
                    );
                });
            });

            // TODO: Unskip this test once "Onboarded Record" filter is implemented
            describe.skip('When an Onboarded Record is selected', () => {
                it('`source` should be included and contain `sourceType` and `dataSourceIds`', () => {
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.get('[data-test="onboarded-signal-type-filter"]').click();

                    cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                        'fetchOnboardedSearchResults',
                    );

                    cy.get('[data-test="onboarded-record-filter"]').type('t{enter}');
                    cy.wait('@fetchOnboardedSearchResults');

                    cy.getRequestParams('@fetchOnboardedSearchResults').then(
                        ({ source: { sourceType, reportSuiteIds, dataSourceIds } }) => {
                            expect(sourceType).to.equal('ONBOARDED');
                            expect(reportSuiteIds).to.be.undefined;
                            expect(dataSourceIds[0]).to.equal('test onboarded record');
                        },
                    );
                });
            });
        });
    });
});
