import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitsCreation from '../components/common/TraitsCreation/';
import { connect } from 'react-redux';
import { createTraitFromMultiSignals } from '../actions/selectSignals';
import { getSelectedSignalsDataType } from '../reducers/selectedSignals';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        const { createTraitFromMultiSignals, dataType, selectedSignals } = this.props;
        const { records } = selectedSignals;

        return records.length ? (
            <TraitsCreation
                multiCreation
                handleTraitsCreation={createTraitFromMultiSignals}
                {...{ selectedSignals, dataType }}
            />
        ) : null;
    }
}

MultiSignalsTraitsCreationContainer.propTypes = {
    dataType: PropTypes.string,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    createTraitFromMultiSignals: PropTypes.func,
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
    dataType: getSelectedSignalsDataType(selectedSignals),
});

export default connect(mapStateToProps, { createTraitFromMultiSignals })(
    MultiSignalsTraitsCreationContainer,
);
