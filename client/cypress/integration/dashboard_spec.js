describe('Dashboard Integration Tests', function() {
    it('should navigate user to dashboard after clicking Signals on top nav', function() {
        cy.visit('/');
        cy.title().should('contain', 'Signals');
    });

    xit('should show a list of saved search tables on the dashboard', function() {
        cy.get('[data-test="saved-search-dashboard"]').should('exist');
    });

    describe('Preset saved searches', () => {
        it('should render first when user-defined saved searches exist', () => {});

        it('should render when no user-defined saved searches exist', () => {});

        it('clicking "View More" for "Top Unused Signals" should populate form correctly and call correct search', () => {});

        it('clicking "View More" for "New Unused Signals" should populate form correctly and call correct search, including `filterNewSignals: true`', () => {});
    });
});
