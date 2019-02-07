import React, { Component } from 'react';
import classnames from 'classnames';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';
import Button from '@react/react-spectrum/Button';
import Dropdown from '@react/react-spectrum/Dropdown';
import { Menu, MenuItem } from '@react/react-spectrum/Menu';
import Textfield from '@react/react-spectrum/Textfield';
import styles from './AddAccountModal.css';
import { integratedPlatformsOptions } from '../../constants/integratedPlatformsOptions';

/*
    Currently Spectrum doesn't propogate prop changes to ModalTrigger children because they are
    doing a bunch of props mutating stuff. As far as I can tell this isn't a bug, their spec is
    that the modal works for static content only. So we must define a stateful component within
    the ModalTrigger in order to get state changes to render to screen.
*/

class ModalContentHackForSpectrum extends Component {
    state = { selectedPlatform: null, confirmDisabled: true };

    render() {
        return (
            <Dialog
                modalcontent
                className={styles.dialog}
                title="Add Account"
                confirmDisabled={this.state.confirmDisabled}
                confirmLabel="Add"
                cancelLabel="Cancel"
                {...this.props}>
                <div className={classnames(styles.platform_dropdown_section, styles.sections)}>
                    <span>People-Based Platform *</span>
                    <Dropdown
                        styles={styles.platform_dropdown}
                        onSelect={selectedPlatform =>
                            this.setState({ selectedPlatform, confirmDisabled: false })
                        }>
                        <Button disabled={this.props.contactOnlyMode} variant="action">
                            {this.state.selectedPlatform || 'Select a platform'}
                        </Button>
                        <Menu>
                            {integratedPlatformsOptions.map(({ label }) => (
                                <MenuItem value={label}>{label}</MenuItem>
                            ))}
                        </Menu>
                    </Dropdown>
                </div>

                {!this.props.contactOnlyMode && (
                    <div className={styles.sections}>
                        <p>Authorization</p>
                        <div className={styles.iframe}>
                            <p className={styles.iframe_default_text}>
                                {this.state.selectedPlatform !== null
                                    ? 'Facebook goes here'
                                    : 'Select a platform'}
                            </p>
                        </div>
                    </div>
                )}

                <div className={styles.sections}>
                    <p>Contact Emails For Expiring Notification</p>
                    <Textfield
                        placeholder="Enter one or more email addresses separate with commas"
                        quiet
                        className={styles.email_input}
                    />
                </div>
            </Dialog>
        );
    }
}

const AddAccountModal = ({ contactOnlyMode }) => (
    <ModalTrigger>
        <Button label="click for modal" variant="primary" modaltrigger />
        <ModalContentHackForSpectrum modalcontent contactOnlyMode={contactOnlyMode} />
    </ModalTrigger>
);

export default AddAccountModal;
