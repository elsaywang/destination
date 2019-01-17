import React from 'react';
import EmptyState from '../components/EmptyState';
import Button from '@react/react-spectrum/Button';
import Heading from '@react/react-spectrum/Heading';
import classNames from 'classnames';
import styles from './Configuration.css';
import { Grid, GridRow, GridColumn } from '@react/react-spectrum/Grid';
import {
    configurationMessage,
    primaryEmptyMessage,
    secondaryEmptyMessage,
} from '../constants/configuration';

const Configuration = ({ children }) => (
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
                <Button data-test="configuration-add-account-button" variant="primary">
                    Add Account
                </Button>
            </GridColumn>
        </GridRow>
        <EmptyState primaryMessage={primaryEmptyMessage} secondaryMessage={secondaryEmptyMessage} />
    </Grid>
);

export default Configuration;
