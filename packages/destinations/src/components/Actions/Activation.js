import React from 'react';
import PropTypes from 'prop-types';
import styles from './action.css';
import AddAccountModal from '../AddAccountModal';

const Activation = ({ authentication, disabled, addAccount }) => (
    <AddAccountModal
        message={authentication.expireIn === 'Expired' ? 'Reactivate' : 'Renew'}
        quiet
        className={styles.activationButton}
        disabled={disabled}
        addAccount={addAccount}
        authentication={authentication}
    />
);

Activation.defaultProps = {
    disabled: false,
    addAccount: () => {
        //no-ops
    },
};

Activation.propTypes = {
    //TODO: AddAccountModal may need to add corresponding props value
    authentication: PropTypes.shape({
        adAccountId: PropTypes.string,
        accountName: PropTypes.string,
        expireIn: PropTypes.string,
    }),
    addAccount: PropTypes.func, //TODO
    disabled: PropTypes.bool,
};

export default Activation;
