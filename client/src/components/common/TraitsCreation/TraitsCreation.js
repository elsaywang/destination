import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';
import { createOnboardedTraitUrl, createRuleBasedTraitUrl } from '../../../utils/urls';
import { stringifySignals } from '../../../utils/stringifySignals';

class TraitsCreation extends Component {
    getCreateTraitUrl() {
        const { keyValuePairs, multiCreation, selectedSignals } = this.props;
        const signals = multiCreation ? selectedSignals.records : [{ keyValuePairs }];
        const signalsParams = {
            signals: stringifySignals(signals),
        };

        // TODO: go to Rule-based or Onboarded trait create page based on selected signals
        return createRuleBasedTraitUrl(signalsParams);
    }

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
                createTraitUrl={this.getCreateTraitUrl()}
            />
        ) : (
            <SingleSignalTraitsCreation
                {...{ traitsCreationLabelText }}
                createTraitUrl={this.getCreateTraitUrl()}
            />
        );
    }
}

TraitsCreation.propTypes = {
    keyValuePairs: PropTypes.array,
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    traitsCreationLabelText: PropTypes.string,
    handleTraitsCreation: PropTypes.func,
};

export default TraitsCreation;
