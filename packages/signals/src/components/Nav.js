import { NavLink, withRouter } from 'react-router-dom';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import styles from './Nav.css';
import React from 'react';

function Nav(props) {
    const routes = ['/', '/search'];
    const getSelectedIndex = () => routes.indexOf(props.location.pathname);
    const noOp = () => {};

    return (
        <TabList
            className={styles.tabList}
            selectedIndex={getSelectedIndex()}
            quiet
            variant="compact"
            onChange={noOp}>
            <Tab selected={props.location.pathname === '/'}>
                <NavLink to="/" className={styles.link} data-test="dashboard-nav-link">
                    Dashboard
                </NavLink>
            </Tab>
            <Tab selected={props.location.pathname === '/search'}>
                <NavLink to="/search" className={styles.link} data-test="search-nav-link">
                    Search
                </NavLink>
            </Tab>
        </TabList>
    );
}

export default withRouter(Nav);
