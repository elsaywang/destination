import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TraitsCreation from '../components/common/TraitsCreation/';
import { getSelectedResults } from '../reducers';
import { finalizedSelectedRowIndexes, finalizedSelectedSignals } from '../reducers/selectedSignals';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        return this.props.selectedSignals.selectedRowIndexes.length ? (
            <TraitsCreation multiCreation {...this.props} />
        ) : null;
    }
}

MultiSignalsTraitsCreationContainer.propTypes = {
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasTraitsCreationDisabledWarning: PropTypes.bool,
        selectedRowIndexes: PropTypes.array,
    }),
    selectedResults: PropTypes.array,
    canCreateTraits: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals, results }) => ({
    selectedSignals: finalizedSelectedSignals(selectedSignals),
    selectedResults: getSelectedResults({
        selectedSignals: finalizedSelectedSignals(selectedSignals),
        results,
    }),
});

export default connect(mapStateToProps)(MultiSignalsTraitsCreationContainer);
