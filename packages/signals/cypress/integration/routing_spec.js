describe('Integration Tests for routing', function() {
    it('should check the ability for routing in the UI', function(done) {
        cy.on('uncaught:exception', err => {
            expect(err.message).to.include('.props.onClick is not a function');

            // using mocha's async done callback to finish
            // this test so we prove that an uncaught exception
            // was thrown
            done();

            // return false to prevent the error from
            // failing this test
            return false;
        });

        // Visit signal Dashboard (home) URL
        cy.visit('/');
        // Verify - it is signal Dashboard (home) page
        cy.title().should('contain', 'Signals');
        // Visit signal Search page URL
        cy.visit('#/search');
        // Verify - it is signal Search page
        cy.get('button')
            .contains('Search')
            .should('be.exist');
        // Navigate to signal Dashboard by clicking - Dashboard tab
        cy.contains('Dashboard').click();
        // Verify - it is signal Dashboard page
        cy.get('.spectrum-Table').should('be.exist');

        // Navigate to signal Search by clicking - Search tab
        cy.contains('Search').click();
        // Verify - it is signal Search page
        cy.get('button')
            .contains('Search')
            .should('be.exist');
        done();
    });
    //TODO: Bring back tour guide button test cases once contexts are finalized
    describe('when routing to signal Dashboard (home) URL', () => {
        beforeEach(() => {
            cy.visit('/');
        });

        it('url should match correctly', () => {
            cy.url().should('match', /\#\//);
        });

        it('should be the dashboard page with Signals title', () => {
            cy.title().should('contain', 'Signals');
        });

        it('should contain the Signal Head and the link button for data explorer documentation', () => {
            cy.get('.spectrum-Heading')
                .contains('Signals')
                .should('be.exist');
            cy.get('[data-test="data-explorer-documentation-link"]')
                .contains('Learn more about Data Explorer')
                .should('be.exist');
        });

        it.skip('should contain the Signal Head and the entry button for beta tag and tour Guide', () => {
            cy.get('.spectrum-Heading')
                .contains('Signals')
                .should('be.exist');
            cy.get('.spectrum-Button.spectrum-Button--secondary.tour-guide')
                .contains('Take a Tour')
                .should('be.exist');
        });

        it('should contain both Dashboard and Search navigation tab', () => {
            cy.contains('Dashboard').should('be.exist');
            cy.contains('Search').should('be.exist');
        });

        it('only the Dashboard navigation tab should be clicked', () => {
            cy.get('.spectrum-Tabs-item.is-selected [data-test="dashboard-nav-link"]').as(
                'selectedNavTab',
            );
            cy.get('@selectedNavTab')
                .contains('Dashboard')
                .should('be.exist');
            cy.get('@selectedNavTab')
                .contains('Search')
                .should('not.exist');
        });

        it('should contain default 2 preset signals tables', () => {
            cy.get('[data-test="saved-search-dashboard"]')
                .should('be.exist')
                .should('have.length', 2);
        });
    });

    describe('when routing to Search url', () => {
        beforeEach(() => {
            cy.visit('#/search');
        });

        it('url should match correctly', () => {
            cy.url().should('match', /\#\/search/);
        });

        it.skip('should also contain the Signal Head and the entry button for Beta tag and Tour Guide', () => {
            cy.get('.spectrum-Heading')
                .contains('Signals')
                .should('be.exist');
            cy.get('.spectrum-Button.spectrum-Button--secondary.tour-guide')
                .contains('Take a Tour')
                .should('be.exist');
        });

        it('should contain the Signal Head and the link button for data explorer documentation', () => {
            cy.get('.spectrum-Heading')
                .contains('Signals')
                .should('be.exist');
            cy.get('[data-test="data-explorer-documentation-link"]')
                .contains('Learn more about Data Explorer')
                .should('be.exist');
        });

        it('only the Seach navigation tab should be clicked', () => {
            cy.get('.spectrum-Tabs-item.is-selected [data-test="search-nav-link"]').as(
                'selectedNavTab',
            );
            cy.get('@selectedNavTab')
                .contains('Dashboard')
                .should('not.exist');
            cy.get('@selectedNavTab')
                .contains('Search')
                .should('be.exist');
        });
    });
});
