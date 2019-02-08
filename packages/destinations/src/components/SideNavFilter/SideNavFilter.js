import React from 'react';
import PropTypes from 'prop-types';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import styles from './SideNavFilter.css';

const SideNavFilter = ({ filterOptions, filterType, onFilterTypeChange }) => (
    <div className={styles.filterType} data-test="side-nav-filter">
        <TabList
            orientation="vertical"
            variant="compact"
            quiet
            onChange={tabIndex => onFilterTypeChange(filterOptions[tabIndex])}>
            {filterOptions.map(({ label, value }) => (
                <Tab
                    data-test={`${value.toLowerCase().replace(/\W/g, '-')}-type-filter`}
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
