import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import styles from './SideNavFilter.css';

class SideNavFilter extends Component {
    state = {
        selectedIndex: 0,
    };

    componentDidUpdate(prevProps) {
        if (!this.props.isSearched && prevProps.isSearched) {
            this.setState({ selectedIndex: 0 });
        }
    }

    handleNavFilterChange = tabIndex => {
        const { filterOptions } = this.props;
        const { value } = filterOptions[tabIndex];
        this.setState({ selectedIndex: tabIndex }, () => this.props.onFilterTypeChange(value));
    };

    render() {
        const { filterOptions, filterType } = this.props;
        return (
            <div className={styles.filterType}>
                <TabList
                    orientation="vertical"
                    variant="compact"
                    quiet
                    value={this.state.value}
                    onSelect={this.handleNavFilterChange}>
                    {filterOptions.map(({ label, value }) => (
                        <Tab
                            data-test={`${value.toLowerCase()}-type-filter`}
                            selected={filterType === value}
                            key={value}
                            value={value}
                            className={styles.filterType}>
                            {label}
                        </Tab>
                    ))}
                </TabList>
            </div>
        );
    }
}

SideNavFilter.propTypes = {
    isSearched: PropTypes.bool,
    onFilterTypeChange: PropTypes.func,
    filterType: PropTypes.string,
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
};

export default SideNavFilter;
