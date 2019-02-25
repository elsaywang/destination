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
    state = { selectedPlatform: null, newContactEmail: null };

    handleContactEmailsChange = e => {
        this.setState({ newContactEmail: e })
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
        const renderConfirmationLabel = this.props.contactOnlyMode
            ? 'Save' : 'Confirm';

        const renderCancelLabel = this.props.contactOnlyMode
            ? 'Close' : 'Cancel';

        // TODO: delete this mock service when OAuth integration is done
        const mockPromise = new Promise(resolve => {
            setTimeout(
                resolve("Success!")
                , 3000)
        });

        const onConfirmCallback = () => {
            if (!this.state.newAccountAdded && this.state.selectedPlatform) {
                mockPromise.then(() => this.setState({ newAccountAdded: true }))
                return false;
            }
        }

        const platformOptions = _.map(getPlatformOptions('People-Based'), platform => { return { label: platform, value: platform.toLowerCase() } })

        return (
            <Dialog
                role="dialog"
                className={styles.dialog}
                title={this.props.title}
                confirmDisabled={disableConfirmation}
                confirmLabel={this.state.newAccountAdded ? 'Close' : renderConfirmationLabel}
                cancelLabel={this.state.newAccountAdded ? null : renderCancelLabel}
                onConfirm={onConfirmCallback}
                {...this.props}>

                {!this.props.contactOnlyMode && (
                    <div className={classnames(styles.platform_dropdown_section, styles.sections)}>
                        <span>People-Based Platform *</span>
                        <Select
                            value={this.state.selectedPlatform || this.props.platform}
                            placeholder={this.props.platform || "Select one platform"}
                            onChange={selectedPlatform => this.setState({ selectedPlatform })}
                            options={platformOptions}
                            disabled={this.props.contactOnlyMode || this.props.platform || this.state.newAccountAdded}
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
                        <p>We will send a notification when the authentication is expiring for {this.props.platform} account: adobe@adobe.com</p>
                        <div className={styles.platform_email_section}>
                            <span>Email</span>
                            <Textfield
                                placeholder={emailContactsPlaceholder}
                                className={styles.email_input}
                                defaultValue={this.props.contactEmails}
                                onChange={this.handleContactEmailsChange}
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
                data-test="add-account-modal-button"
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
