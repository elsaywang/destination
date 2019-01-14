import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import { columns } from '../constants/tableData';
import SideNavFilter from '../components/SideNavFilter';
import Search from '@react/react-spectrum/Search';
import styles from './Destinations.css';
import { peopleBasedDestinationsTypeOptions } from '../constants/peopleBasedDestinationsOptions';
import { fetchDestinations } from '../redux/actions/destinations';

class Destinations extends Component {
    renderCell = (column, data) => {
        return <span>{data[column.key]}</span>;
    };

    showSideNavFilter = () => {
        const { destinationType } = this.props;
        return ['People-Based', 'Device-Based'].includes(destinationType);
    };

    componentWillMount() {
        this.props.fetchDestinations();
    }

    render() {
        const { fetchDestinations, destinations, destinationType } = this.props;

        const renderSideNavFilter = (
            <div className={styles.filterListContainer}>
                <SideNavFilter
                    onFilterTypeChange={() => {}}
                    filterType={'ALL'}
                    isSearched={true}
                    filterOptions={peopleBasedDestinationsTypeOptions}
                />
            </div>
        );
        return (
            <div
                style={{ display: 'flex' }}
                data-test={`${destinationType.toLowerCase()}-destinations`}>
                {this.showSideNavFilter() && renderSideNavFilter}
                <div className={styles.tableContainer}>
                    <div className={styles.search}>
                        <Search placeholder="Search" onChange={() => {}} onSubmit={() => {}} />
                    </div>

                    {destinations.requestInFlight ? (
                        <p>Loading</p>
                    ) : (
                        <Table
                            dataTest="peopleBased-destination-table"
                            items={destinations.list}
                            reachedEndOfRows={fetchDestinations}
                            height={500}
                            columns={columns}
                            rowHeight={500}
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
    }),
    destinationType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ destinations }) => ({
    destinations,
});
const actionCreators = { fetchDestinations };

export { Destinations };

export default connect(
    mapStateToProps,
    actionCreators,
)(Destinations);
