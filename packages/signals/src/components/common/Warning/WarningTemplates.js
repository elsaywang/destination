import React from 'react';
import PropTypes from 'prop-types';

export const SignalsSelectionWarningMessage = () => (
    <span>
        <strong>Real-Time</strong> and <strong>Onboarded Signals</strong> cannot be combined to
        create a trait.
    </span>
);

export const SignalsSelectionLimitMessage = ({ maxSignalSelections }) => (
    <span>
        Select up to <strong>{maxSignalSelections}</strong> signals to create a trait.
    </span>
);

export const OnboardedSignalSelectionWarningMessage = () => (
    <span>Select signals from the same Signal Source to create an Onboarded Trait.</span>
);

SignalsSelectionLimitMessage.propTypes = {
    maxSignalSelections: PropTypes.number.isRequired,
};
