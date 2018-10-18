import React from 'react';
import PropTypes from 'prop-types';
import ComboBox from '@react/react-spectrum/ComboBox';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import Info from '@react/react-spectrum/Icon/Info';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Tooltip from '@react/react-spectrum/Tooltip';
import Button from '@react/react-spectrum/Button';
import styles from './AdvancedSearch.css';
import { getReportSuitesOptions } from '../utils/signalSourceOptions';

const AdvancedSearch = ({
    enabled,
    sourceName,
    onReportSuiteChange,
    onReportSuiteSelect,
    reportSuites,
}) => {
    const options = getReportSuitesOptions(reportSuites);

    const renderLabel = () => (
        <div className={styles.reportSuitesLabel}>
            <span>Report Suite &nbsp; </span>
            {/* TODO: Remove `style` attribute below after updating to latest react-spectrum. */}
            <OverlayTrigger
                trigger="hover"
                placement="right"
                style={{ 'word-break': 'break-word' }}>
                <Button quiet variant="tool" icon={<Info size="XS" />} />
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
