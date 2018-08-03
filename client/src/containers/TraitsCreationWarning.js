import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Warning from '../components/common/Warning';
import {
    SignalsSelectionWarningMessage,
    SignalsSelectionLimitMessage,
} from '../components/common/Warning/WarningTemplates';
import {
    isMaxSignalSelectionsReached,
    hasSignalSelectionsTypeWarning,
    getMaxSignalSelections,
} from '../reducers/selectedSignals';
import { connect } from 'react-redux';

export class TraitsCreationWarning extends Component {
    render() {
        const {
            hasSignalSelectionsTypeWarning,
            isMaxSignalSelectionsReached,
            maxSignalSelections,
        } = this.props;

        if (isMaxSignalSelectionsReached) {
            return (
                <Warning>
                    <SignalsSelectionLimitMessage maxSignalSelections={maxSignalSelections} />
                </Warning>
            );
        } else if (hasSignalSelectionsTypeWarning) {
            return (
                <Warning>
                    <SignalsSelectionWarningMessage />
                </Warning>
            );
        }
        return null;
    }
}

TraitsCreationWarning.propTypes = {
    hasSignalSelectionsTypeWarning: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
    maxSignalSelections: PropTypes.number,
};

const mapStateToProps = ({ selectedSignals }) => ({
    isMaxSignalSelectionsReached: isMaxSignalSelectionsReached(selectedSignals),
    hasSignalSelectionsTypeWarning: hasSignalSelectionsTypeWarning(selectedSignals),
    maxSignalSelections: getMaxSignalSelections(selectedSignals),
});

export default connect(
    mapStateToProps,
    null,
)(TraitsCreationWarning);
