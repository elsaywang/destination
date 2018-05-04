import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalTypeFilter.css';
import { getSignalTypeOptions } from '../constants/signalTypeOptions';

class SignalTypeFilter extends Component {
    state = {
        counts: {
            ALL: 72093,
            ANALYTICS: 34300,
            ALF: 359,
            REALTIME: 27,
            ONBOARDED: 37407,
        },
    };

    handleSignalTypeChange = tabIndex => {
        const signalTypeOptions = getSignalTypeOptions(this.state.counts);
        const { value } = signalTypeOptions[tabIndex];

        this.props.onSignalTypeChange(value);
    };

    renderTabs = () => {
        const signalTypeOptions = getSignalTypeOptions(this.state.counts);

        return signalTypeOptions.map(option => (
            <Tab key={option.value} selected={this.props.signalType === option.value}>
                {option.label}
            </Tab>
        ));
    };

    render() {
        return (
            <Fragment>
                <Heading size={3} className={styles.heading}>
                    Filter by Signal Type
                </Heading>
                <TabList
                    className={styles.signalType}
                    orientation="vertical"
                    variant="compact"
                    onChange={this.handleSignalTypeChange}
                    value={this.props.signalType}>
                    {this.renderTabs()}
                </TabList>
            </Fragment>
        );
    }
}

SignalTypeFilter.propTypes = {
    counts: PropTypes.object,
    onSignalTypeChange: PropTypes.func,
    signalType: PropTypes.string,
};

export default SignalTypeFilter;
