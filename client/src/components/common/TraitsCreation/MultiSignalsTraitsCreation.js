import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Button from '@react/react-spectrum/Button';
import Add from '@react/react-spectrum/Icon/Add';

const MultiSignalsTraitsCreation = ({
    createTraitUrl,
    handleTraitsCreation,
    selectedSignals,
    traitsCreationLabelText,
}) => {
    const { selectionMessage, hasWarning } = selectedSignals;

    return (
        <div className={styles.multiCreation}>
            <span className={styles.message}>{selectionMessage}</span>
            <a href={createTraitUrl}>
                <Button
                    label={traitsCreationLabelText}
                    icon={<Add />}
                    onClick={handleTraitsCreation}
                    variant="action"
                    disabled={hasWarning}
                />
            </a>
        </div>
    );
};

MultiSignalsTraitsCreation.propTypes = {
    selectedSignals: PropTypes.shape({
        selectionMessage: PropTypes.string,
        hasWarning: PropTypes.bool,
        records: PropTypes.array,
    }),
    traitsCreationLabelText: PropTypes.string,
    handleTraitsCreation: PropTypes.func,
};

export default MultiSignalsTraitsCreation;
