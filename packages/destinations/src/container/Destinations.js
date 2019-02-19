import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Table from '../components/Table';
import SideNavFilter from '../components/SideNavFilter';
import styles from './Destinations.css';
import { integratedPlatformsOptions } from '../constants/integratedPlatformsOptions';
import { destinationsMap } from '../constants/destinations';
import * as tableActionCreators from '../redux/actions/tableActions';
import * as destinationActionCreators from '../redux/actions/destinations';
import columnsForDestinationType from '../constants/columns';
import Actions from '../components/Actions';
import { updateUrl } from '../utils/updateUrl';
import { allColumnTypes } from '../constants/columns';

class Destinations extends Component {
    renderCell = (column, data) => {
        const { destinationType } = data;
        const { category, name } = destinationsMap[destinationType];
        const { key } = column;

        switch (key) {
            case 'action':
                return this.renderActionCell(data);
            case 'category':
                return <span>{category}</span>;
            case 'destinationType':
                return <span>{name}</span>;
            default:
                return <span>{data[key]}</span>;
        }
    };

    renderActionCell = data => {
        const currentRecordCategory = destinationsMap[data.destinationType].category;
        return (
            <div>
                <Actions
                    destination={data}
                    showMetrics={this.isIntegratedPlatform(currentRecordCategory)}
                    handleDeleteAction={this.props.deleteDestination}
                    isForDestination
                />
            </div>
        );
    };

    isIntegratedPlatform = category => category === 'Integrated Platforms';

    sortData = ({ column, direction }) => {
        updateUrl(this.props.history, { sort: direction === 1 ? column.key : `-${column.key}` });
    };

    componentWillUnmount() {
        this.props.updateIntegratedPlatformType('');
    }

    render() {
        const {
            fetchMoreDestinations,
            currentDestination,
            destinations: {
                integratedPlatformType,
                byIds,
                idsToDisplay,
                replacementDataInFlight,
                sortColumn,
                sortDirection,
            },
        } = this.props;

        const renderSideNavFilter = (
            <div className={styles.filterListContainer}>
                <SideNavFilter
                    filterType={integratedPlatformType}
                    isSearched={true}
                    baseRoute={this.props.currentDestination.route}
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
                {this.isIntegratedPlatform(currentDestination.name) && renderSideNavFilter}
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
                                column: allColumnTypes.find(({ key }) => key === sortColumn),
                                direction: sortDirection,
                            }}
                            height={800}
                            columns={
                                columnsForDestinationType[
                                    integratedPlatformType || currentDestination.name
                                ]
                            }
                            rowHeight={100}
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
        sortColumn: PropTypes.string,
        sortDirection: PropTypes.oneOf([-1, 1]),
    }),
    currentDestination: PropTypes.shape({
        types: PropTypes.array.isRequired,
        route: PropTypes.string.isRequired,
    }),
};

const mapStateToProps = ({ destinations }) => ({
    destinations,
});

export { Destinations };

export default withRouter(
    connect(
        mapStateToProps,
        {
            ...destinationActionCreators,
            ...tableActionCreators,
        },
    )(Destinations),
);
