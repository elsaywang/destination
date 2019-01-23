import React from 'react';
import PropTypes from 'prop-types';
import Button from '@react/react-spectrum/Button';
import styles from './action.css';
import Edit from '@react/react-spectrum/Icon/Edit';
import { editDestinationUrl } from '../../utils/urls';

const EditAction = ({ destination, disabled, editDestination }) => (
    <Button
        data-test="action-edit-button"
        className={styles.editButton}
        label={''}
        variant="action"
        quiet
        onClick={editDestination}
        icon={<Edit size="S" />}
        disabled={disabled}
        target="_blank"
        element="a"
        rel="noopener"
        href={editDestinationUrl(destination.id)}
    />
);

EditAction.defaultProps = {
    disabled: false,
    editDestination: () => {
        //no-ops
    },
};

EditAction.protoTypes = {
    destination: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
    editDestination: PropTypes.func, //TODO
};

export default EditAction;
