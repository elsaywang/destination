import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmptyState.css';
import DefaultEmptyStateIcon from './DefaultEmptyStateIcon';

const EmptyState = ({ primaryMessage, secondaryMessage, children, icon: Icon }) => (
    <div className={styles.content} data-test="empty-state">
        <Icon size="XXL" />
        <PrimaryMessage message={primaryMessage} />
        {secondaryMessage && <SecondaryMessage message={secondaryMessage} />}
        {children && { children }}
    </div>
);

const PrimaryMessage = ({ message }) => <div className={styles.primaryMessage}>{message}</div>;

const SecondaryMessage = ({ message }) => (
    <div className={styles.secondaryMessage}>
        <p>{message}</p>
    </div>
);


EmptyState.propTypes = {
    primaryMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    secondaryMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    icon: PropTypes.func,
};

EmptyState.defaultProps = {
    secondaryMessage: null,
    icon: DefaultEmptyStateIcon,
};

export { PrimaryMessage, SecondaryMessage };
export default EmptyState;
