import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';
import { createOnboardedTraitUrl, createRuleBasedTraitUrl } from '../../../utils/urls';
import { stringifySignals } from '../../../utils/stringifySignals';

class TraitsCreation extends Component {
    getCreateTraitURL() {
        const { dataType, keyValuePairs, multiCreation, selectedSignals } = this.props;
        const signals = multiCreation ? selectedSignals.records : [{ keyValuePairs }];
        const signalsParams = {
            signals: stringifySignals(signals),
        };

        return dataType === 'ONBOARDED'
            ? createOnboardedTraitUrl(signalsParams)
            : createRuleBasedTraitUrl(signalsParams);
    }

    getLinkText() {
        const { dataType } = this.props;

        return dataType === 'ONBOARDED' ? 'Create Onboarded Trait' : 'Create Rule-Based Trait';
    }

    render() {
        const { dataType, multiCreation, selectedSignals, handleTraitsCreation } = this.props;

        const createTraitUrl = this.getCreateTraitURL();

        return multiCreation ? (
            <MultiSignalsTraitsCreation
                {...{ createTraitUrl, handleTraitsCreation, selectedSignals }}
            />
        ) : (
            <SingleSignalTraitsCreation
                {...{ createTraitUrl }}
                traitsCreationLabelText={this.getLinkText()}
            />
        );
    }
}

TraitsCreation.propTypes = {
    dataType: PropTypes.string,
    keyValuePairs: PropTypes.array,
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    handleTraitsCreation: PropTypes.func,
};

export default TraitsCreation;
