import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';
import { createOnboardedTraitUrl, createRuleBasedTraitUrl } from '../../../utils/urls';
import { stringifySignals } from '../../../utils/stringifySignals';

class TraitsCreation extends Component {
    getCreateTraitURL() {
        const { categoryType, keyValuePairs, multiCreation, selectedSignals } = this.props;
        const signals = multiCreation ? selectedSignals.records : [{ keyValuePairs }];
        const signalsParams = {
            signals: stringifySignals(signals),
        };

        return categoryType === 'ONBOARDED'
            ? createOnboardedTraitUrl(signalsParams)
            : createRuleBasedTraitUrl(signalsParams);
    }

    getLinkText() {
        const { categoryType } = this.props;

        return categoryType === 'ONBOARDED' ? 'Create Onboarded Trait' : 'Create Rule-Based Trait';
    }

    render() {
        const { multiCreation, selectedSignals, canCreateTrait } = this.props;

        const createTraitUrl = this.getCreateTraitURL();

        return multiCreation ? (
            <MultiSignalsTraitsCreation
                createTraitUrl={createTraitUrl}
                selectedSignals={selectedSignals}
            />
        ) : (
            <SingleSignalTraitsCreation
                createTraitUrl={createTraitUrl}
                traitsCreationLabelText={this.getLinkText()}
                canCreateTrait={canCreateTrait}
            />
        );
    }
}

TraitsCreation.propTypes = {
    categoryType: PropTypes.string,
    keyValuePairs: PropTypes.array,
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    canCreateTrait: PropTypes.bool,
};

export default TraitsCreation;
