describe('Integration Tests for routing', function() {
    it('should check the ability for routing in the UI', function() {
        // navigate to Signal Home Page
        cy.visit('http://localhost:3000');
        // verify - it is signsl home page
        cy.title().should('contain', 'Signals');
        // click on surch link
        cy.contains('Search').click();
        //verify the search page
        cy
            .get('button')
            .contains('Search')
            .should('be.exist');
        // click on Dashboard button
        cy.contains('Dashboard').click();
        //veriufy the dashbord page
        cy.get('.spectrum-Table').should('be.exist');
    });
});
