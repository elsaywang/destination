import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@react/react-spectrum/Select';
import styles from './SignalSourceFilter.css';
import {
    getSignalSourceFilterPlaceholderText,
    getSignalSourcesOptions,
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
        <Select
            data-test="signal-source-filter"
            className={styles.signalSourcesFilter}
            placeholder={filterPlaceholder}
            onChange={onSignalSourceSelect}
            options={options}
            className={styles.signalSourceSelect}
            flexible
            disabled={disabled}
            value={selectedSignalSource}
        />
    );
};

SignalSourceFilter.propTypes = {
    disabled: PropTypes.bool.isRequired,
    sourceType: PropTypes.string.isRequired,
    onSignalSourceSelect: PropTypes.func.isRequired,
    signalSources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            dataSourceId: PropTypes.number,
        }),
    ).isRequired,
    selectedSignalSource: PropTypes.number,
};

export default SignalSourceFilter;
