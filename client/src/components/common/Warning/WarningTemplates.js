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

export const OnboardedSignalSelectionWarningMessage = () => (
    <span>
        Sorry, you can only create an onboarded trait from multiple onboarded signals if they all
        share the same data source.
    </span>
);

SignalsSelectionLimitMessage.propTypes = {
    maxSignalSelections: PropTypes.number.isRequired,
};
