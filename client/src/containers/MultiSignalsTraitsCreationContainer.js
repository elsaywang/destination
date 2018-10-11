import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TraitsCreation from '../components/common/TraitsCreation/';
import {
    getSelectedResults,
    doAllSelectedResultsShareSameDataSource,
    getSharedDataSourceIdsOfSelectedOnboardedResults,
    invalidSelectedOnboardedResultsTraitCreation,
} from '../reducers';
import { isMaxSignalSelectionsReached, getSelectedSignalType } from '../reducers/selectedSignals';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        return this.props.selectedSignals.selectedRowIndexes.length ? (
            <TraitsCreation multiCreation {...this.props} />
        ) : null;
    }
}

MultiSignalsTraitsCreationContainer.propTypes = {
    signalType: PropTypes.string,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasSignalSelectionsTypeWarning: PropTypes.bool,
        hasOnboardedSignalSelectionsWarning: PropTypes.bool,
        selectedRowIndexes: PropTypes.array,
    }),
    selectedDataSourceIds: PropTypes.array,
    doAllSelectedResultsShareSameDataSource: PropTypes.bool,
    selectedResults: PropTypes.array,
    canCreateTraits: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals, results, signalType }) => ({
    selectedSignals: {
        ...selectedSignals,
        hasOnboardedSignalSelectionsWarning: invalidSelectedOnboardedResultsTraitCreation({
            selectedSignals,
            results,
        }),
    },
    signalType: getSelectedSignalType(selectedSignals),
    selectedResults: getSelectedResults({
        selectedSignals,
        results,
    }),
    hasOnboardedSignalSelectionsWarning: invalidSelectedOnboardedResultsTraitCreation({
        selectedSignals,
        results,
    }),
    selectedDataSourceIds: getSharedDataSourceIdsOfSelectedOnboardedResults({
        selectedSignals,
        results,
    }),
    doAllSelectedResultsShareSameDataSource: doAllSelectedResultsShareSameDataSource({
        selectedSignals,
        results,
    }),
    isMaxSignalSelectionsReached: isMaxSignalSelectionsReached(selectedSignals),
});

export default connect(mapStateToProps)(MultiSignalsTraitsCreationContainer);
