import React from 'react';
import PropTypes from 'prop-types';
import styles from './Empty.css';
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
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default Empty;
