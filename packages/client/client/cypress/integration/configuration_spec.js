describe('Configration Integration Tests', () => {
    beforeEach(() => {
        cy.server();
        cy.visit('/configuration');
    });

    it('should show Configration page with message, EmptyState and Add-Account Button', () => {
        cy.get('[data-test="configuration-heading-message"]').should('exist');
        cy.get('[data-test="configuration-add-account-button"]').should('exist');
        cy.get('[data-test="empty-state"]').should('exist');
    });
});
