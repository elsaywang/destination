const deferred = require('../utils/deferred');
const savedSearchResponse = require('../fixtures/savedSearch.json');
const reportSuitesResponse = require('../fixtures/reportSuites.json');

describe('Search Form Integration Tests', function() {
    before(function() {
        cy.clock(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)

        this.fetchSavedSearchDeferred = deferred();
        this.fetchReportSuitesDeferred = deferred();

        cy.visit('#/search', {
            onBeforeLoad(win) {
                cy
                    .stub(win, 'fetch')
                    .withArgs('/api/v1/users/self/annotations/aam-portal')
                    .as('fetchSavedSearch')
                    .returns(this.fetchSavedSearchDeferred.promise)
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

        this.fetchReportSuitesDeferred.resolve({
            json() {
                return reportSuitesResponse.list;
            },
            ok: true,
        });
    });

    after(function() {
        cy.clock().then(function(clock) {
            clock.restore();
        });
    });

    it('should show search form when navigating with URL', function() {
        cy.get('[data-test="search-form"]').should('exist');
    });

    it('should show empty with start exploring image', function() {
        cy.get('[data-test="empty"]').should('exist');
        cy.get('[data-test="start-exploring"]').should('exist');
    });

    describe('when Advanced toggle is clicked', function() {
        before(function() {
            cy.get('[data-test="advanced-search-toggle"]').click();
        });

        beforeEach(function() {
            cy.get('[data-test="advanced-search-filter"]').as('advancedFilter');
        });

        it('should enable filter to filter by user-friendly key names', function() {
            cy.get('@advancedFilter').should('be.enabled');
        });

        it('should allow you to type a report suite name and press enter on list of suggestions', function() {
            cy
                .get('@advancedFilter')
                .type('te{enter}')
                .then(function($text) {
                    cy.get('@advancedFilter').should(function($filter) {
                        expect($filter.val()).to.contains($text.val());
                    });
                });
        });

        it('should allow you to select a report suite through drop down when you click on the dropdown button', function() {
            cy
                .get('@advancedFilter')
                .siblings('button')
                .click()
                .then(function($text) {
                    cy.get('@advancedFilter').should(function($filter) {
                        expect($filter.val()).to.contains($text.text());
                    });
                });

            cy.get('[data-test="search-form"]').click();
        });
    });

    describe.skip('when typing in text in Key input', function() {
        beforeEach(function() {
            cy.get('[data-test="key-search-field"]').as('keyInput');
        });

        it('should show autocomplete with suggestions', function() {
            cy
                .get('@keyInput')
                .type('k')
                .wait('@getResults');

            cy.get('.spectrum-Popover.is-open').should('have.length', 1);
        });

        describe('when an option is clicked', function() {
            it('should have the same key value as clicked option', function() {
                cy.wait('@getResults');
                cy
                    .get('.spectrum-Popover.is-open .spectrum-SelectList-item.is-focused')
                    .click()
                    .then(function($item) {
                        cy.get('@keyInput').should(function($keyInput) {
                            expect($keyInput.val()).to.contains($item.text());
                        });
                    });
            });
        });
    });

    describe('when Operator select is changed', function() {
        it('should change the value to selected option', function() {
            cy
                .get('.operator')
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
        it('should allow you to type a value in the field', function() {
            const value = '1';

            cy.get('[data-test="value-search"]').type(value);

            cy.get('[data-test="value-search"]').should(function($text) {
                expect($text.val()).to.contains(value);
            });
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

            cy.get('[data-test="key-value-pair"]').should('have.length', 3);
            cy.get('[data-test="remove-button"]').should('have.length', 2);
            cy.get('[data-test="add-button"]').should('have.length', 0);
        });
    });

    describe('when Remove button is clicked', function() {
        it('should remove a row', function() {
            cy.get('[data-test="remove-button"]:last').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 2);
        });
    });

    describe('when rows are removed down to 1', function() {
        it('should only show the Add button next to a row', function() {
            cy.get('[data-test="remove-button"]').click();

            cy.get('[data-test="key-value-pair"]').should('have.length', 1);
            cy.get('[data-test="remove-button"]').should('have.length', 0);
            cy.get('[data-test="add-button"]').should('have.length', 1);
        });
    });

    describe('when Signal Status select is changed', function() {
        it('should change the value to selected option', function() {
            cy
                .get('.signal-status')
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
            cy
                .get('.view-records')
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

            cy
                .get('[data-test="min-counts"]')
                .clear()
                .type(value)
                .should('have.value', String(value));
        });
    });

    describe('when "Custom Date Range" in the View Records For select is selected', function() {
        before(function() {
            cy
                .get('.view-records')
                .click()
                .get('.spectrum-SelectList-item:last')
                .click();
        });

        beforeEach(function() {
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
        before(function() {
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
});
