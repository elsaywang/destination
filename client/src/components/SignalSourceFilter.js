import React, { Fragment } from 'react';
import SelectList from '@react/react-spectrum/SelectList';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalSourceFilter.css';
import getSignalSourceOptions from '../constants/getSignalSourceOptions';

function SignalSourceFilter({ filter, counts, handleSignalSourceChange }) {
    const signalSourceOptions = getSignalSourceOptions(counts);

    return (
        <Fragment>
            <Heading size={3} className={styles.heading}>
                Filter By Signal Source:
            </Heading>
            <SelectList
                onChange={handleSignalSourceChange}
                options={signalSourceOptions}
                value={filter}
            />
        </Fragment>
    );
}

export default SignalSourceFilter;
