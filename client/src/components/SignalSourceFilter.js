import React, { Fragment } from 'react';
import { TabList, Tab } from '@react/react-spectrum/TabList';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalSourceFilter.css';
import getSignalSourceOptions from '../constants/getSignalSourceOptions';

function SignalSourceFilter({ filter, counts, handleSignalSourceChange }) {
    const signalSourceOptions = getSignalSourceOptions(counts);
    const renderTabs = () => {
        return signalSourceOptions.map(option => (
            <Tab selected={filter === option.value}>{option.label}</Tab>
        ));
    };

    return (
        <Fragment>
            <Heading size={3} className={styles.heading}>
                Filter By Signal Source:
            </Heading>
            <TabList
                className={styles.signalSource}
                orientation="vertical"
                onChange={handleSignalSourceChange}
                value={filter}>
                {renderTabs()}
            </TabList>
        </Fragment>
    );
}

export default SignalSourceFilter;
