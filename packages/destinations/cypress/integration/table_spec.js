import columnsForDestinationType from '../../src/constants/columns';
import { routes } from '../../src/constants/navTab';
import destinationsResponse from '../fixtures/destinations.json';

describe('Integration Tests for table', function() {
    describe('when routing to Destinations Dashboard (home) URL', () => {
        beforeEach(() => {
            cy.seedAndLoadDestinationPage()
        });

        it('should render a row for each item in destinations.json', () => {
            // + 1 because column header also uses .react-spectrum-TableView-row
            cy.get('.react-spectrum-TableView-row').should(
                'have.length',
                destinationsResponse.list.length + 1,
            );
        });

        xit('should make a sort query when column header cell is clicked', () => {
            let sortAPICallCount = 0;
            cy.route('get', '**sortBy**', () => {
                sortAPICallCount++;
            });
            const selectedRoute = routes.find(r => `#${r.route}` === URL_SLUG) || routes[0];

            columnsForDestinationType[selectedRoute.name].forEach(({ title }) => {
                cy.contains(title).click();
            });

            const sortableColumns = Object.values(columnsForDestinationType).filter(
                ({ sortable }) => sortable === true,
            );

            expect(sortableColumns.length).to.equal(sortAPICallCount);
        });
    });
});
