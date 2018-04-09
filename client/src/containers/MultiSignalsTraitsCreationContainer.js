import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitsCreation from '../components/common/TraitsCreation/';
import { connect } from 'react-redux';
import { createTraitFromMultiSignals } from '../actions/selectSignals';

export class MultiSignalsTraitsCreationContainer extends Component {
    render() {
        const { createTraitFromMultiSignals, selectedSignals } = this.props;

        const { records } = selectedSignals;

        return records.length ? (
            <TraitsCreation
                multiCreation
                traitsCreationLabelText="Create Trait From Multi Signals"
                handleTraitsCreation={createTraitFromMultiSignals}
                {...{ selectedSignals }}
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
