import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TraitsCreation from '../components/common/TraitsCreation/';
import { getSelectedResults, getSelectedResultsDataSources } from '../reducers';
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
        selectedRowIndexes: PropTypes.array,
    }),
    selectedDataSources: PropTypes.array,
    selectedResults: PropTypes.array,
    canCreateTraits: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals, results, signalType }) => ({
    selectedSignals,
    signalType: getSelectedSignalType(selectedSignals),
    selectedResults: getSelectedResults({
        selectedSignals,
        results,
    }),
    selectedDataSources: getSelectedResultsDataSources({ selectedSignals, results }),
    isMaxSignalSelectionsReached: isMaxSignalSelectionsReached(selectedSignals),
});

export default connect(mapStateToProps)(MultiSignalsTraitsCreationContainer);
