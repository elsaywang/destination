import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '@react/react-spectrum/Icon/Alert';
import styles from './InlineErrorMessage.css';

const InlineErrorMessage = ({ isInvalid, errorMessage, className }) => {
    if (isInvalid) {
        return (
            <span data-test="inline-error" className={classNames(styles.error, className)}>
                <Alert size="S" /> <span className={styles.errorMessage}>{errorMessage}</span>
            </span>
        );
    }

    return null;
};

InlineErrorMessage.propTypes = {
    isInvalid: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default InlineErrorMessage;
