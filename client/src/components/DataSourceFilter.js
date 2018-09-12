import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@react/react-spectrum/Select';
import styles from './DataSourceFilter.css';
import { getSignalTypeLabel } from '../constants/signalTypeOptions';
import { dataSourceOption } from '../utils/dataSourceOptions';

class DataSourceFilter extends Component {
    render() {
        const { signalType, onDataSourceSelect, dataSources, selectedDataSource } = this.props;
        const filterPlaceholder = `Filter by ${getSignalTypeLabel(signalType).toLowerCase()}`;
        const options = dataSources.map(({ dataSourceId, name }) => ({
            label: dataSourceOption(dataSourceId, name),
            value: dataSourceOption(dataSourceId, name),
        }));

        return (
            <div className={styles.dataSourcesFilter} data-test="seach-results-filter">
                <Select
                    data-test="data-source-filter"
                    placeholder={filterPlaceholder}
                    onChange={onDataSourceSelect}
                    options={options}
                    className={styles.dataSourceSelect}
                    flexible
                    quiet
                    value={selectedDataSource}
                />
            </div>
        );
    }
}

DataSourceFilter.propTypes = {
    signalType: PropTypes.string.isRequired,
    onDataSourceSelect: PropTypes.func.isRequired,
    dataSources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            dataSourceId: PropTypes.number,
        }),
    ).isRequired,
    selectedDataSource: PropTypes.string.isRequired,
};

export default DataSourceFilter;
