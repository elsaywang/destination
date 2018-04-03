import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WarningMessage from '../components/WarningMessage';
import { connect } from 'react-redux';

export class SignalSelectionWarning extends Component {
    render() {
        const { warning, warningType } = this.props.selectedSignals;

        return warning ? <WarningMessage {...{ warningType }} /> : null;
    }
}

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
});

export default connect(mapStateToProps, null)(SignalSelectionWarning);
