import React from 'react';
import PropTypes from 'prop-types';
import styles from './action.css';
import AddAccountModal from '../AddAccountModal';
import { isExpired } from '../../utils/dateHelper';
import { destinationTemplateIDMap } from '../../constants/integratedPlatformsOptions';

const Activation = ({ authentication, disabled, addAccount }) => {
    const message = isExpired(authentication.expirationTime) ? 'Reactivate' : 'Renew';
    const { accountName, destinationTemplateId } = authentication;

    return (
        <AddAccountModal
            message={message}
            title={`${message} Account`}
            quiet
            className={styles.activationButton}
            disabled={disabled}
            addAccount={addAccount}
            accountName={accountName}
            platform={destinationTemplateIDMap[destinationTemplateId]}
        />
    );
};

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
        expirationTime: PropTypes.number,
        destinationTemplateId: PropTypes.number,
    }),
    addAccount: PropTypes.func, //TODO
    disabled: PropTypes.bool,
};

export default Activation;
