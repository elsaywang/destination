import React from 'react';
import PropTypes from 'prop-types';
import ReactSpectrumProvider from '@react/react-spectrum/Provider';
import Heading from '@react/react-spectrum/Heading';
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
import { Grid, GridRow, GridColumn } from '@react/react-spectrum/Grid';
import { FormattedMessage } from 'react-intl';
import styles from './Layout.css';
import DropdownMenu from '../DropdownMenu';
import { dropdownMenuOptions } from '../../constants/destinationCreationOptions';
import { getMessages } from '../../utils/localization';

const Layout = ({ children, heading }) => {
    const messages = getMessages(heading);
    const { title } = messages;
    return (
        <IntlProvider locale="en">
            <ReactSpectrumProvider scale="medium">
                <Grid className={styles.grid}>
                    <GridRow
                        className={classNames({ [styles.gridRow]: heading === 'Configuration' })}
                        valign="middle">
                        <GridColumn size={6}>
                            <GridRow>
                                <FormattedMessage {...title}>
                                    {text => <Heading className={styles.message}>{text}</Heading>}
                                </FormattedMessage>
                            </GridRow>
                        </GridColumn>
                        {heading === 'Destinations' && (
                            <GridColumn
                                size={6}
                                className={classNames(
                                    styles.createDestinations,
                                    'creat-destination-dropdown',
                                )}>
                                <DropdownMenu
                                    title={'Create Destination'}
                                    menuOptions={dropdownMenuOptions}
                                />
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
    heading: PropTypes.oneOf(['Destinations', 'Configuration']),
    children: PropTypes.node,
};
export default Layout;
