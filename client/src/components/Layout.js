import React from 'react';
import Heading from '@react/react-spectrum/Heading';
import { Grid } from '@react/react-spectrum/Grid';
import { defineMessages, FormattedMessage } from 'react-intl';
import '@react/react-spectrum/page';
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
        <Grid>
            <FormattedMessage {...messages.title}>
                {text => <Heading>{text}</Heading>}
            </FormattedMessage>
            {props.children}
        </Grid>
    );
}

export default Layout;
