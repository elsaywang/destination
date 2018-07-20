import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Warning from '../components/common/Warning';
import {
    SignalsSelectionWarningMessage,
    SignalsSelectionLimitMessage,
} from '../components/common/Warning/WarningTemplates';
import {
    isMaxSignalSelectionsReached,
    hasTraitsCreationDisabledWarning,
    getMaxSignalSelections,
} from '../reducers/selectedSignals';
import { connect } from 'react-redux';

export class TraitsCreationWarning extends Component {
    render() {
        const {
            hasTraitsCreationDisabledWarning,
            isMaxSignalSelectionsReached,
            maxSignalSelections,
        } = this.props;

        if (hasTraitsCreationDisabledWarning) {
            return (
                <Warning>
                    <SignalsSelectionWarningMessage />
                </Warning>
            );
        } else if (isMaxSignalSelectionsReached) {
            return (
                <Warning>
                    <SignalsSelectionLimitMessage maxSignalSelections={maxSignalSelections} />
                </Warning>
            );
        } else return null;
    }
}

TraitsCreationWarning.propTypes = {
    hasTraitsCreationDisabledWarning: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
    maxSignalSelections: PropTypes.number,
};

const mapStateToProps = ({ selectedSignals }) => ({
    isMaxSignalSelectionsReached: isMaxSignalSelectionsReached(selectedSignals),
    hasTraitsCreationDisabledWarning: hasTraitsCreationDisabledWarning(selectedSignals),
    maxSignalSelections: getMaxSignalSelections(selectedSignals),
});

export default connect(
    mapStateToProps,
    null,
)(TraitsCreationWarning);
