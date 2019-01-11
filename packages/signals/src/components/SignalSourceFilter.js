import React from 'react';
import PropTypes from 'prop-types';
import Select from '@react/react-spectrum/Select';
import styles from './SignalSourceFilter.css';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import {
    getSignalSourceFilterPlaceholderText,
    getSignalSourcesOptions,
    getSignalSourceLabel,
} from '../utils/signalSourceOptions';

const SignalSourceFilter = ({
    disabled,
    sourceType,
    onSignalSourceSelect,
    signalSources,
    selectedSignalSource,
}) => {
    const filterPlaceholder = `Filter by ${getSignalSourceFilterPlaceholderText(sourceType)}`;
    const options = getSignalSourcesOptions(signalSources, sourceType);

    return (
        <FieldLabel label={getSignalSourceLabel(sourceType)}>
            <Select
                data-test={`${sourceType.toLowerCase()}-signal-source-filter`}
                className={styles.signalSourcesFilter}
                placeholder={filterPlaceholder}
                onChange={onSignalSourceSelect}
                options={options}
                flexible
                disabled={disabled}
                value={selectedSignalSource}
            />
        </FieldLabel>
    );
};

SignalSourceFilter.propTypes = {
    disabled: PropTypes.bool.isRequired,
    sourceType: PropTypes.string.isRequired,
    onSignalSourceSelect: PropTypes.func.isRequired,
    signalSources: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                dataSourceId: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ), //dataSources filter
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                suite: PropTypes.string.isRequired,
            }),
        ), //reportSuites filter
    ]).isRequired,
    selectedSignalSource: PropTypes.string,
};

export default SignalSourceFilter;
