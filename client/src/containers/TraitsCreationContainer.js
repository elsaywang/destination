import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Add from '@react/react-spectrum/Icon/Add';
import Button from '@react/react-spectrum/Button';
import TraitsCreation from '../components/TraitsCreation';
import styles from './TraitsCreationContainer.css';
import { connect } from 'react-redux';
import { createTraitFromMultiSignals } from '../actions';

export class TraitsCreationContainer extends Component {
    render() {
        const { createTraitFromMultiSignals, selectedSignals } = this.props;

        const { selectionMessage, records, warning } = selectedSignals;

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

TraitsCreationContainer.propTypes = {
    selectedSignals: PropTypes.object,
    createTraitFromMultiSignals: PropTypes.func,
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
});

export default connect(mapStateToProps, createTraitFromMultiSignals)(TraitsCreationContainer);
