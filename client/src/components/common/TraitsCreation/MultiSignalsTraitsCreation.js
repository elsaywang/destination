import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';

const MultiSignalsTraitsCreation = ({ selectedSignals, storeSessionAndNavigateToTraits }) => {
    const { selectionMessage, hasWarning } = selectedSignals;

    return (
        <div className={styles.multiCreation}>
            <span className={styles.message}>{selectionMessage}</span>
            <Button
                onClick={storeSessionAndNavigateToTraits}
                label="Create Trait From Multiple Signals"
                icon={<Add />}
                variant="action"
                disabled={hasWarning}
                data-test="multi-signals-trait-creation"
            />
        </div>
    );
};

MultiSignalsTraitsCreation.propTypes = {
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    storeSessionAndNavigateToTraits: PropTypes.func.isRequired,
};

export default MultiSignalsTraitsCreation;
