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
        You may only allow to select up to <strong>{maxSignalSelections}</strong> signals to create
        traits.
    </span>
);

SignalsSelectionLimitMessage.propTypes = {
    maxSignalSelections: PropTypes.number.isRequired,
};
