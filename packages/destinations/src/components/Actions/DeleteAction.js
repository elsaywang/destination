import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Button from '@react/react-spectrum/Button';
import Delete from '@react/react-spectrum/Icon/Delete';
import Alert from '@react/react-spectrum/Icon/Alert';
import requiredIf from 'react-required-if';
import styles from './action.css';

class DeleteAction extends Component {
    renderTitle = () => (
        <Fragment>
            <Alert size="S" className={styles.deletionAlert} />
            <span className={styles.deletionText}>
                &nbsp; Delete {this.props.isForDestination ? `Destination` : `Authentication`}
            </span>
        </Fragment>
    );

    render() {
        const { disabled, handleDeleteAction, isForDestination } = this.props;
        const { name, destinationId } = isForDestination && this.props.destination;
        const { accountName, adAccountId } = !isForDestination && this.props.authentication;

        return (
            !disabled && (
                <ModalTrigger>
                    <Button
                        data-test="action-delete-button"
                        label={isForDestination ? '' : 'Delete'}
                        variant="action"
                        quiet
                        icon={isForDestination && <Delete size="S" />}
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
                        onConfirm={() =>
                            handleDeleteAction(isForDestination ? destinationId : adAccountId)
                        }
                        variant="destructive">
                        <span>
                            Are you sure you want to delete this{' '}
                            <strong>{isForDestination ? name : accountName}</strong>{' '}
                            {isForDestination ? `destination` : `authentication`} ?
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
    handleDeleteAction: () => {
        //no-ops
    },
};

DeleteAction.propTypes = {
    isForDestination: PropTypes.bool,
    handleDeleteAction: PropTypes.func,
    destination: requiredIf(
        PropTypes.shape({
            destinationId: PropTypes.number,
            name: PropTypes.string,
        }),
        ({ isForDestination }) => isForDestination,
    ),
    authentication: requiredIf(
        PropTypes.shape({
            adAccountId: PropTypes.string,
            accountName: PropTypes.string,
        }),
        ({ isForDestination }) => !isForDestination,
    ),
};

export default DeleteAction;
