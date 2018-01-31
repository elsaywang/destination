import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Tab, TabList } from '@react/react-spectrum/TabList';

function Nav(props) {
    const routes = ['/dashboard', '/all-signals', '/aa', '/other', 'onboarded'];
    const getSelectedIndex = () => {
        return routes.indexOf(props.location.pathname);
    };

    return (
        <TabList selectedIndex={getSelectedIndex()} orientation="vertical">
            <NavLink to="/dashboard">
                <Tab selected={props.location.pathname === '/dashboard'}>Dashboard</Tab>
            </NavLink>
            <NavLink to="/all-signals">
                <Tab selected={props.location.pathname === '/all-signals'}>All Signals Search</Tab>
            </NavLink>
            <NavLink to="/aa">
                <Tab selected={props.location.pathname === '/aa'}>Adobe Analytics</Tab>
            </NavLink>
            <NavLink to="/other">
                <Tab selected={props.location.pathname === '/other'}>Other Real-Time Signals</Tab>
            </NavLink>
            <NavLink to="/onboarded">
                <Tab selected={props.location.pathname === '/onboarded'}>Onboarded Signals</Tab>
            </NavLink>
        </TabList>
    );
}

export default withRouter(Nav);
