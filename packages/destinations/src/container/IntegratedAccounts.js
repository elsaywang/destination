import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../components/EmptyState';
import Heading from '@react/react-spectrum/Heading';
import classNames from 'classnames';
import styles from './IntegratedAccounts.css';
import { connect } from 'react-redux'; //TODO: connect to redux store
import { Grid, GridRow, GridColumn } from '@react/react-spectrum/Grid';
import {
    configurationMessage,
    primaryEmptyMessage,
    secondaryEmptyMessage,
} from '../constants/configuration';
import Authentications from './Authentications';
import AddAccountModal from '../components/AddAccountModal';

class IntegratedAccounts extends Component {
    componentDidMount() {
        //this.props.fetchCredentials();
        //TODO, invoke the action creators to fetch the authentication List from API call and pass down the props
    }
    render() {
        //TODO: update when hooked with API
        const authenticationList =
            // (this.props.authentications &&
            //     this.props.authentications.idsToDisplay.map(id => byIds && byIds[id]))
            null;

        return (
            <Grid className={styles.configurationGrid}>
                <GridRow className={classNames(styles.gridRow)} valign="middle">
                    <GridColumn size={6}>
                        <Heading
                            variant="subtitle2"
                            data-test="configuration-heading-message"
                            className={styles.message}>
                            {configurationMessage}
                        </Heading>
                    </GridColumn>
                    <GridColumn size={6} className={classNames(styles.createDestinations)}>
                        <AddAccountModal
                            message={'Add Account'}
                        />
                    </GridColumn>
                </GridRow>

                {authenticationList && !authenticationList.length ? (
                    <EmptyState
                        primaryMessage={primaryEmptyMessage}
                        secondaryMessage={secondaryEmptyMessage}
                    /> //TODO:update the empty render logic when hooked with real API
                ) : (
                    <GridRow className={classNames(styles.authenticationList)}>
                        <Authentications {...this.props} />
                    </GridRow>
                )}
            </Grid>
        );
    }
}

//TODO: update the props based on API response and authentication table fields
IntegratedAccounts.propTypes = {
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

export default IntegratedAccounts;
