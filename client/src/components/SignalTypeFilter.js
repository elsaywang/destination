import React, { Fragment } from 'react';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalTypeFilter.css';
import getSignalTypeOptions from '../constants/getSignalTypeOptions';

function SignalTypeFilter({ filter, counts, handleSignalTypeChange }) {
    const signalTypeOptions = getSignalTypeOptions(counts);
    const renderTabs = () =>
        signalTypeOptions.map(option => (
            <Tab key={option.value} selected={filter === option.value}>
                {option.label}
            </Tab>
        ));

    return (
        <Fragment>
            <Heading size={3} className={styles.heading}>
                Filter By Signal Type:
            </Heading>
            <TabList
                className={styles.signalType}
                orientation="vertical"
                onChange={handleSignalTypeChange}
                value={filter}>
                {renderTabs()}
            </TabList>
        </Fragment>
    );
}

export default SignalTypeFilter;
