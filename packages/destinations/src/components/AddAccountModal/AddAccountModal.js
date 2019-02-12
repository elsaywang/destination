import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Button from '@react/react-spectrum/Button';
import Dropdown from '@react/react-spectrum/Dropdown';
import { Menu, MenuItem } from '@react/react-spectrum/Menu';
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
    state = { selectedPlatform: null, confirmDisabled: true };

    handleContactEmailsChange = e => {
        //TODO: add contacts email event
    };

    render() {
        const dropDownOptionMessage =
            this.state.selectedPlatform ||
            (this.props.contactOnlyMode ? this.props.platform : 'Select a Platform');

        const emailContactsPlaceholder = this.props.contactEmails.length
            ? this.props.contactEmails.slice(0).join(`,   `)
            : 'Enter one or more email addresses separate with commas';

        return (
            <Dialog
                role="dialog"
                className={styles.dialog}
                title={this.props.title}
                confirmDisabled={!this.props.contactOnlyMode}
                confirmLabel={this.props.contactOnlyMode ? 'Add' : ' N/A'}
                onConfirm={() => this.props.contactOnlyMode}
                cancelLabel="Cancel"
                {...this.props}>
                <div className={classnames(styles.platform_dropdown_section, styles.sections)}>
                    <span>People-Based Platform *</span>
                    <Dropdown
                        onSelect={selectedPlatform =>
                            this.setState({ selectedPlatform, confirmDisabled: false })
                        }>
                        <Button
                            disabled={this.props.contactOnlyMode}
                            variant="action"
                            className={styles.menuOption}>
                            {dropDownOptionMessage}
                        </Button>
                        <Menu>
                            {getPlatformOptions().map(platform => (
                                <MenuItem
                                    className={styles.menuOption}
                                    key={platform}
                                    value={platform}>
                                    {platform}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Dropdown>
                </div>

                {!this.props.contactOnlyMode && (
                    <div className={styles.sections}>
                        <p>Authorization</p>
                        <div className={styles.iframe}>
                            <p className={styles.iframe_default_text}>
                                {this.state.selectedPlatform
                                    ? `${this.state.selectedPlatform} goes here`
                                    : 'Select a Platform'}
                            </p>
                        </div>
                    </div>
                )}

                {this.props.contactOnlyMode && (
                    <div className={styles.sections}>
                        <p>Contact Emails For Expiring Notification</p>
                        <Textfield
                            placeholder={emailContactsPlaceholder}
                            quiet
                            className={styles.email_input}
                            defaultValue={this.props.contactEmails}
                            onChange={this.handleContactEmailsChange}
                        />
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
}) => (
    <ModalTrigger>
        <Button
            label={message}
            variant="primary"
            modaltrigger
            quiet={quiet}
            className={className}
            icon={triggerIcon}
            data-test='add-account-modal-button'
        />
        <ModalContentHackForSpectrum
            role="dialog"
            contactOnlyMode={contactOnlyMode}
            title={title}
            platform={platform}
            contactEmails={contactEmails}
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
};

export default AddAccountModal;
