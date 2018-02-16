import { NavLink, withRouter } from 'react-router-dom';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import React from 'react';

function Nav(props) {
    const routes = ['/', '/search'];
    const getSelectedIndex = () => {
        return routes.indexOf(props.location.pathname);
    };
    const noOp = () => {};

    return (
        <TabList selectedIndex={getSelectedIndex()} variant="anchored" onChange={noOp}>
            <NavLink to="/">
                <Tab selected={props.location.pathname === '/'}>Dashboard</Tab>
            </NavLink>
            <NavLink to="/search">
                <Tab selected={props.location.pathname === '/search'}>Search</Tab>
            </NavLink>
        </TabList>
    );
}

export default withRouter(Nav);