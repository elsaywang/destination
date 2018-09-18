import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@react/react-spectrum/Select';
import styles from './DataSourceFilter.css';
import { formatDataSourceLabel } from '../utils/dataSourceOptions';

class DataSourceFilter extends Component {
    render() {
        const { onDataSourceSelect, dataSources, selectedDataSource } = this.props;
        const filterPlaceholder = `Filter by Onboarded Records`;
        const options = dataSources.map(({ dataSourceId, name }) => ({
            label: formatDataSourceLabel(dataSourceId, name),
            value: dataSourceId,
        }));

        return (
            <Select
                data-test="data-source-filter"
                className={styles.dataSourcesFilter}
                placeholder={filterPlaceholder}
                onChange={onDataSourceSelect}
                options={options}
                className={styles.dataSourceSelect}
                flexible
                value={selectedDataSource}
            />
        );
    }
}

DataSourceFilter.propTypes = {
    onDataSourceSelect: PropTypes.func.isRequired,
    dataSources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            dataSourceId: PropTypes.number,
        }),
    ).isRequired,
    selectedDataSource: PropTypes.number,
};

export default DataSourceFilter;
