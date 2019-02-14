describe('Configration Integration Tests', () => {
    beforeEach(() => {
        cy.server();
        cy.visit('portal/administration/integrated-accounts');
    });

    it.skip('should show Configration page with message, EmptyState and Add-Account Button', () => {
        cy.get('[data-test="configuration-heading-message"]').should('exist');
        cy.get('[data-test="add-account-modal-button"]').should('exist');
        cy.get('[data-test="empty-state"]').should('exist');
    });

    it('should show Configration page with message, Authentication Table list and Add Account Button', () => {
        cy.get('[data-test="configuration-heading-message"]').should('exist');
        cy.get('[data-test="add-account-modal-button"]').should('exist');
        cy.get('[data-test="empty-state"]').should('not.exist');
        cy.get('[data-test="authentication-list-table"]').should('exist');
    });

    it('should not contain search box', () => {
        cy.get('#destinations-search').should('not.exist');
    });
});
