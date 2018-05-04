import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitsCreation from '../components/common/TraitsCreation/';
import { connect } from 'react-redux';
import { getSelectedSignalsDataType } from '../reducers/selectedSignals';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        const { categoryType, selectedSignals } = this.props;
        const { records } = selectedSignals;

        return records.length ? (
            <TraitsCreation multiCreation {...{ selectedSignals, categoryType }} />
        ) : null;
    }
}

MultiSignalsTraitsCreationContainer.propTypes = {
    categoryType: PropTypes.string,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
    categoryType: getSelectedSignalsDataType(selectedSignals),
});

export default connect(mapStateToProps)(MultiSignalsTraitsCreationContainer);
