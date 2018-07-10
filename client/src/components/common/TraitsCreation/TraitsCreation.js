import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';
import { createOnboardedTraitUrl, createRuleBasedTraitUrl } from '../../../utils/urls';
import { stringifySignals } from '../../../utils/stringifySignals';

class TraitsCreation extends Component {
    getCreateTraitURL() {
        const { categoryType } = this.props;

        return categoryType === 'ONBOARDED' ? createOnboardedTraitUrl() : createRuleBasedTraitUrl();
    }

    getLinkText() {
        const { categoryType } = this.props;

        return categoryType === 'ONBOARDED' ? 'Create Onboarded Trait' : 'Create Rule-Based Trait';
    }

    storeSessionAndNavigateToTraits = e => {
        e.preventDefault();

        const { keyValuePairs, multiCreation, selectedSignals } = this.props;
        const signals = multiCreation ? selectedSignals.records : [{ keyValuePairs }];
        const signalsParams = {
            signals: stringifySignals(signals),
        };

        sessionStorage.setItem('signalsParams', JSON.stringify(signalsParams));

        window.location.assign(this.getCreateTraitURL());
    };

    render() {
        const { multiCreation, selectedSignals, canCreateTraits } = this.props;

        return multiCreation ? (
            <MultiSignalsTraitsCreation
                selectedSignals={selectedSignals}
                storeSessionAndNavigateToTraits={this.storeSessionAndNavigateToTraits}
            />
        ) : (
            <SingleSignalTraitsCreation
                traitsCreationLabelText={this.getLinkText()}
                canCreateTraits={canCreateTraits}
                storeSessionAndNavigateToTraits={this.storeSessionAndNavigateToTraits}
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
        selectedRowIndexes: PropTypes.array,
    }),
    canCreateTraits: PropTypes.bool,
};

export default TraitsCreation;
