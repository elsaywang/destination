import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Button from '@react/react-spectrum/Button';
import Select from '@react/react-spectrum/Select';
import Textfield from '@react/react-spectrum/Textfield';
import requiredIf from 'react-required-if';
import styles from './AddAccountModal.css';
import { getPlatformOptions } from '../../constants/integratedPlatformsOptions';

/*
    Currently Spectrum doesn't propogate prop changes to ModalTrigger children because they are
    doing a bunch of props mutating stuff. As far as I can tell this isn't a bug, their spec is
    that the modal works for static content only. So we must define a stateful component within
    the ModalTrigger in order to get state changes to render to screen.
*/

class ModalContentHackForSpectrum extends Component {
    state = { selectedPlatform: null, newContactEmail: null, newAccountAdded: false };

    handleContactEmailsChange = newContactEmail => {
        this.setState({ newContactEmail })
    };

    render() {
        const dropDownOptionMessage =
            this.state.selectedPlatform || this.props.platform || 'Select a Platform';

        const emailContactsPlaceholder = this.props.contactEmails.length
            ? this.props.contactEmails.slice(0).join(`,   `)
            : 'Enter one or more email addresses separate with commas';

        //disable in Add Account when no Platform is selected / Add contact when no new email is typed in
        const disableConfirmation = (!this.props.platform && !this.state.selectedPlatform)
            || (this.props.contactOnlyMode && !this.state.newContactEmail);

        //Add Contacts - 'Save', Add Account and Renew/Reactivate Account - 'Confirm'
        const confirmationLabel = () => {
            let confirmationLabel = null;
            if (this.state.newAccountAdded) {
                confirmationLabel = 'Close';
            }
            else if (this.props.contactOnlyMode) {
                confirmationLabel = 'Save';
            }
            else {
                confirmationLabel = 'Confirm';
            }
            return confirmationLabel;
        }

        const cancelLabel = () => {
            let cancelLabel = null;
            if (!this.state.newAccountAdded) {
                if (this.props.contactOnlyMode) {
                    cancelLabel = 'Close'
                }
                else {
                    cancelLabel = 'Cancel'
                }
            }
            return cancelLabel;
        }

        const onConfirmCallback = () => {
            if (!this.state.newAccountAdded && this.state.selectedPlatform) {
                setTimeout(() => this.setState({ newAccountAdded: true }), 1000)
                return false;
            }
        }

        const platformOptions = getPlatformOptions('People-Based').map(platform => ({ label: platform, value: platform.toLowerCase() }))

        return (
            <Dialog
                role="dialog"
                className={styles.dialog}
                title={this.props.title}
                confirmDisabled={disableConfirmation}
                confirmLabel={confirmationLabel()}
                cancelLabel={cancelLabel()}
                onConfirm={onConfirmCallback}
                data-test={`modal-${this.props.title}`}
                {...this.props}>

                {!this.props.contactOnlyMode && (
                    <div className={classnames(styles.platformDropdownSection, styles.sections)}>
                        <span>People-Based Platform *</span>
                        <Select
                            value={this.state.selectedPlatform || this.props.platform}
                            placeholder={dropDownOptionMessage}
                            onChange={selectedPlatform => this.setState({ selectedPlatform })}
                            options={platformOptions}
                            disabled={this.props.contactOnlyMode || this.props.platform || this.state.newAccountAdded}
                            data-test={`dropdown-${this.props.title}`}
                        />
                    </div>
                )}


                {!this.props.contactOnlyMode && (
                    <div className={styles.sections}>
                        You will be taken outside of adobe domain to finish the authentication process.
                    </div>
                )}

                {this.props.contactOnlyMode && (
                    <div className={styles.sections}>
                        <p className={styles.modalMessage}>We will send a notification when the authentication is expiring for {this.props.platform} account: adobe@adobe.com</p>
                        <div className={styles.platformEmailSection}>
                            <span>Email</span>
                            <Textfield
                                placeholder={emailContactsPlaceholder}
                                className={styles.emailInput}
                                defaultValue={this.props.contactEmails}
                                onChange={this.handleContactEmailsChange}
                                data-test={`textfield-${this.props.title}`}
                            />
                        </div>
                    </div>
                )}
            </Dialog>
        );
    }
}

const AddAccountModal = ({
    contactOnlyMode,
    message,
    quiet,
    className,
    title,
    triggerIcon,
    platform,
    contactEmails,
    accountName,
}) => (
    <ModalTrigger>
        <Button
            label={message}
            variant="primary"
            modaltrigger
            quiet={quiet}
            className={className}
            icon={triggerIcon}
            data-test={`modal-button-${message || 'edit'}`}
        />
        <ModalContentHackForSpectrum
            role="dialog"
            contactOnlyMode={contactOnlyMode}
            title={title}
            platform={platform}
            contactEmails={contactEmails}
            accountName={accountName}
            message={message}
        />
    </ModalTrigger>
);

AddAccountModal.defaultProps = {
    quiet: false,
    title: 'Add Account',
    icon: null,
    platform: '',
    contactEmails: [],
};

AddAccountModal.propTypes = {
    contactOnlyMode: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    triggerIcon: PropTypes.node,
    platform: requiredIf(PropTypes.string, ({ contactOnlyMode }) => contactOnlyMode),
    contactEmails: requiredIf(PropTypes.array, ({ contactOnlyMode }) => contactOnlyMode),
    accountName: PropTypes.string,
};

export default AddAccountModal;
