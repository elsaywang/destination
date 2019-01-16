import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import SideNavFilter from '../components/SideNavFilter';
import styles from './Destinations.css';
import { integratedPlatformsOptions } from '../constants/integratedPlatformsOptions';
import { destinationCategories } from '../constants/destinations';
import { fetchDestinations, updateIntegratedPlatformType } from '../redux/actions/destinations';
import columnsForDestinationType from '../constants/columns';

class Destinations extends Component {
    renderCell = (column, data) => {
        return <span>{data[column.key]}</span>;
    };

    showSideNavFilter = () => {
        const { destinationType } = this.props;
        return destinationType === 'Integrated Platforms';
    };

    componentWillMount() {
        this.props.fetchDestinations();
    }

    handleSideNavFilterChange = e => {
        this.props.updateIntegratedPlatformType(e);
    };

    componentWillUnmount() {
        this.props.updateIntegratedPlatformType('');
    }

    render() {
        const { fetchDestinations, destinations, destinationType } = this.props;
        const { integratedPlatformType, list } = destinations;

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
        return (
            <div
                className={styles.destinationContainer}
                data-test={`${destinationType.toLowerCase()}-destinations`}>
                {this.showSideNavFilter() && renderSideNavFilter}
                <div className={styles.tableContainer}>
                    {destinations.requestInFlight ? (
                        <p>Loading</p>
                    ) : (
                        <Table
                            items={list}
                            reachedEndOfRows={fetchDestinations}
                            height={900}
                            columns={
                                columnsForDestinationType[integratedPlatformType || destinationType]
                            } //TODO: fix the columnName rendering issue when switch SideNavFilter
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
        list: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                enabled: PropTypes.bool,
                createdBy: PropTypes.string,
            }),
        ),
        integratedPlatformType: PropTypes.string,
    }),
    destinationType: PropTypes.oneOf(destinationCategories).isRequired,
};

const mapStateToProps = ({ destinations }) => ({
    destinations,
});
const actionCreators = { fetchDestinations, updateIntegratedPlatformType };

export { Destinations };

export default connect(
    mapStateToProps,
    actionCreators,
)(Destinations);
