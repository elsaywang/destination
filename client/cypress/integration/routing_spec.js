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
        cy.visit('http://localhost:3000');
        // Verify - it is signal Dashboard (home) page
        cy.title().should('contain', 'Signals');
        // Visit signal Search page URL
        cy.visit('http://localhost:3000/#/search');
        // Verify - it is signal Search page

        cy
            .get('button')
            .contains('Search')
            .should('be.exist');
        // Navigate to signal Dashboard by clicking - Dashboard tab
        cy.contains('Dashboard').click();
        // Verify - it is signal Dashboard page
        cy.get('.spectrum-Table').should('be.exist');

        // Navigate to signal Search by clicking - Search tab
        cy.contains('Search').click();
        // Verify - it is signal Search page
        cy
            .get('button')
            .contains('Search')
            .should('be.exist');
    });
});
