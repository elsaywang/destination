import React from 'react';
import PropTypes from 'prop-types';
import styles from './WarningMessage.css';
import Alert from '@react/react-spectrum/Icon/Alert';

const SignalsSelectionWarningMessageBody = () => (
    <span className={styles.messageBody}>
        We can’t create traits from signals of different types. Try again using signals all from
        either <b> Real-Time Signals </b> or <b> Onboarded Signals </b>.
    </span>
);

export const messageBodyTemplateMapping = {
    signalsSelection: <SignalsSelectionWarningMessageBody />,
};

export const WarningMessage = ({ warningType }) => {
    return (
        <div className={styles.warningMessage}>
            <Alert size="S" variant="warning" />
            {messageBodyTemplateMapping[warningType]}
        </div>
    );
};

WarningMessage.propTypes = {
    warningType: PropTypes.string,
};
export default WarningMessage;
