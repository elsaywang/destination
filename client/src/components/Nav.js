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
            variant="anchored"
            onChange={noOp}>
            <NavLink to="/">
                <Tab className={styles.tab} selected={props.location.pathname === '/'}>
                    Dashboard
                </Tab>
            </NavLink>
            <NavLink to="/search">
                <Tab className={styles.tab} selected={props.location.pathname === '/search'}>
                    Search
                </Tab>
            </NavLink>
        </TabList>
    );
}

export default withRouter(Nav);
