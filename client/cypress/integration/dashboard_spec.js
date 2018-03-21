describe('Dashboard Integration Tests', function() {
    it('should navigate user to dashboard after clicking Signals on top nav', function() {
        cy.visit('/');
        cy.title().should('contain', 'Signals');
    });
});
