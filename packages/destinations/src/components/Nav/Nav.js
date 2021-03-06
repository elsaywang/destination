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

const Nav = ({ location, routes }) => (
    <div className={styles.navList}>
        <GridRow valign="middle">
            <GridColumn size={6}>
                <TabList
                    quiet
                    variant="compact"
                    selectedIndex={routes.findIndex(({ route }) =>
                        location.pathname.includes(route),
                    )}>
                    {routes.map(({ route, name }) => (
                        <Tab key={route}>
                            <NavLink
                                to={route}
                                className={styles.link}
                                data-test={`${name.toLowerCase().replace(/\W/g, '-')}-nav-link`}>
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
                        to={'/administration/integrated-accounts'}
                        className={styles.buttonLink}
                        data-test={`configuration-button-link`}>
                        {`Integrated Accounts`}
                    </NavLink>
                </Button>
            </GridColumn>
        </GridRow>
    </div>
);

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
        () => ({}),
        {},
    )(Nav),
);
