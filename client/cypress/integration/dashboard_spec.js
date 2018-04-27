describe('Dashboard Integration Tests', function() {
    it('should navigate user to dashboard after clicking Signals on top nav', function() {
        cy.visit('/');
        cy.title().should('contain', 'Signals');
    });
    //TODO: Integration with api service
    xit('should show a list of saved search tables on the dashboard', function() {
        cy.get('[data-test="saved-search-dashboard"]').should('exist');
    });
});
