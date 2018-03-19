import React from 'react';
import Heading from '@react/react-spectrum/Heading';
import { Grid } from '@react/react-spectrum/Grid';
import { FormattedMessage as FM } from 'react-intl';
import '@react/react-spectrum/page';
import './Layout.css';

function Layout(props) {
    return (
        <Grid>
            <FM id="signals">{text => <Heading>{text}</Heading>}</FM>
            <Heading>
                <FM id="signals" />
            </Heading>
            {props.children}
        </Grid>
    );
}

export default Layout;
