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
            onChange={noOp}>
            <Tab className={styles.tab} selected={props.location.pathname === '/'}>
                <NavLink to="/" className={styles.link}>
                    Dashboard
                </NavLink>
            </Tab>
            <Tab className={styles.tab} selected={props.location.pathname === '/search'}>
                <NavLink to="/search" className={styles.link}>
                    Search
                </NavLink>
            </Tab>
        </TabList>
    );
}

export default withRouter(Nav);
