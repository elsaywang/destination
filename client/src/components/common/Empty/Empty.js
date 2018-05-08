import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Empty.css';
import { GridRow, GridColumn } from '@react/react-spectrum/Grid';
import Heading from '@react/react-spectrum/Heading';

function Empty(props) {
    return (
        <div className={props.className}>
            {props.children}
            <Heading size={2} className={styles.title}>
                {props.title}
            </Heading>
            <div className={styles.message}>{props.message}</div>
        </div>
    );
}

Empty.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};

export default Empty;
