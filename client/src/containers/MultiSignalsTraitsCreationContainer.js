import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitsCreation from '../components/common/TraitsCreation/';
import { connect } from 'react-redux';
import { createTraitFromMultiSignals } from '../actions/selectSignals';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        const { createTraitFromMultiSignals, selectedSignals } = this.props;
        const { records } = selectedSignals;
        const dataType = records.every(signal => signal.source.sourceType === 'ONBOARDED')
            ? 'ONBOARDED'
            : 'REALTIME';

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
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    createTraitFromMultiSignals: PropTypes.func,
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
});

export default connect(mapStateToProps, { createTraitFromMultiSignals })(
    MultiSignalsTraitsCreationContainer,
);
