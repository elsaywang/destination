import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmptyPlaceholder.css';
import classNames from 'classnames';
import Heading from '@react/react-spectrum/Heading';

function EmptyPlaceholder(props) {
    return (
        <div className={props.className} data-test="empty">
            {props.children}
            <Heading size={2} className={styles.title}>
                {props.title}
            </Heading>
            <div className={classNames(styles['message'], props.messageStyle)}>{props.message}</div>
        </div>
    );
}

EmptyPlaceholder.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default EmptyPlaceholder;
