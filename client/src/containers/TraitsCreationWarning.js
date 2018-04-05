import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Warning from '../components/common/Warning';
import { SignalsSelectionWarning } from '../components/common/Warning/WarningTemplates.js';
import { connect } from 'react-redux';

export class TraitsCreationWarning extends Component {
    render() {
        const { warning } = this.props.selectedSignals;

        return warning ? (
            <Warning>
                <SignalsSelectionWarning />
            </Warning>
        ) : null;
    }
}

TraitsCreationWarning.propTypes = {
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        warning: PropTypes.bool,
        records: PropTypes.array,
    }),
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
});

export default connect(mapStateToProps, null)(TraitsCreationWarning);
