import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';

class TraitsCreation extends Component {
    render() {
        const {
            multiCreation,
            traitsCreationLabelText,
            selectedSignals,
            handleTraitsCreation,
        } = this.props;
        return multiCreation ? (
            <MultiSignalsTraitsCreation
                {...{ handleTraitsCreation, selectedSignals, traitsCreationLabelText }}
            />
        ) : (
            <SingleSignalTraitsCreation {...{ traitsCreationLabelText }} />
        );
    }
}

TraitsCreation.propTypes = {
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        warning: PropTypes.bool,
        records: PropTypes.array,
    }),
    traitsCreationLabelText: PropTypes.string,
    handleTraitsCreation: PropTypes.func,
};

export default TraitsCreation;
