import React from 'react';
import Heading from '@react/react-spectrum/Heading';
import { Grid } from '@react/react-spectrum/Grid';

function Layout(props) {
    return (
        <Grid>
            <Heading>Signals</Heading>
            {props.children}
        </Grid>
    );
}

export default Layout;
