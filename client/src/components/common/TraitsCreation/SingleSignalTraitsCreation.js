import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Add from '@react/react-spectrum/Icon/Add';

const SingleSignalTraitsCreation = ({
    createTraitUrl,
    traitsCreationLabelText,
    canCreateTrait,
}) => {
    if (canCreateTrait) {
        return (
            <a className="spectrum-Link" href={createTraitUrl}>
                <div className={styles.singleCreation}>
                    <Add size="S" />
                    <div className={styles.singleCreationlinkText}>{traitsCreationLabelText}</div>
                </div>
            </a>
        );
    }

    return '0 Traits';
};

SingleSignalTraitsCreation.propTypes = {
    createTraitUrl: PropTypes.string,
    traitsCreationLabelText: PropTypes.string,
    canCreateTrait: PropTypes.bool,
};

export default SingleSignalTraitsCreation;
