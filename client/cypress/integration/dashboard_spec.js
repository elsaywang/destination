describe('Dashboard Integration Tests', function() {
    it('should navigate user to dashboard after clicking Signals on top nav', function(params) {
        cy.visit('http://localhost:3000');
        cy.get('h1').should('include', 'Dashboard');
    });
});
