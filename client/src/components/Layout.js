import React from 'react';
import ReactSpectrumProvider from '@react/react-spectrum/Provider';
import Heading from '@react/react-spectrum/Heading';
import { Grid } from '@react/react-spectrum/Grid';
import { defineMessages, FormattedMessage } from 'react-intl';
import './Layout.css';

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
            <Grid style={{ overflow: 'auto' }}>
                <FormattedMessage {...messages.title}>
                    {text => <Heading>{text}</Heading>}
                </FormattedMessage>
                {props.children}
            </Grid>
        </ReactSpectrumProvider>
    );
}

export default Layout;
