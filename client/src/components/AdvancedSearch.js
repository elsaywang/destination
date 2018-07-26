import React from 'react';
import PropTypes from 'prop-types';
import ComboBox from '@react/react-spectrum/ComboBox';
import styles from './AdvancedSearch.css';

const AdvancedSearch = ({
    enabled,
    sourceName,
    onReportSuiteChange,
    onReportSuiteSelect,
    reportSuites,
}) => {
    const options = reportSuites.map(rs => rs.suite);

    return (
        <div className={styles.reportSuitesFilter} data-test="advanced-search">
            <span>Search and see results in friendly names: &nbsp;</span>
            <ComboBox
                value={enabled ? sourceName : ''}
                data-test="advanced-search-filter"
                placeholder="Filter by report suite"
                onChange={onReportSuiteChange}
                onSelect={value => onReportSuiteSelect(value)}
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
    onReportSuiteChange: PropTypes.func.isRequired,
    onReportSuiteSelect: PropTypes.func.isRequired,
    reportSuites: PropTypes.array.isRequired,
};

export default AdvancedSearch;
