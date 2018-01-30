import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
    return (
        <ul className={styles.nav}>
            <li>
                <NavLink to="/dashboard" activeClassName={styles.active}>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-signals" activeClassName={styles.active}>
                    All Signals Search
                </NavLink>
            </li>
            <li>
                <NavLink to="/aa" activeClassName={styles.active}>
                    Adobe Analytics
                </NavLink>
            </li>
            <li>
                <NavLink to="/other" activeClassName={styles.active}>
                    Other Real-Time Signals
                </NavLink>
            </li>
            <li>
                <NavLink to="/onboarded" activeClassName={styles.active}>
                    Onboarded Signals
                </NavLink>
            </li>
        </ul>
    );
}

export default Nav;
