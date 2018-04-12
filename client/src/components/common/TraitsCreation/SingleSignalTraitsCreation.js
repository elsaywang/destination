import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Add from '@react/react-spectrum/Icon/Add';

const SingleSignalTraitsCreation = ({ createTraitUrl, traitsCreationLabelText }) => {
    return (
        <a className="spectrum-Link" href={createTraitUrl}>
            <div className={styles.singleCreation}>
                <Add size="S" />
                <div className={styles.singleCreationlinkText}>{traitsCreationLabelText}</div>
            </div>
        </a>
    );
};

SingleSignalTraitsCreation.propTypes = {
    createTraitUrl: PropTypes.string,
    traitsCreationLabelText: PropTypes.string,
};

export default SingleSignalTraitsCreation;
