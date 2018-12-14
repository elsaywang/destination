import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SideNav, SideNavItem, SideNavHeading } from '@react/react-spectrum/SideNav';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalTypeFilter.css';

class SignalTypeFilter extends Component {
    state = {
        value: 'ALL',
    };

    handleSignalTypeSelect = value => {
        this.setState({ value }, () => this.props.onSignalTypeChange(value));
    };

    render() {
        return (
            <Fragment>
                <Heading size={3} className={styles.heading}>
                    Filter by Signal Type
                </Heading>
                <SideNav
                    autoFocus
                    manageTabIndex
                    typeToSelect
                    defaultValue="Filter By Signal Type"
                    aria-label="Filter By Signal Types"
                    onSelect={this.handleSignalTypeSelect}>
                    <SideNavItem value="ALL">All</SideNavItem>
                    <SideNavHeading label="REAL-TIME SIGNALS">
                        <SideNavItem value="ANALYTICS">Adobe Analytics</SideNavItem>
                        <SideNavItem value="ALF">Actionable Log Files</SideNavItem>
                        <SideNavItem value="REALTIME">General Online Data</SideNavItem>
                    </SideNavHeading>
                    <SideNavHeading label="ONBOARDED SIGNALS">
                        <SideNavItem value="ONBOARDED">Onboarded Records</SideNavItem>
                    </SideNavHeading>
                </SideNav>
            </Fragment>
        );
    }
}

SignalTypeFilter.propTypes = {
    isSearched: PropTypes.bool,
    onSignalTypeChange: PropTypes.func,
    signalType: PropTypes.string,
};

export default SignalTypeFilter;
