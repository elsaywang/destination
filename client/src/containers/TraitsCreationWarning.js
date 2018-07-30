import React, { Component, Fragment } from 'react';
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

        if (hasSignalSelectionsTypeWarning && isMaxSignalSelectionsReached) {
            return (
                <Fragment>
                    <Warning>
                        <SignalsSelectionLimitMessage maxSignalSelections={maxSignalSelections} />
                    </Warning>
                    <Warning>
                        <SignalsSelectionWarningMessage />
                    </Warning>
                </Fragment>
            );
        } else if (hasSignalSelectionsTypeWarning) {
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
