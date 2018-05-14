import React from 'react';
import PropTypes from 'prop-types';
import styles from './InlineErrorMessage.css';

const InlineErrorMessage = ({ isInvalid, errorMessage }) => {
    if (isInvalid) {
        return (
            <span data-test="inline-error-message" className={styles.error}>
                {errorMessage}
            </span>
        );
    }

    return null;
};

InlineErrorMessage.propTypes = {
    isInvalid: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default InlineErrorMessage;
