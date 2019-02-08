import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@react/react-spectrum/Menu';
import Dropdown from '@react/react-spectrum/Dropdown';
import Button from '@react/react-spectrum/Button';
import styles from './DropdownMenu.css';

const DropdownMenu = ({ onDropdownSelect, title, menuOptions, selectedValue }) => (
    <Dropdown onSelect={onDropdownSelect} className={styles.dropdown}>
        <Button variant="cta">{title}</Button>
        <Menu>
            {menuOptions.map(({ value, label }) => (
                <MenuItem
                    role="menuitemradio"
                    aria-checked
                    value={value}
                    key={value}
                    selected={selectedValue === value}>
                    {label}
                </MenuItem>
            ))}
        </Menu>
    </Dropdown>
);

DropdownMenu.propTypes = {
    title: PropTypes.string,
    onDropdownSelect: PropTypes.func,
    selectedValue: PropTypes.string,
    menuOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
};

export default DropdownMenu;
