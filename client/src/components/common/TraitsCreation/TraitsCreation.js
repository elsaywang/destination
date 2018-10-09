import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';
import { createOnboardedTraitUrl, createRuleBasedTraitUrl } from '../../../utils/urls';
import { stringifySignals } from '../../../utils/stringifySignals';

class TraitsCreation extends Component {
    getCreateTraitURL() {
        const { categoryType, signalType } = this.props;
        //for multiple creations, need to check signalType
        if (categoryType === 'ONBOARDED' || signalType === 'ONBOARDED') {
            return createOnboardedTraitUrl();
        }
        return createRuleBasedTraitUrl();
    }

    getLinkText() {
        const { categoryType } = this.props;

        return categoryType === 'ONBOARDED' ? 'Create Onboarded Trait' : 'Create Rule-Based Trait';
    }

    storeSessionAndNavigateToTraits = e => {
        e.preventDefault();

        const {
            keyValuePairs,
            multiCreation,
            selectedResults,
            selectedDataSources,
            signalType,
        } = this.props;

        const signals = multiCreation ? selectedResults : [{ keyValuePairs }];
        const signalsParams = {
            signals: stringifySignals(signals),
        };

        if (signalType === 'ONBOARDED') {
            signalsParams['source'] = { dataSourceIds: [...selectedDataSources] };
        }

        sessionStorage.setItem('signalsParams', JSON.stringify(signalsParams));

        window.location.assign(this.getCreateTraitURL());
    };

    render() {
        const {
            multiCreation,
            selectedSignals,
            selectedDataSources,
            canCreateTraits,
            isMaxSignalSelectionsReached,
        } = this.props;

        return multiCreation ? (
            <MultiSignalsTraitsCreation
                selectedSignals={selectedSignals}
                selectedDataSources={selectedDataSources}
                storeSessionAndNavigateToTraits={this.storeSessionAndNavigateToTraits}
                isMaxSignalSelectionsReached={isMaxSignalSelectionsReached}
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
    signalType: PropTypes.string,
    keyValuePairs: PropTypes.array,
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasSignalSelectionsTypeWarning: PropTypes.bool,
        selectedRowIndexes: PropTypes.array,
    }),
    selectedDataSources: PropTypes.array,
    canCreateTraits: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
};

export default TraitsCreation;
