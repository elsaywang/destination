import React from 'react';
import PropTypes from 'prop-types';
import Button from '@react/react-spectrum/Button';
import styles from './action.css';
import ModalTrigger from '@react/react-spectrum/ModalTrigger';
import Dialog from '@react/react-spectrum/Dialog';

const Activation = ({ authentication, disabled, addAccount, children }) => (
    <ModalTrigger>
        <Button
            data-test="action-activation-button"
            className={styles.activationButton}
            label={authentication.expireIn === 'Expired' ? 'Reactivate' : 'Renew'}
            quiet
            variant="primary"
            onClick={addAccount}
            disabled={disabled}
            modaltrigger
        />
        <Dialog modalContent title="Add Account" confirmLabel="OK" size="S" cancelLabel="close">
            <span>TBD, Add Account Modal Context </span>
            {/* children could be AddAccount Modal wrapped within <Activation/>*/}
            {children}
        </Dialog>
    </ModalTrigger>
);

Activation.defaultProps = {
    disabled: false,
    addAccount: () => {
        //no-ops
    },
};

Activation.propTypes = {
    authentication: PropTypes.shape({
        adAccountId: PropTypes.number,
        accountName: PropTypes.string,
        expireIn: PropTypes.string,
    }),
    addAccount: PropTypes.func, //TODO
    children: PropTypes.node,
};

export default Activation;
