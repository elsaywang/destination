import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Button from '@react/react-spectrum/Button';
import Delete from '@react/react-spectrum/Icon/Delete';
import Alert from '@react/react-spectrum/Icon/Alert';
import styles from './action.css';

class DeleteAction extends Component {
    renderTitle = () => (
        <Fragment>
            <Alert size="S" className={styles.deletionAlert} />
            <span className={styles.deletionText}>&nbsp; Delete Destination</span>
        </Fragment>
    );

    render() {
        const { destination, disabled, deleteDestination } = this.props;
        const { name } = destination;
        const boundDeleteClick = deleteDestination.bind(this, destination);

        return (
            !disabled && (
                <ModalTrigger>
                    <Button
                        data-test="action-delete-button"
                        label={''}
                        variant="action"
                        quiet
                        icon={<Delete size="S" />}
                        modaltrigger
                    />
                    <Dialog
                        data-test="action-delete-modal"
                        className={styles.deletionTextDialog}
                        modalcontent
                        title={this.renderTitle()}
                        confirmLabel="Delete"
                        size="S"
                        cancelLabel="Cancel"
                        onConfirm={boundDeleteClick}
                        variant="destructive">
                        <span>
                            Are you sure you want to delete this <strong>{name}</strong>{' '}
                            destination?
                            <br />
                        </span>
                    </Dialog>
                </ModalTrigger>
            )
        );
    }
}

DeleteAction.defaultProps = {
    disabled: false,
    deleteDestination: () => {
        //no-ops
    },
};

DeleteAction.protoTypes = {
    deleteDestination: PropTypes.func, //TODO
    destination: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
};

export default DeleteAction;
