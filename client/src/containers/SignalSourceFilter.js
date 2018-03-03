import React, { Fragment } from 'react';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalSourceFilter.css';

function SignalSourceFilter({ counts, handleSignalSourceChange }) {
    return (
        <Fragment>
            <Heading size={3} className={styles.heading}>
                Filter By Signal Source:
            </Heading>
            <TabList
                className={styles.tabList}
                orientation="vertical"
                onChange={handleSignalSourceChange}>
                <Tab>All ({counts.all})</Tab>
                <Tab>Adobe Analytics ({counts.adobeAnalytics})</Tab>
                <Tab>Actionable Log Files ({counts.actionableLogFiles})</Tab>
                <Tab>General Online Data ({counts.generalOnlineData})</Tab>
                <Tab>Onboarded Records ({counts.onboardedRecords})</Tab>
            </TabList>
        </Fragment>
    );
}

export default SignalSourceFilter;
