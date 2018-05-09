import React from 'react';
import PropTypes from 'prop-types';
import ComboBox from '@react/react-spectrum/ComboBox';
import styles from './AdvancedSearch.css';

const AdvancedSearch = ({ enabled, sourceName, onFilterChange, onFilterSelect, reportSuites }) => {
    const options = reportSuites.map(rs => rs.name);

    return (
        <div className={styles.reportSuitesFilter} data-test="advanced-search">
            <span>Search and see results in friendly names: &nbsp;</span>
            <ComboBox
                value={enabled ? sourceName : ''}
                data-test="advanced-search-filter"
                placeholder="Filter by report suite"
                onChange={onFilterChange}
                onSelect={value => onFilterSelect(value)}
                options={options}
                disabled={!enabled}
                quiet
            />
        </div>
    );
};

AdvancedSearch.propTypes = {
    enabled: PropTypes.bool.isRequired,
    sourceName: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
    onFilterSelect: PropTypes.func.isRequired,
    reportSuites: PropTypes.array.isRequired,
};

export default AdvancedSearch;
