import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, TabList } from '@react/react-spectrum/TabList';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import styles from './Nav.css';
import Settings from '@react/react-spectrum/Icon/Settings';
import Button from '@react/react-spectrum/Button';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchDestinations, applyFilter } from '../../redux/actions/destinations';

function Nav({ location, routes, applyFilter }) {
    const tabRoutes = routes.filter(({ route }) => route !== '/');

    const getSelectedIndex = () => tabRoutes.map(({ route }) => route).indexOf(location.pathname);

    return (
        <div className={styles.navList}>
            <GridRow valign="middle">
                <GridColumn size={6}>
                    <TabList
                        selectedIndex={getSelectedIndex()}
                        quiet
                        variant="compact"
                        onChange={indexSelected => applyFilter(tabRoutes[indexSelected].types)}>
                        {tabRoutes.map(({ route, name }) => (
                            <Tab selected={location.pathname === route} key={route}>
                                <NavLink
                                    to={route}
                                    className={styles.link}
                                    data-test={`${name.toLowerCase()}-nav-link`}>
                                    {name}
                                </NavLink>
                            </Tab>
                        ))}
                    </TabList>
                </GridColumn>
                <GridColumn
                    className={classNames(styles.configButton, 'configuration-button')}
                    size={6}>
                    <Button quiet variant="secondary" icon={<Settings size="S" />}>
                        <NavLink
                            to={'/destinations/configuration'}
                            className={styles.buttonLink}
                            data-test={`configuration-button-link`}>
                            {`Configuration`}
                        </NavLink>
                    </Button>
                </GridColumn>
            </GridRow>
        </div>
    );
}

Nav.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            route: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
    ),
};

const RouterWrappedNav = withRouter(Nav);

export { RouterWrappedNav };

export default withRouter(
    connect(
        () => {},
        { fetchDestinations, applyFilter },
    )(Nav),
);
