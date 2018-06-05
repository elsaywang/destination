import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitsCreation from '../components/common/TraitsCreation/';
import { connect } from 'react-redux';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        const { selectedSignals } = this.props;
        const { records } = selectedSignals;

        return records.length ? <TraitsCreation multiCreation {...this.props} /> : null;
    }
}

MultiSignalsTraitsCreationContainer.propTypes = {
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    canCreateTrait: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
});

export default connect(mapStateToProps)(MultiSignalsTraitsCreationContainer);
