import React from 'react';
import PropTypes from 'prop-types';
import ReactSpectrumProvider from '@react/react-spectrum/Provider';
import Heading from '@react/react-spectrum/Heading';
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
import { Grid, GridRow, GridColumn } from '@react/react-spectrum/Grid';
import { FormattedMessage } from 'react-intl';
import styles from './Layout.css';
import Button from '@react/react-spectrum/Button';
import SearchWrapper from '../Search';
import { getMessages } from '../../utils/localization';

const Layout = ({ children, heading }) => {
    const messages = getMessages(heading);
    const { title } = messages;
    return (
        <IntlProvider locale="en">
            <ReactSpectrumProvider scale="medium">
                <Grid className={styles.grid}>
                    <GridRow
                        className={classNames({
                            [styles.gridRow]: heading === 'Integrated Accounts',
                        })}
                        valign="middle">
                        <GridColumn size={6}>
                            <GridRow>
                                <FormattedMessage {...title}>
                                    {text => <Heading className={styles.message}>{text}</Heading>}
                                </FormattedMessage>
                            </GridRow>
                            {heading === 'Destinations' && <SearchWrapper />}
                        </GridColumn>
                        {heading === 'Destinations' && (
                            <GridColumn
                                size={6}
                                className={classNames(
                                    styles.createDestinations,
                                    'creat-destination-button',
                                )}>
                                <Button variant="cta">{'Create Destination'}</Button>
                            </GridColumn>
                        )}
                    </GridRow>
                    {children}
                </Grid>
            </ReactSpectrumProvider>
        </IntlProvider>
    );
};

Layout.propTypes = {
    heading: PropTypes.oneOf(['Destinations', 'Integrated Accounts']),
    children: PropTypes.node,
};
export default Layout;
