import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { GridRow } from '@react/react-spectrum/Grid';
import Edit from '@react/react-spectrum/Icon/Edit';
import Table from '../components/Table';
import AddAccountModal from '../components/AddAccountModal';
import Actions from '../components/Actions';
import styles from './Authentications.css';
import { columnsForAuthentications } from '../constants/columns';
import { destinationTemplateIDMap } from '../constants/integratedPlatformsOptions';
import { formatDate, expireIn } from '../utils/dateHelper';

//TODO: hook with realAPI call to get more data into list
const authenticationList = [
    {
        destinationTemplateId: 1,
        dcid: 1,
        pid: 1194,
        accountName: 'TestAccount',
        adAccountId: '1',
        status: 'UNDEFINED',
        irisPublishStatus: 'ACTIVE',
        expirationTime: 1548345128000,
        createTime: 1548345128000,
        crUid: 735,
        updateTime: 1548345128000,
        upUid: 0,
        emailNotificationList: [],
        credentialType: 'ACCOUNT',
    },
    {
        destinationTemplateId: 1,
        dcid: 2,
        pid: 1194,
        accountName: 'TestAccount2',
        adAccountId: '2',
        status: 'UNDEFINED',
        irisPublishStatus: 'ACTIVE',
        expirationTime: 1558345128000,
        createTime: 1558345128000,
        crUid: 736,
        updateTime: 1558345128000,
        upUid: 0,
        emailNotificationList: [],
        credentialType: 'ACCOUNT',
    },
];

class Authentications extends Component {
    renderCell = (column, data) => {
        const {
            destinationTemplateId,
            updateTime,
            expirationTime,
            emailNotificationList,
            accountName,
        } = data;

        const platform = destinationTemplateIDMap[destinationTemplateId];
        const authorizedDate = formatDate(updateTime);
        const expireInDays = expireIn(expirationTime);

        const { key } = column;
        switch (key) {
            case 'action':
                return this.renderActionCell(data);
            case 'destinationTemplateId':
                return <span>{platform}</span>;
            case 'expirationTime':
                return (
                    <span
                        className={classNames({
                            [styles.expiration]: `${expireInDays}` === 'Expired',
                        })}>
                        {expireInDays}
                    </span>
                );
            case 'updateTime':
                return <span>{authorizedDate}</span>;
            case 'emailNotificationList':
                return this.renderNotifyingCell(emailNotificationList, platform, accountName);
            default:
                return <span>{data[key]}</span>;
        }
    };

    renderNotifyingCell = (emailNotificationList, platform, accountName) => {
        //TODO: remove those fake emails when response has real email list
        emailNotificationList = ['abc@fb.com', 'def@fb.com', 'hello@fb.com', 'test@fb.com'];

        return (
            <div className={styles.notifyingCell}>
                {emailNotificationList.map(email => (
                    <GridRow align={'center'} className={styles.email} key={email}>
                        <span>{email}</span>
                    </GridRow>
                ))}
                <AddAccountModal
                    title="Add Contacts"
                    triggerIcon={<Edit size="XS" />}
                    quiet
                    contactOnlyMode
                    platform={platform}
                    accountName={accountName}
                    contactEmails={emailNotificationList}
                    className={styles.addAccountButton}
                />
            </div>
        );
    };

    renderActionCell = data => {
        const { deleteAuthentication } = this.props;
        return (
            <Actions
                authentication={data}
                handleDeleteAction={deleteAuthentication}
                isForDestination={false}
            />
        );
    };

    render() {
        return (
            <Table
                dataTest="authentication-list-table"
                items={this.props.authentications || authenticationList}
                height={250}
                columns={columnsForAuthentications}
                rowHeight={90}
                renderCell={this.renderCell}
            />
        );
    }
}

Authentications.propTypes = {
    fetchCredentials: PropTypes.func,
    authentications: PropTypes.shape({
        byIds: PropTypes.shape({
            id: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                enabled: PropTypes.bool,
                createdBy: PropTypes.string,
            }),
        }),
        idsToDisplay: PropTypes.arrayOf(PropTypes.number),
        sortColumn: PropTypes.object,
        sortDirection: PropTypes.oneOf([-1, 1]),
    }),
    deleteAuthentication: PropTypes.func,
};

export default Authentications;
