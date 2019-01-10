import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table from '../components/Table';
import { columns, mockItems } from '../constants/tableData';
import SideNavFilter from '../components/SideNavFilter';
import Search from '@react/react-spectrum/Search';
import styles from './Destinations.css';
import { peopleBasedDestinationsTypeOptions } from '../constants/peopleBasedDestinationsOptions';

class Destinations extends Component {
    renderCell = (column, data) => {
        return <span>{data[column.key]}</span>;
    };

    showSideNavFilter = () => {
        const { destinationType } = this.props;
        return ['People-Based', 'Device-Based'].includes(destinationType);
    };

    render() {
        const { destinationType, items } = this.props;
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
                    <Table
                        dataTest="peopleBased-destination-table"
                        items={items || mockItems}
                        columns={columns}
                        renderCell={this.renderCell}
                        allowsSelection={false}
                    />
                </div>
            </div>
        );
    }
}

Destinations.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            enabled: PropTypes.bool,
            createdBy: PropTypes.string,
        }),
    ),
    destinationType: PropTypes.string.isRequired,
};
export default Destinations;
