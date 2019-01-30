import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import SideNavFilter from '../components/SideNavFilter';
import styles from './Destinations.css';
import { integratedPlatformsOptions } from '../constants/integratedPlatformsOptions';
import { destinationCategories } from '../constants/destinations';
import {
    updateIntegratedPlatformType,
    applySort,
    fetchDestinations,
    fetchMoreDestinations,
    deleteDestination,
} from '../redux/actions/destinations';
import columnsForDestinationType from '../constants/columns';
import Actions from '../components/Actions';

class Destinations extends Component {
    renderCell = (column, data) => {
        if (column.key === 'action') {
            return this.renderActionCell(data);
        }
        return <span>{data[column.key]}</span>;
    };

    renderActionCell = data => {
        const { category } = data;
        const { destinationType, deleteDestination } = this.props;
        //TODO: this validation could be simplified once hooked with real-data
        const includeMetrics =
            destinationType === 'Integrated Platforms' ||
            (category === 'Integrated Platforms' && destinationType === 'All');

        return (
            <Actions
                destination={data}
                showMetrics={includeMetrics}
                handleDeleteDestination={deleteDestination}
            />
        );
    };

    showSideNavFilter = () => {
        const { destinationType } = this.props;
        return destinationType === 'Integrated Platforms';
    };

    sortData = ({ column, direction }) => {
        this.props.applySort({ sortColumn: column, sortDirection: direction });
        this.props.fetchDestinations();
    };

    handleSideNavFilterChange = e => {
        this.props.updateIntegratedPlatformType(e);
        this.props.fetchDestinations();
    };

    componentWillMount() {
        this.props.fetchDestinations();
    }

    componentWillUnmount() {
        this.props.updateIntegratedPlatformType('');
    }

    render() {
        const { fetchMoreDestinations, destinations, destinationType } = this.props;
        const { integratedPlatformType } = destinations;

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

        const destinationsList = destinations.idsToDisplay.map(id => destinations.byIds[id]);

        return (
            <div
                className={styles.destinationContainer}
                data-test={`${destinationType.toLowerCase()}-destinations`}>
                {this.showSideNavFilter() && renderSideNavFilter}
                <div className={styles.tableContainer}>
                    {destinations.replacementDataInFlight ? (
                        <p>Loading</p>
                    ) : (
                        <Table
                            dataTest="peopleBased-destination-table"
                            items={destinationsList}
                            onSortChange={this.sortData}
                            reachedEndOfRows={fetchMoreDestinations}
                            sortDescriptor={{
                                column: this.props.destinations.sortColumn,
                                direction: this.props.destinations.sortDirection,
                            }}
                            height={900}
                            columns={
                                columnsForDestinationType[integratedPlatformType || destinationType]
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
    destinationType: PropTypes.oneOf(destinationCategories).isRequired,
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
};

export { Destinations };

export default connect(
    mapStateToProps,
    actionCreators,
)(Destinations);
