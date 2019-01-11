import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '@react/react-spectrum/Icon/Alert';
import styles from './InlineErrorMessage.css';

const InlineErrorMessage = ({ isInvalid, errorMessage, className, showIcon = true }) => {
    if (isInvalid) {
        return (
            <span data-test="inline-error" className={classNames(styles.error, className)}>
                {showIcon && <Alert size="S" />}
                <span className={styles.errorMessage}>{errorMessage}</span>
            </span>
        );
    }

    return null;
};

InlineErrorMessage.propTypes = {
    isInvalid: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    className: PropTypes.string,
    showIcon: PropTypes.bool,
};

export default InlineErrorMessage;
