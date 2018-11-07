import React from 'react';
import ReactSpectrumProvider from '@react/react-spectrum/Provider';
import Heading from '@react/react-spectrum/Heading';
import classNames from 'classnames';
import { Grid, GridRow, GridColumn } from '@react/react-spectrum/Grid';
import Button from '@react/react-spectrum/Button';
import Info from '@react/react-spectrum/Icon/Info';
import { dataExplorerDocumentationLink } from '../utils/urls';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from './Layout.css';

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
                <GridRow valign="middle">
                    <GridColumn size={6}>
                        <GridRow>
                            <FormattedMessage {...messages.title}>
                                {text => <Heading className={styles.message}>{text}</Heading>}
                            </FormattedMessage>
                            {/*TODO:Add back tour guide
                            <Button
                                className={classNames(styles.entry, styles.tourGuide, 'tour-guide')}
                                label="Take a Tour"
                                variant="secondary"
                            />*/}
                        </GridRow>
                    </GridColumn>
                    <GridColumn
                        size={6}
                        className={classNames(
                            styles.dataExplorerDocumentationLink,
                            'data-explorer-documentation-link',
                        )}>
                        <Button
                            icon={<Info size="XS" />}
                            quiet
                            variant="secondary"
                            element="a"
                            rel="noopener"
                            target="_blank"
                            data-test="data-explorer-documentation-link"
                            href={dataExplorerDocumentationLink.url}
                            label={dataExplorerDocumentationLink.description}
                        />
                    </GridColumn>
                </GridRow>
                {props.children}
            </Grid>
        </ReactSpectrumProvider>
    );
}

export default Layout;
