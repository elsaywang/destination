import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';

const SingleSignalTraitsCreation = ({ traitsCreationLabelText }) => {
    return (
        <Link href="#">
            <div className={styles.singleCreation}>
                <Add size="S" />
                <div className={styles.singleCreationlinkText}>{traitsCreationLabelText}</div>
            </div>
        </Link>
    );
};

SingleSignalTraitsCreation.propTypes = {
    traitsCreationLabelText: PropTypes.string,
};

export default SingleSignalTraitsCreation;
