import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TraitsCreation from '../components/common/TraitsCreation/';
import { getSelectedResults } from '../reducers';

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
        hasWarning: PropTypes.bool,
        selectedRowIndexes: PropTypes.array,
    }),
    selectedResults: PropTypes.array,
    canCreateTraits: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals, results }) => ({
    selectedSignals,
    selectedResults: getSelectedResults({ selectedSignals, results }),
});

export default connect(mapStateToProps)(MultiSignalsTraitsCreationContainer);
