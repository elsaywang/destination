import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Add from '@react/react-spectrum/Icon/Add';
import Button from '@react/react-spectrum/Button';
import styles from './BulkCreation.css';
import { connect } from 'react-redux';
import { createTraitFromMultiSignals } from '../actions';

export class BulkCreation extends Component {
    render() {
        const { createTraitFromMultiSignals, selectedSignals } = this.props;

        const { selectionMessage, records, warning } = selectedSignals;

        return records.length ? (
            <div className={styles.bulkCreation}>
                <span className={styles.message}>{selectionMessage}</span>
                <Button
                    label="Create Trait From Multi Signals"
                    icon={<Add />}
                    onClick={createTraitFromMultiSignals}
                    variant="action"
                    disabled={warning}
                />
            </div>
        ) : null;
    }
}

BulkCreation.propTypes = {
    selectedSignals: PropTypes.object,
    createTraitFromMultiSignals: PropTypes.func,
};

const mapStateToProps = ({ selectedSignals }) => ({
    selectedSignals,
});

export default connect(mapStateToProps, createTraitFromMultiSignals)(BulkCreation);
