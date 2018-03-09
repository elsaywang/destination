import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalTypeFilter.css';
import getSignalTypeOptions from '../constants/getSignalTypeOptions';

class SignalTypeFilter extends Component {
    render() {
        return (
            <Fragment>
                <Heading size={3} className={styles.heading}>
                    Filter By Signal Type:
                </Heading>
                <TabList
                    className={styles.signalType}
                    orientation="vertical"
                    onChange={this.handleSignalTypeChange}
                    value={this.props.signalType}>
                    {this.renderTabs()}
                </TabList>
            </Fragment>
        );
    }

    renderTabs = () => {
        const { counts, signalType } = this.props;
        const signalTypeOptions = getSignalTypeOptions(counts);

        return signalTypeOptions.map(option => (
            <Tab key={option.value} selected={signalType === option.value}>
                {option.label}
            </Tab>
        ));
    };

    handleSignalTypeChange = tabIndex => {
        const { counts, onSignalTypeChange } = this.props;
        const signalTypeOptions = getSignalTypeOptions(counts);
        const { value } = signalTypeOptions[tabIndex];

        onSignalTypeChange(value);
    };
}

SignalTypeFilter.propTypes = {
    counts: PropTypes.object,
    onSignalTypeChange: PropTypes.func,
    signalType: PropTypes.string,
};

export default SignalTypeFilter;
