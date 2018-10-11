import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Warning from '../components/common/Warning';
import {
    SignalsSelectionWarningMessage,
    SignalsSelectionLimitMessage,
    OnboardedSignalSelectionWarningMessage,
} from '../components/common/Warning/WarningTemplates';
import {
    isMaxSignalSelectionsReached,
    hasSignalSelectionsTypeWarning,
    getMaxSignalSelections,
} from '../reducers/selectedSignals';
import { invalidSelectedOnboardedResultsTraitCreation } from '../reducers';
import { connect } from 'react-redux';

export class TraitsCreationWarning extends Component {
    render() {
        const {
            hasSignalSelectionsTypeWarning,
            isMaxSignalSelectionsReached,
            maxSignalSelections,
            hasOnboardedSignalSelectionsWarning,
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
        } else if (hasOnboardedSignalSelectionsWarning) {
            return (
                <Warning>
                    <OnboardedSignalSelectionWarningMessage />
                </Warning>
            );
        }
        return null;
    }
}

TraitsCreationWarning.propTypes = {
    hasSignalSelectionsTypeWarning: PropTypes.bool,
    hasOnboardedSignalSelectionsWarning: PropTypes.bool,
    isMaxSignalSelectionsReached: PropTypes.bool,
    maxSignalSelections: PropTypes.number,
};

const mapStateToProps = ({ selectedSignals, results }) => ({
    isMaxSignalSelectionsReached: isMaxSignalSelectionsReached(selectedSignals),
    hasSignalSelectionsTypeWarning: hasSignalSelectionsTypeWarning(selectedSignals),
    hasOnboardedSignalSelectionsWarning: invalidSelectedOnboardedResultsTraitCreation({
        selectedSignals,
        results,
    }),
    maxSignalSelections: getMaxSignalSelections(selectedSignals),
});

export default connect(
    mapStateToProps,
    null,
)(TraitsCreationWarning);
