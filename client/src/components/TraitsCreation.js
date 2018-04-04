import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Add from '@react/react-spectrum/Icon/Add';
import Button from '@react/react-spectrum/Button';
import Link from '@react/react-spectrum/Link';
import styles from './TraitsCreation.css';

class TraitsCreation extends Component {
    singleRowTraitsCreation = () => {
        const { traitsCreationLabelText } = this.props;
        return (
            <Link href="#">
                <div className={styles.singleCreation}>
                    <Add size="S" />
                    <div className={styles.singleCreationlinkText}>{traitsCreationLabelText}</div>
                </div>
            </Link>
        );
    };

    multiRowsTraitsCreation = () => {
        const { handleTraitsCreation, selectedSignals, traitsCreationLabelText } = this.props;

        const { selectionMessage, warning } = selectedSignals;

        return (
            <div className={styles.multiCreation}>
                <span className={styles.message}>{selectionMessage}</span>
                <Button
                    label={traitsCreationLabelText}
                    icon={<Add />}
                    onClick={handleTraitsCreation}
                    variant="action"
                    disabled={warning}
                />
            </div>
        );
    };

    render() {
        const { multiCreation, handleTraitsCreation } = this.props;
        return multiCreation ? this.multiRowsTraitsCreation() : this.singleRowTraitsCreation();
    }
}

TraitsCreation.propTypes = {
    multiCreation: PropTypes.bool,
    selectedSignals: PropTypes.object,
    traitsCreationLabelText: PropTypes.string,
    handleTraitsCreation: PropTypes.func,
};

export default TraitsCreation;
