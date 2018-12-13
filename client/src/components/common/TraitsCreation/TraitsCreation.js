import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSignalsTraitsCreation from './MultiSignalsTraitsCreation';
import SingleSignalTraitsCreation from './SingleSignalTraitsCreation';
import { createOnboardedTraitUrl, createRuleBasedTraitUrl } from '../../../utils/urls';
import { stringifySignals } from '../../../utils/stringifySignals';

class TraitsCreation extends Component {
    getCreateTraitURL() {
        return this.shouldCreateOnboardedTrait()
            ? createOnboardedTraitUrl()
            : createRuleBasedTraitUrl();
    }

    getLinkText() {
        return this.props.signalType === 'ONBOARDED'
            ? 'Create Onboarded Trait'
            : 'Create Rule-Based Trait';
    }

    getButtonText() {
        return this.props.selectedResults.length > 1
            ? 'Create Trait From Selected Signals'
            : 'Create Trait From Selected Signal';
    }

    shouldCreateOnboardedTrait() {
        // For single signal creation, check the `signalType` of the signal result.
        // For multi signal creation, check if all selected signals are onboarded and
        // come from the same data source.
        const { signalType, doAllSelectedResultsShareSameDataSource } = this.props;

        return signalType === 'ONBOARDED' || doAllSelectedResultsShareSameDataSource;
    }

    storeSessionAndNavigateToTraits = e => {
        e.preventDefault();

        const { keyValuePairs, multiCreation, selectedResults, selectedDataSourceIds } = this.props;

        const signals = multiCreation ? selectedResults : [{ keyValuePairs }];
        const signalsParams = {
            signals: stringifySignals(signals),
            ...(this.shouldCreateOnboardedTrait() && {
                source: {
                    dataSourceIds: selectedDataSourceIds,
                },
            }),
        };

        sessionStorage.setItem('signalsParams', JSON.stringify(signalsParams));

        window.location.assign(this.getCreateTraitURL());
    };

    render() {
        const {
            multiCreation,
            selectedSignals,
            canCreateTraits,
            isMaxSignalSelectionsReached,
        } = this.props;

        return multiCreation ? (
            <MultiSignalsTraitsCreation
                selectedSignals={selectedSignals}
                storeSessionAndNavigateToTraits={this.storeSessionAndNavigateToTraits}
                isMaxSignalSelectionsReached={isMaxSignalSelectionsReached}
                multiTraitCreationButtonText={this.getButtonText()}
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
    signalType: PropTypes.string,
    keyValuePairs: PropTypes.array,
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasSignalSelectionsTypeWarning: PropTypes.bool,
        selectedRowIndexes: PropTypes.array,
        hasOnboardedSignalSelectionsWarning: PropTypes.bool,
    }),
    selectedDataSourceIds: PropTypes.array,
    canCreateTraits: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
};

export default TraitsCreation;
