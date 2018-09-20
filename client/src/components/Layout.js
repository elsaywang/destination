import React from 'react';
import ReactSpectrumProvider from '@react/react-spectrum/Provider';
import Heading from '@react/react-spectrum/Heading';
import classNames from 'classnames';
import { Grid, GridRow } from '@react/react-spectrum/Grid';
import Button from '@react/react-spectrum/Button';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from './Layout.css';
import BetaTag from '../components/common/BetaTag';

const messages = defineMessages({
    title: {
        id: 'components.Layout.title',
        description: 'Title for the Signals app',
        defaultMessage: 'Signals',
    },
});

function Layout(props) {
    return (
        <ReactSpectrumProvider scale="medium">
            <Grid className={styles.grid}>
                <GridRow>
                    <FormattedMessage {...messages.title}>
                        {text => <Heading className={styles.message}>{text}</Heading>}
                    </FormattedMessage>
                    <BetaTag
                        className={classNames(styles.entry, styles.betaTag)}
                        data-test="beta-tag"
                    />
                    <Button
                        className={classNames(styles.entry, styles.tourGuide)}
                        label="Take a Tour"
                        variant="secondary"
                        data-test="tour-guide"
                    />
                </GridRow>
                {props.children}
            </Grid>
        </ReactSpectrumProvider>
    );
}

export default Layout;
