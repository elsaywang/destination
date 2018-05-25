const deferred = require('../utils/deferred');
const savedSearchResponse = require('../fixtures/savedSearch.json');

describe('Validation Spec', function() {
    before(function() {
        this.fetchSavedSearchDeferred = deferred();

        cy.visit('#/search', {
            onBeforeLoad(win) {
                cy
                    .stub(win, 'fetch')
                    .withArgs('/portal/api/v1/users/self/annotations/aam-portal')
                    .as('fetchSavedSearch')
                    .returns(this.fetchSavedSearchDeferred.promise);
            },
        });

        this.fetchSavedSearchDeferred.resolve({
            json() {
                return savedSearchResponse.savedSearch;
            },
            ok: true,
        });
    });

    describe('when adding another key value pair', function() {
        before(function() {
            cy.get('[data-test="add-button"]').click();
        });

        describe('when entering first key value pair validly', function() {
            before(function() {
                cy
                    .get('.operator:first')
                    .click()
                    .get('[role=option]:last')
                    .click();
                cy.get('[data-test="value-search"]:first').type('test');
            });

            it('should show up as valid for value field', function() {
                cy.get('[data-test="value-search"]:first').should('not.have.class', 'is-invalid');
            });

            it('should not show an error message', function() {
                cy.get('[data-test="inline-error-message"]').should('have.length', 0);
            });

            it('should have enabled Search button', function() {
                cy.get('[data-test="search-button"]').should('be.enabled');
            });
        });

        describe('when entering second key value pair invalidly,', function() {
            before(function() {
                cy
                    .get('.operator:eq(1)')
                    .click()
                    .get('.spectrum-SelectList-item:nth-child(2)')
                    .click();
                cy.get('[data-test="value-search"]:eq(1)').type('a');
            });

            it('should show up as invalid for value field', function() {
                cy.get('[data-test="value-search"]:eq(1)').should('have.class', 'is-invalid');
                cy.get('[data-test="value-search"]:eq(1)').should('have.attr', 'aria-invalid');
            });

            it('should show an error message', function() {
                cy.get('[data-test="inline-error-message"]').should('have.length', 1);
            });

            it('should have disabled Search button', function() {
                cy.get('[data-test="search-button"]').should('be.disabled');
            });
        });
    });
});
