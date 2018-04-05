import React from 'react';
import styles from './Warning.css';

export const SignalsSelectionWarningMessage = () => (
    <span className={styles.messageBody}>
        We can’t create traits from signals of different types. Try again using signals all from
        either <strong> Real-Time Signals </strong> or <strong> Onboarded Signals </strong>.
    </span>
);
