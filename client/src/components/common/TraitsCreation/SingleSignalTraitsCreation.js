import React from 'react';
import PropTypes from 'prop-types';
import styles from './TraitsCreation.css';
import Add from '@react/react-spectrum/Icon/Add';
import classNames from 'classnames';

const SingleSignalTraitsCreation = ({
    traitsCreationLabelText,
    canCreateTraits,
    storeSessionAndNavigateToTraits,
}) => {
    if (canCreateTraits) {
        return (
            <div
                className={classNames('spectrum-Link', styles.singleCreation)}
                onClick={storeSessionAndNavigateToTraits}
                data-test="single-signal-trait-creation">
                <Add size="S" />
                <div className={styles.singleCreationlinkText}>{traitsCreationLabelText}</div>
            </div>
        );
    }

    return '0 Traits';
};

SingleSignalTraitsCreation.propTypes = {
    traitsCreationLabelText: PropTypes.string,
    canCreateTraits: PropTypes.bool,
    storeSessionAndNavigateToTraits: PropTypes.func.isRequired,
};

export default SingleSignalTraitsCreation;
