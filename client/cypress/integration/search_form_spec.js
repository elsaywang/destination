const searchResultsResponse = require('../fixtures/searchResults.json');
const emptySearchResultsResponse = require('../fixtures/emptySearchResults.json');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const reportSuitesResponse = require('../fixtures/reportSuites.json');
const reportSuitesWithoutNamesResponse = require('../fixtures/reportSuitesWithoutNames.json');
const signalKeysResponse = require('../fixtures/signalKeys.json');
const limitsResponse = require('../fixtures/limits.json');
const signalKeysAnalyticsServiceUnavailableResponse = require('../fixtures/signalKeysWithAnalyticsServiceUnavailable.json');
const signalKeysSolrServiceUnavailableResponse = require('../fixtures/signalKeysWithSolrServiceUnavailable.json');
const keySuggestionsDebounceMs = require('../../src/constants/lazyLoadConstants')
    .keySuggestionsDebounceMs;
const dataSourcesResponse = require('../fixtures/dataSources.json');

describe('Search Form Integration Tests', () => {
    beforeEach(() => {
        cy.clock(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)

        cy.server();
        cy.route(
            '/portal/api/v1/users/self/annotations/aam-portal',
            savedSearchResponse.savedSearch,
        ).as('fetchSavedSearch');
        cy.route('POST', '/portal/api/v1/signals/list', emptySearchResultsResponse).as(
            'fetchSearchResults',
        );
        cy.route('/portal/api/v1/report-suites/?sortBy=suite', reportSuitesResponse.list).as(
            'fetchReportSuites',
        );
        cy.route('/portal/api/v1/signals/limits', limitsResponse).as('fetchLimits');

        cy.visit('#/search');
    });

    afterEach(() => {
        cy.clock().then(clock => {
            clock.restore();
        });
    });

    it('should show search form when navigating with URL', () => {
        cy.get('[data-test="search-form"]').should('exist');
    });

    describe('when Advanced toggle is clicked', () => {
        beforeEach(() => {
            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="advanced-search-filter"]').as('advancedFilter');
            cy.wait('@fetchReportSuites');
        });

        it('should enable filter to filter by report suite names', () => {
            cy.get('@advancedFilter').should('be.enabled');
        });

        it('should allow you to type a report suite name and press enter on list of name suggestions', () => {
            cy.clock().then(clock => clock.restore());
            cy.get('@advancedFilter')
                .type('Te{enter}')
                .then($text => {
                    cy.get('@advancedFilter').should($filter => {
                        expect($filter.val()).to.contains($text.val());
                    });
                });
        });

        it('should allow you to select a report suite through drop down when you click on the dropdown button', () => {
            cy.clock().then(clock => clock.restore());
            cy.get('@advancedFilter')
                .siblings('button')
                .click()
                .then($text => {
                    cy.get('@advancedFilter').should($filter => {
                        expect($filter.val()).to.contains($text.text());
                    });
                });
        });
    });

    describe('when Advanced toggle is clicked but reportSuites has no name in response', () => {
        beforeEach(() => {
            cy.route('/portal/api/v1/report-suites', reportSuitesWithoutNamesResponse.list).as(
                'fetchReportSuitesWithoutNames',
            );
            cy.reload();
            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="advanced-search-filter"]').as('advancedFilter');
        });

        it('should enable filter to filter by report suite ids', () => {
            cy.get('@advancedFilter').should('be.enabled');
        });

        it('should allow you to type a report suite name and press enter on list of suite suggestions', () => {
            cy.clock().then(clock => clock.restore());
            cy.get('@advancedFilter')
                .type('te{enter}')
                .then($text => {
                    cy.get('@advancedFilter').should($filter => {
                        expect($filter.val()).to.contains($text.val());
                    });
                });
        });

        it('should allow you to select a report suite through drop down when you click on the dropdown button', () => {
            cy.clock().then(clock => clock.restore());
            cy.get('@advancedFilter')
                .siblings('button')
                .click()
                .then($text => {
                    cy.get('@advancedFilter').should($filter => {
                        expect($filter.val()).to.contains($text.text());
                    });
                });
        });
    });

    describe.skip('when typing in text in Key input with external services available', () => {
        beforeEach(() => {
            cy.clock();
            cy.route(
                /\/portal\/api\/v1\/signals\/keys\?search=.*?&total=8$/,
                signalKeysResponse,
            ).as('fetchSignalKeys');

            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a', { force: true });
            cy.tick(keySuggestionsDebounceMs);
            cy.wait('@fetchSignalKeys');
        });

        it('should show autocomplete with suggestions and match the typed option', () => {
            cy.clock().then(clock => clock.restore());
            cy.get('.spectrum-Popover.is-open').should('have.length', 1);
            cy.get('.spectrum-Menu-item').should('have.length', 8);
            cy.get('.spectrum-Popover.is-open .spectrum-Menu-item.is-focused >span')
                .click()
                .then($item => {
                    cy.get('@keyInput').should($keyInput => {
                        expect($keyInput.val()).to.contains($item.text());
                    });
                });
        });
    });

    describe('when typing in text in Key input with analytics service unavailable', () => {
        beforeEach(() => {
            cy.clock();
            cy.route(
                /\/portal\/api\/v1\/signals\/keys\?search=.*?&total=8$/,
                signalKeysAnalyticsServiceUnavailableResponse,
            ).as('signalKeysAnalyticsServiceUnavailableResponse');
            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a');
            cy.tick(keySuggestionsDebounceMs);
            cy.wait('@signalKeysAnalyticsServiceUnavailableResponse');
        });

        it('should not show any autocomplete with suggestions', () => {
            cy.get('.spectrum-Popover.is-open').should('not.exist');
            cy.get('.spectrum-Menu-item').should('not.exist');
        });

        it('should show the in-line error message caused by the unavailable analytics services', () => {
            const inlineErrorMessage = 'Key suggestions for Analytics variables are not available.';

            cy.get('[data-test="inline-error"]').should('be.visible');
            cy.get('[data-test="inline-error"]').should('have.text', inlineErrorMessage);
        });

        it('should no longer be visible after a successful search', () => {
            cy.get('[data-test="search-button"]').click();
            cy.get('[data-test="inline-error"]').should('not.be.visible');
        });
    });

    describe('when typing in text in Key input with solr service unavailable', () => {
        beforeEach(() => {
            cy.clock();
            cy.route(
                /\/portal\/api\/v1\/signals\/keys\?search=.*?&total=8$/,
                signalKeysSolrServiceUnavailableResponse,
            ).as('signalKeysSolrServiceUnavailableResponse');
            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a');
            cy.tick(keySuggestionsDebounceMs);
            cy.wait('@signalKeysSolrServiceUnavailableResponse');
        });

        it('should not show any autocomplete with suggestions', () => {
            cy.get('.spectrum-Popover.is-open').should('not.exist');
            cy.get('.spectrum-Menu-item').should('not.exist');
        });

        it('should show the in-line error message caused by the unavailable solr services', () => {
            const inlineErrorMessage = 'Key suggestions are not available.';

            cy.get('[data-test="inline-error"]').should('be.visible');
            cy.get('[data-test="inline-error"]').should('have.text', inlineErrorMessage);
        });

        it('should no longer be visible after a successful search', () => {
            cy.get('[data-test="search-button"]').click();
            cy.get('[data-test="inline-error"]').should('not.be.visible');
        });
    });
    describe('when Operator select is changed', () => {
        it('should change the value to selected option', () => {
            cy.clock().then(clock => {
                clock.restore();
            });
            cy.get('.operator')
                .click()
                .get('[role=option]:last')
                .click()
                .then($option => {
                    cy.get('.operator').should($operator => {
                        expect($operator.text()).to.contains($option.text());
                    });
                });
        });
    });

    describe('when typing in text in Value input', () => {
        beforeEach(() => {
            cy.clock();
            cy.route(
                /\/portal\/api\/v1\/signals\/keys\?search=.*?&total=8$/,
                signalKeysResponse,
            ).as('fetchSignalKeys');
            cy.get('[data-test="key-search-field"]').as('keyInput');
            cy.get('@keyInput').type('a');
            cy.tick(keySuggestionsDebounceMs);
            cy.wait('@fetchSignalKeys');
        });

        it('should be valid when the Key field has value and should show inline error message when the Key field is empty', () => {
            const value = '1';
            const inlineErrorMessage = 'Key cannot be empty when value is specified.';

            cy.get('[data-test="value-search"]')
                .type(value)
                .should('have.value', value);

            cy.get('[data-test="inline-error"]').should('not.exist');

            cy.get('@keyInput').clear();
            cy.tick(keySuggestionsDebounceMs);

            cy.get('[data-test="inline-error"]').should('be.visible');
            cy.get('[data-test="inline-error"]').should('have.text', inlineErrorMessage);
        });
    });

    describe('when Add button is clicked', () => {
        it('should add a row', () => {
            cy.get('[data-test="add-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 2);
            cy.get('[data-test="remove-button"]').should('have.length', 1);
        });
    });

    describe('when 3 rows are added', () => {
        it('should render 3 rows with remove buttons and no Add button', () => {
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 3);
            cy.get('[data-test="remove-button"]').should('have.length', 2);
            cy.get('[data-test="add-button"]').should('have.length', 0);
        });
    });

    describe('when Remove button is clicked', () => {
        it('should remove a row', () => {
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="remove-button"]:last').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 2);
        });
    });

    describe('when rows are removed down to 1', () => {
        it('should only show the Add button next to a row', () => {
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="remove-button"]:last').click();
            cy.get('[data-test="remove-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="remove-button"]').should('have.length', 0);
            cy.get('[data-test="add-button"]').should('have.length', 1);
        });
    });

    describe('when Signal Status select is changed', () => {
        it('should change the value to selected option', () => {
            cy.clock().then(clock => {
                clock.restore();
            });
            cy.get('[data-test="signal-status"] > button')
                .click()
                .get('[role=option]:last')
                .click()
                .then($option => {
                    cy.get('.signal-status > button').should($signalStatus => {
                        expect($signalStatus.text()).to.contains($option.text());
                    });
                });
        });
    });

    describe('when View Records For select is changed', () => {
        it('should change the value to selected option', () => {
            cy.clock().then(clock => {
                clock.restore();
            });
            cy.get('.view-records > button')
                .click()
                .get('.spectrum-Menu-item:first')
                .click()
                .then($option => {
                    cy.get('.view-records').should($viewRecords => {
                        expect($viewRecords.text()).to.contains($option.text());
                    });
                });
        });
    });

    describe('when Mininum Counts select is changed', () => {
        it('should change the value to selected option', () => {
            const value = 1000;
            cy.get('[data-test="min-counts"]').clear();
            cy.get('.min-counts .spectrum-Stepper-stepUp').click();
            cy.get('[data-test="min-counts"]').should('have.value', String(value));
        });
    });

    describe('when "Custom Date Range" in the View Records For select is selected', () => {
        beforeEach(() => {
            cy.clock().then(clock => {
                clock.restore();
            });
            cy.get('.view-records > button')
                .click()
                .get('.spectrum-Menu-item:last')
                .click();
            cy.get('[data-test="custom-start-date"]').as('customStartDate');
            cy.get('[data-test="custom-end-date"]').as('customEndDate');
        });

        it('should show custom start and end date datepickers', () => {
            cy.get('@customStartDate').should('be.visible');
            cy.get('@customEndDate').should('be.visible');
        });

        it('should default the custom start date to 7 days ago', () => {
            cy.get('@customStartDate').should('have.value', '04/24/2018');
        });

        it('should default the custom end date to today', () => {
            cy.get('@customEndDate').should('have.value', '05/01/2018');
        });
    });

    describe('when Clear All button is clicked', () => {
        beforeEach(() => {
            cy.clock().then(clock => {
                clock.restore();
            });
            const minCounts = 50000;

            cy.get('[data-test="advanced-search-toggle"]').click();
            cy.get('[data-test="advanced-search-filter"]').type('te{enter}');

            cy.get('[data-test="add-button"]').click();
            cy.get('[data-test="add-button"]').click();

            cy.get('.signal-status >button')
                .click()
                .get('[role=option]:last')
                .click();

            cy.get('.view-records >button')
                .click()
                .get('.spectrum-Menu-item:first')
                .click();

            cy.get('[data-test="min-counts"]')
                .clear()
                .type(minCounts);

            cy.get('[data-test="search-button"]').click();

            cy.get('[data-test="clear-all-button"]').click();
        });

        it('should reset the form and clear the results', () => {
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

    describe('Enhancements to date range search based on max signal retention days', () => {
        describe('"View Records For" dropdown options', () => {
            it('should include default options, but should not include "Last 180 Days" or "Last 365 Days" by default', () => {
                cy.get('.view-records > button').click();

                cy.get('.spectrum-Menu-item')
                    .contains('Last 1 Day')
                    .should('exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Last 7 Days')
                    .should('exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Last 14 Days')
                    .should('exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Last 30 Days')
                    .should('exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Custom Date Range')
                    .should('exist');

                cy.get('.spectrum-Menu-item')
                    .contains('Last 180 Days')
                    .should('not.exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Last 365 Days')
                    .should('not.exist');
            });

            it('should include "Last 180 Days" when `maxSignalRetentionDays` is 180', () => {
                cy.route('/portal/api/v1/signals/limits', {
                    maxSignalRetentionDays: 180,
                }).as('fetchLimits');
                cy.reload();
                cy.get('.view-records > button').click();

                cy.get('.spectrum-Menu-item')
                    .contains('Last 180 Days')
                    .should('exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Last 365 Days')
                    .should('not.exist');
            });

            it('should include "Last 365 Days" when `maxSignalRetentionDays` is 365', () => {
                cy.route('/portal/api/v1/signals/limits', {
                    maxSignalRetentionDays: 365,
                }).as('fetchLimits');
                cy.reload();
                cy.get('.view-records > button').click();

                cy.get('.spectrum-Menu-item')
                    .contains('Last 180 Days')
                    .should('exist');
                cy.get('.spectrum-Menu-item')
                    .contains('Last 365 Days')
                    .should('exist');
            });
        });

        // TODO: Unskip this test
        describe.skip('Custom Date Range', () => {
            const openCustomStartDateCalendar = () => {
                cy.get('.view-records >button ')
                    .click()
                    .then(() => {
                        cy.get('.spectrum-Menu-item:last').click();
                        cy.get('.custom-start-date .spectrum-FieldButton').click();
                        cy.get('.spectrum-Calendar').as('customStartDateCalendar');
                    });
            };
            afterEach(() => cy.clock().then(clock => clock.restore()));
            //TODO: look into it, it calls getNow() today's date to calculate the min and max
            it('should have a min start date of 30 days ago by default', () => {
                openCustomStartDateCalendar();
                cy.get('@customStartDateCalendar').should('have.attr', 'min', '2018-04-01');
            });

            it('should have a min start date of 180 days ago when `maxSignalRetentionDays` is 180', () => {
                cy.route('/portal/api/v1/signals/limits', {
                    maxSignalRetentionDays: 180,
                }).as('fetchLimits');
                cy.reload();

                openCustomStartDateCalendar();

                cy.get('@customStartDateCalendar').should('have.attr', 'min', '2017-11-02');
            });

            it('should have a min start date of 365 days ago when `maxSignalRetentionDays` is 365', () => {
                cy.route('/portal/api/v1/signals/limits', {
                    maxSignalRetentionDays: 365,
                }).as('fetchLimits');
                cy.reload();
                openCustomStartDateCalendar();

                cy.get('@customStartDateCalendar').should('have.attr', 'min', '2017-05-01');
            });
        });
    });

    describe('Normalizing search form inputs into API request parameters', () => {
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
                    cy.clock().then(clock => clock.restore());
                    cy.get('.signal-status >button')
                        .click()
                        .get('[role=option]:nth-of-type(2)')
                        .click();

                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchSearchResults');

                    cy.getRequestParams('@fetchSearchResults').then(({ signalStatus }) =>
                        expect(signalStatus).to.equal('UNUSED'),
                    );

                    cy.get('.signal-status >button')
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

        // TODO: Unskip this test; similar issue as above, it uses getNow()
        describe.skip('View Records For dropdown', () => {
            describe('When a date range preset is selected', () => {
                it('startDate should be X days ago at UTC midnight in ms and endDate should be excluded', () => {
                    cy.clock().then(clock => clock.restore());
                    const expectedStartDates = [
                        1525046400000, // 1 day ago (April 30), UTC midnight
                        1524528000000, // 7 days ago (April 24), UTC midnight
                        1523923200000, // 14 days ago (April 17), UTC midnight
                        1522540800000, // 30 days ago (April 1), UTC midnight
                    ];

                    for (let i = 0; i < expectedStartDates.length; i++) {
                        cy.get('.view-records')
                            .click()
                            .get(`.spectrum-Menu-item:nth-child(${i + 1})`)
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

            // TODO: Unskip this test; similar issue as above, it uses getNow()
            describe.skip('When a custom date range is selected', () => {
                it('`startDate` should be the selected start date at UTC midnight in ms, and `endDate` should be the selected end date at UTC end of day in ms', () => {
                    cy.clock().then(clock => clock.restore());
                    const expectedStartDate = 1524355200000; // April 22, UTC midnight
                    const expectedEndDate = 1524614399999; // April 24, UTC end of day

                    cy.get('.view-records')
                        .click()
                        .get('.spectrum-Menu-item:last-child')
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
                beforeEach(() => {
                    cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                        'fetchAdvancedSearchResults',
                    );

                    cy.get('[data-test="advanced-search-toggle"]').click();
                    cy.wait('@fetchReportSuites');
                });

                it('`source` should be included and contain `sourceType` and `reportSuiteIds`', () => {
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

                it('should have a disabled signal source filter without selected value when search button is clicked', () => {
                    cy.get('[data-test="search-button"]').click();
                    cy.wait('@fetchAdvancedSearchResults');
                    cy.get('[data-test="analytics-signal-source-filter"]')
                        .as('reportSuitesFilter')
                        .should('have.length', 1);
                    cy.get('@reportSuitesFilter').should('have.class', 'is-disabled');
                });
            });

            describe('When Adobe Analytics is selected', () => {
                beforeEach(() => {
                    cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                        'fetchAdvancedSearchResults',
                    );
                    cy.clock().then(clock => clock.restore());
                });

                it('`source` should be included and contain `sourceType` and `reportSuiteIds`', () => {
                    cy.get('[data-test="search-button"]').click();

                    cy.get('[data-test="analytics-signal-type-filter"]').click();
                    cy.wait('@fetchReportSuites');

                    cy.get('[data-test="analytics-signal-source-filter"]').as('reportSuitesFilter');

                    cy.get('@reportSuitesFilter')
                        .click()
                        .get('.spectrum-Menu-item:first')
                        .click()
                        .then($option => {
                            cy.get('@reportSuitesFilter').should($reportSuite => {
                                expect($reportSuite.text()).to.contains($option.text());
                            });
                        });

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

            describe('When an Onboarded Record is selected', () => {
                beforeEach(() => {
                    cy.route('POST', '/portal/api/v1/signals/list', searchResultsResponse).as(
                        'fetchOnboardedSearchResults',
                    );
                    cy.route(
                        '/portal/api/v1/datasources/?inboundOnly=true&sortBy=name&excludeReportSuites=true',
                        dataSourcesResponse.list,
                    ).as('fetchDataSources');
                    cy.clock().then(clock => clock.restore());
                });

                it('`source` should be included and contain `sourceType` and `dataSourceIds`', () => {
                    cy.get('[data-test="search-button"]').click();

                    cy.get('[data-test="onboarded-signal-type-filter"]').click();
                    cy.wait('@fetchDataSources');

                    cy.get('[data-test="onboarded-signal-source-filter"]').as('dataSourceFilter');

                    cy.get('@dataSourceFilter')
                        .click()
                        .get('.spectrum-Menu-item:first')
                        .click()
                        .then($option => {
                            cy.get('@dataSourceFilter').should($dataSource => {
                                expect($dataSource.text()).to.contains($option.text());
                            });
                        });

                    cy.getRequestParams('@fetchOnboardedSearchResults').then(
                        ({ source: { sourceType, reportSuiteIds, dataSourceIds } }) => {
                            expect(sourceType).to.equal('ONBOARDED');
                            expect(reportSuiteIds).to.be.undefined;
                            expect(dataSourceIds[0]).to.equal(167507);
                        },
                    );
                });
            });
        });
    });
});
