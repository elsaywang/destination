import React from 'react';
import PropTypes from 'prop-types';
import styles from './Warning.css';

const WarningMessage = ({ content }) => <span className={styles.messageBody}>{content}</span>;

WarningMessage.propTypes = {
    content: PropTypes.string,
};
export default WarningMessage;
