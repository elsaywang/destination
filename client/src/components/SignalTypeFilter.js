import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SideNav, SideNavItem, SideNavHeading } from '@react/react-spectrum/SideNav';
import Heading from '@react/react-spectrum/Heading';
import styles from './SignalTypeFilter.css';
import { signalTypeOptions, categoryTypes } from '../constants/signalTypeOptions';

class SignalTypeFilter extends Component {
    state = {
        value: 'ALL',
    };

    componentDidUpdate(prevProps) {
        if (!this.props.isSearched && prevProps.isSearched) {
            this.setState({ value: 'ALL' });
        }
    }

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
                    value={this.state.value}
                    aria-label="Filter By Signal Types"
                    onSelect={this.handleSignalTypeSelect}>
                    <SideNavItem data-test="all-signal-type-filter" value="ALL">
                        All
                    </SideNavItem>
                    {categoryTypes.map(categoryType => (
                        <SideNavHeading label={`${categoryType} SIGNALS`} key={categoryType}>
                            {signalTypeOptions.reduce((acc, option) => {
                                if (option.category === categoryType) {
                                    acc.push(
                                        <SideNavItem
                                            value={option.value}
                                            key={option.value}
                                            data-test={`${option.value.toLowerCase()}-signal-type-filter`}>
                                            {option.label}
                                        </SideNavItem>,
                                    );
                                }
                                return acc;
                            }, [])}
                        </SideNavHeading>
                    ))}
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
