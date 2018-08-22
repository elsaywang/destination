import React from 'react';
import PropTypes from 'prop-types';
import ComboBox from '@react/react-spectrum/ComboBox';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import Info from '@react/react-spectrum/Icon/Info';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Tooltip from '@react/react-spectrum/Tooltip';
import styles from './AdvancedSearch.css';

const AdvancedSearch = ({
    enabled,
    sourceName,
    onReportSuiteChange,
    onReportSuiteSelect,
    reportSuites,
}) => {
    const options = reportSuites.map(rs => rs.suite);
    const renderLabel = () => (
        <div>
            Report Suite &nbsp;
            <OverlayTrigger trigger="hover" placement="right">
                <Info size="XS" />
                <Tooltip>
                    Please select a report suite to show key suggestions for Analytics variables.
                </Tooltip>
            </OverlayTrigger>
        </div>
    );

    return (
        <div className={styles.reportSuitesFilter} data-test="advanced-search">
            <FieldLabel label={renderLabel()}>
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
            </FieldLabel>
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
