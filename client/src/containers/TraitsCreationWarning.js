import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Warning from '../components/common/Warning';
import { SignalsSelectionWarningMessage } from '../components/common/Warning/WarningTemplates';
import { connect } from 'react-redux';

export class TraitsCreationWarning extends Component {
    render() {
        const { warning } = this.props;

        return warning ? (
            <Warning>
                <SignalsSelectionWarningMessage />
            </Warning>
        ) : null;
    }
}

TraitsCreationWarning.propTypes = {
    warning: PropTypes.bool,
};

const mapStateToProps = ({ selectedSignals: { warning } }) => ({
    warning,
});

export default connect(mapStateToProps, null)(TraitsCreationWarning);
