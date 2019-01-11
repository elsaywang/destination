const savedSearchResponse = require('../fixtures/savedSearch.json');
const signalKeysResponse = require('../fixtures/signalKeys.json');
const reportSuitesResponse = require('../fixtures/reportSuites.json');

describe('Validation Spec', function() {
    beforeEach(function() {
        cy.server();
        cy.route(
            '/portal/api/v1/users/self/annotations/aam-portal',
            savedSearchResponse.savedSearch,
        ).as('fetchSavedSearch');
        cy.route(/\/portal\/api\/v1\/signals\/keys\?search=.+&total=8/, signalKeysResponse).as(
            'fetchSignalKeys',
        );
        cy.route('/portal/api/v1/report-suites/?sortBy=suite', reportSuitesResponse.list).as(
            'fetchReportSuites',
        );

        cy.visit('#/search');
    });

    describe('when adding another key value pair', function() {
        beforeEach(function() {
            cy.get('[data-test="add-button"]').click();
        });

        describe('when entering first key value pair validly', function() {
            beforeEach(function() {
                cy.get('[data-test="key-search-field"]:first').type('test');
                cy.get('.operator:first')
                    .click()
                    .get('[role=option]:last')
                    .click();
                cy.get('[data-test="value-search"]:first').type('test');
            });

            it('should show up as valid for value field', function() {
                cy.get('[data-test="value-search"]:first').should('not.have.class', 'is-invalid');
            });

            it('should not show an error message', function() {
                cy.get('[data-test="inline-error"]').should('have.length', 0);
            });

            it('should have enabled Search button', function() {
                cy.get('[data-test="search-button"]').should('be.enabled');
            });
        });

        describe('when entering second key value pair invalidly,', function() {
            beforeEach(function() {
                cy.get('.operator:eq(1)')
                    .click()
                    .get('.spectrum-Menu-item:nth-child(2)')
                    .click();
                cy.get('[data-test="value-search"]:eq(1)').type('a');
            });

            it('should show up as invalid for value field', function() {
                cy.get('[data-test="value-search"]:eq(1)').should('have.class', 'is-invalid');
                cy.get('[data-test="value-search"]:eq(1)').should('have.attr', 'aria-invalid');
            });

            it('should show an error message', function() {
                cy.get('[data-test="value-search"]:eq(1) ~ [data-test="inline-error"]').should(
                    'have.length',
                    1,
                );
            });

            it('should have disabled Search button', function() {
                cy.get('[data-test="search-button"]').should('be.disabled');
            });
        });
    });

    describe('additional validation', function() {
        describe('non-empty value and an empty key', function() {
            beforeEach(function() {
                cy.get('[data-test="value-search"]').type('a');
            });

            it('should not allow you to search', function() {
                cy.get('[data-test="search-button"]').should('be.disabled');
            });

            it('should show an error message', function() {
                cy.get('[data-test="inline-error"]').should('have.length', 1);
            });
        });
    });
});
