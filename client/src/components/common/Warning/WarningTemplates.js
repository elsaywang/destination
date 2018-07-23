import React from 'react';
import PropTypes from 'prop-types';

export const SignalsSelectionWarningMessage = () => (
    <span>
        We can’t create traits from signals of different types. Try again using signals all from
        either <strong> Real-Time Signals </strong> or <strong> Onboarded Signals</strong>.
    </span>
);

export const SignalsSelectionLimitMessage = ({ maxSignalSelections }) => (
    <span>
        You may select up to <strong>{maxSignalSelections}</strong> Signals. Only the first{' '}
        <strong>{maxSignalSelections}</strong> selected signals will be used to create a trait.
    </span>
);

SignalsSelectionLimitMessage.propTypes = {
    maxSignalSelections: PropTypes.number.isRequired,
};
