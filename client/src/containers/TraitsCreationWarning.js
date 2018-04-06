import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Warning from '../components/common/Warning';
import { SignalsSelectionWarningMessage } from '../components/common/Warning/WarningTemplates';
import { connect } from 'react-redux';

export class TraitsCreationWarning extends Component {
    render() {
        const { hasWarning } = this.props;

        return hasWarning ? (
            <Warning>
                <SignalsSelectionWarningMessage />
            </Warning>
        ) : null;
    }
}

TraitsCreationWarning.propTypes = {
    hasWarning: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals: { hasWarning } }) => ({
    hasWarning,
});

export default connect(mapStateToProps, null)(TraitsCreationWarning);
