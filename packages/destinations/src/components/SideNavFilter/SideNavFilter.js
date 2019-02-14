import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavLink, withRouter } from 'react-router-dom';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import styles from './SideNavFilter.css';

const SideNavFilter = ({ filterOptions, filterType, onFilterTypeChange, baseRoute }) => (
    <div className={styles.filterType} data-test="side-nav-filter">
        <TabList
            orientation="vertical"
            variant="compact"
            quiet
            selectedIndex={filterOptions.findIndex(
                ({ value, isDefault }) =>
                    (_.isEmpty(filterType) && isDefault) || value === filterType,
            )}
            onChange={tabIndex => onFilterTypeChange(filterOptions[tabIndex])}>
            {filterOptions.map(({ label, value, subroute }) => (
                <Tab
                    data-test={`${value.toLowerCase().replace(/\W/g, '-')}-type-filter`}
                    key={value}
                    value={value}
                    className={styles.filterType}>
                    <NavLink className={styles.link} to={baseRoute + subroute}>
                        {label}
                    </NavLink>
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

export default withRouter(SideNavFilter);
