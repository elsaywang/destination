import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import SideNavFilter from '../components/SideNavFilter';
import styles from './Destinations.css';
import { integratedPlatformsOptions } from '../constants/integratedPlatformsOptions';
import {
    destinationCategories,
    getCategoryByDestinationType,
    destinationTypeMap,
} from '../constants/destinations';
import {
    updateIntegratedPlatformType,
    applySort,
    applyFilter,
    fetchDestinations,
    fetchMoreDestinations,
    deleteDestination,
} from '../redux/actions/destinations';
import columnsForDestinationType from '../constants/columns';
import Actions from '../components/Actions';

class Destinations extends Component {
    renderCell = (column, data) => {
        const { destinationType } = data;
        const { key } = column;
        switch (key) {
            case 'action':
                return this.renderActionCell(data);
            case 'category':
                return <span>{getCategoryByDestinationType(destinationType)}</span>;
            case 'destinationType':
                return <span>{destinationTypeMap[destinationType]}</span>;
            default:
                return <span>{data[key]}</span>;
        }
    };

    renderActionCell = data => {
        const { currentDestination, deleteDestination } = this.props;
        const { name } = currentDestination;
        const currentRecordCategory = getCategoryByDestinationType(data.destinationType);

        const includeMetrics = this.isIntegratedPlatform(currentRecordCategory);

        return (
            <Actions
                destination={data}
                showMetrics={includeMetrics}
                handleDeleteDestination={deleteDestination}
            />
        );
    };

    isIntegratedPlatform = (category = this.props.currentDestination.name) =>
        category === 'Integrated Platforms';

    sortData = ({ column, direction }) => {
        this.props.applySort({ sortColumn: column, sortDirection: direction });
        this.props.fetchDestinations();
    };

    handleSideNavFilterChange = ({ serverTypes, value }) => {
        this.props.applyFilter(serverTypes);
        this.props.updateIntegratedPlatformType(value);
        this.props.fetchDestinations();
    };

    componentWillMount() {
        this.props.applyFilter(this.props.currentDestination.types);
        this.props.fetchDestinations();
    }

    componentWillUnmount() {
        this.props.updateIntegratedPlatformType('');
    }

    render() {
        const {
            fetchMoreDestinations,
            currentDestination,
            destinations: { integratedPlatformType, byIds, idsToDisplay, replacementDataInFlight },
        } = this.props;

        const renderSideNavFilter = (
            <div className={styles.filterListContainer}>
                <SideNavFilter
                    onFilterTypeChange={this.handleSideNavFilterChange}
                    filterType={integratedPlatformType}
                    isSearched={true}
                    filterOptions={integratedPlatformsOptions}
                />
            </div>
        );

        const destinationsList = idsToDisplay.map(id => byIds[id]);

        return (
            <div
                className={styles.destinationContainer}
                data-test={`${currentDestination.name
                    .toLowerCase()
                    .replace(/\W/g, '-')}-destinations`}>
                {this.isIntegratedPlatform() && renderSideNavFilter}
                <div className={styles.tableContainer}>
                    {replacementDataInFlight ? (
                        <p>Loading</p>
                    ) : (
                        <Table
                            dataTest="destination-list-table"
                            items={destinationsList}
                            onSortChange={this.sortData}
                            reachedEndOfRows={fetchMoreDestinations}
                            sortDescriptor={{
                                column: this.props.destinations.sortColumn,
                                direction: this.props.destinations.sortDirection,
                            }}
                            height={900}
                            columns={
                                columnsForDestinationType[
                                    integratedPlatformType || currentDestination.name
                                ]
                            }
                            rowHeight={250}
                            renderCell={this.renderCell}
                        />
                    )}
                </div>
            </div>
        );
    }
}

Destinations.propTypes = {
    fetchDestinations: PropTypes.func.isRequired,
    destinations: PropTypes.shape({
        byIds: PropTypes.shape({
            id: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                enabled: PropTypes.bool,
                createdBy: PropTypes.string,
            }),
        }),
        idsToDisplay: PropTypes.arrayOf(PropTypes.number),
        integratedPlatformType: PropTypes.string,
        sortColumn: PropTypes.object,
        sortDirection: PropTypes.oneOf([-1, 1]),
    }),
    currentDestination: PropTypes.shape({
        name: PropTypes.oneOf(destinationCategories).isRequired,
        types: PropTypes.array.isRequired,
        route: PropTypes.string.isRequired,
    }),
};

const mapStateToProps = ({ destinations }) => ({
    destinations,
});

const actionCreators = {
    fetchDestinations,
    fetchMoreDestinations,
    updateIntegratedPlatformType,
    deleteDestination,
    applySort,
    applyFilter,
};

export { Destinations };

export default connect(
    mapStateToProps,
    actionCreators,
)(Destinations);
