describe('Search Form Integration Tests', function() {
    it('should show search form when navigating with URL', function() {
        cy.visit('#/search');
        cy.get('[data-test="search-form"]').should('exist');
    });

    it("should show user's saved search", function() {
        cy.get('[data-test="saved-search"]').should('exist');
    });

    describe('when Advanced toggle is clicked', function() {
        beforeEach(function() {
            cy.get('[data-test="advanced-search-filter"]').as('advancedFilter');
        });

        it('should enable filter to filter by user-friendly key names', function() {
            cy.get('[data-test="advanced-search-toggle"]').click();

            cy.get('@advancedFilter').should('be.enabled');
        });

        it('should allow you to type a report suite name and press enter on list of suggestions', function() {
            cy
                .get('@advancedFilter')
                .type('t{enter}')
                .then(function($text) {
                    cy.get('@advancedFilter').should(function($filter) {
                        expect($filter.val()).to.eq($text.val());
                    });
                });
        });

        it('should allow you to select a report suite through drop down when you click on the dropdown button', function() {
            cy
                .get('@advancedFilter')
                .siblings('button')
                .get('[role=option]:last')
                .click()
                .then(function($text) {
                    cy.get('@advancedFilter').should(function($filter) {
                        expect($filter.val()).to.eq($text.text());
                    });
                });

            cy.get('[data-test="search-form"]').click();
        });
    });

    // describe('when typing in text in Key input', function() {
    //     beforeEach(function() {
    //         cy.get('[data-test="key-search-field"]').as('keyInput');
    //         cy.server();
    //         cy
    //             .route({
    //                 method: 'GET',
    //                 url: 'api/results',
    //                 response: 'fixture:results.json',
    //             })
    //             .as('getResults');
    //     });

    //     it('should show autocomplete with suggestions', function() {
    //         cy
    //             .get('@keyInput')
    //             .type('k')
    //             .wait('@getResults');

    //         cy.get('.spectrum-Popover.is-open').should('have.length', 1);
    //     });

    //     describe('when an option is clicked', function() {
    //         it('should have the same key value as clicked option', function() {
    //             cy.wait('@getResults');
    //             cy
    //                 .get('.spectrum-Popover.is-open .spectrum-SelectList-item.is-focused')
    //                 .click()
    //                 .then(function($item) {
    //                     cy.get('@keyInput').should(function($keyInput) {
    //                         expect($keyInput.val()).to.eq($item.text());
    //                     });
    //                 });
    //         });
    //     });
    // });

    describe('when Operator select is changed', function() {
        it('should change the value to selected option', function() {
            cy
                .get('.operator')
                .click()
                .get('[role=option]:last')
                .click()
                .then(function($option) {
                    cy.get('.operator').should(function($operator) {
                        expect($operator.text()).to.eq($option.text());
                    });
                });
        });
    });

    describe('when typing in text in Value input', function() {
        it('should allow you to type a value in the field', function() {
            const value = '1';

            cy.get('[data-test="value-search"]').type(value);

            cy.get('[data-test="value-search"]').should(function($text) {
                expect($text.val()).to.eq(value);
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
                .wait(300)
                .get('[role=option]:last')
                .click()
                .then(function($option) {
                    cy.get('.signal-status').should(function($signalStatus) {
                        expect($signalStatus.text()).to.eq($option.text());
                    });
                });
        });
    });

    describe('when View Records For select is changed', function() {
        it('should change the value to selected option', function() {
            cy
                .get('.view-records')
                .click()
                .wait(300)
                .get('.spectrum-SelectList-item:first')
                .click()
                .then(function($option) {
                    cy.get('.view-records').should(function($viewRecords) {
                        expect($viewRecords.text()).to.eq($option.text());
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

    // TODO: need to mock server and server response
    // describe('when Search button is clicked', function() {
    //     it('should render results table', function () {
    //         cy.get('[data-test="search-button"]').click();
    //         cy.get('[data-test="signals-table"]').should('have.length', 1);
    //     });

    //     describe('with multiple key value pairs that are empty', function() {
    //         it('should clean up empty key value pairs except the first and make a request with cleaned up key value pairs to API', function() {
    //             cy.get('[data-test="add-button"]').click();
    //             cy.get('[data-test="add-button"]').click();
    //             cy.get('[data-test="search-button"]').click();
    //             cy.get('[data-test="key-value-pair"]').should('have.length', 1);
    //             // TODO: expect fetch to have been called with cleaned up key value pairs
    //         });
    //     });
    // });

    describe('when Clear All button is clicked', function() {
        before(function() {
            cy.get('[data-test="clear-all-button"]').click();
        });

        it('should reset the form and clear the results', function() {
            cy.get('[data-test="advanced-search-filter"]').should('be.disabled');
            // TODO: uncomment when we can clear this value on Textfield component
            // cy.get('[data-test="key-search-field"]').should('have.value', '');
            cy.get('.operator').should('have.text', '==');
            cy.get('[data-test="value-search"]').should('have.value', '');
            cy.get('.signal-status').should('contain', 'All');
            cy.get('.view-records').should('contain', '7 Days');
            cy.get('[data-test="min-counts"]').should('have.value', '1000');
            cy.get('[data-test="signals-table"]').should('have.length', 0);
        });
    });
});
