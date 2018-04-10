import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';

const MultiSignalsTraitsCreation = ({ createTraitUrl, selectedSignals }) => {
    const { selectionMessage, hasWarning } = selectedSignals;

    return (
        <div className={styles.multiCreation}>
            <span className={styles.message}>{selectionMessage}</span>
            <a href={createTraitUrl}>
                <Button
                    label="Create Trait From Multiple Signals"
                    icon={<Add />}
                    variant="action"
                    disabled={hasWarning}
                />
            </a>
        </div>
    );
};

MultiSignalsTraitsCreation.propTypes = {
    createTraitUrl: PropTypes.string,
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
};

export default MultiSignalsTraitsCreation;
