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
            <span className={styles.deletionText}>{`  Delete  ${this.props.type
                .charAt(0)
                .toUpperCase() + this.props.type.slice(1)}`}</span>
        </Fragment>
    );

    render() {
        const { handleDelete, name, type } = this.props;

        return (
            <ModalTrigger>
                <Button
                    data-test="action-delete-button"
                    label={type === 'destination' ? '' : 'Delete'}
                    variant="action"
                    quiet
                    icon={type === 'destination' ? <Delete size="S" /> : ''}
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
                    onConfirm={handleDelete}
                    variant="destructive">
                    <span>
                        Are you sure you want to delete this <strong>{name}</strong> {type} ?
                        <br />
                    </span>
                </Dialog>
            </ModalTrigger>
        );
    }
}

DeleteAction.propTypes = {
    handleDelete: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.string.isRequired,
};

export default DeleteAction;
