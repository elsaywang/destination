import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import requiredIf from 'react-required-if';
import Button from '@react/react-spectrum/Button';
import Popover from '@react/react-spectrum/Popover';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import GraphBarVertical from '@react/react-spectrum/Icon/GraphBarVertical';
import MetricsContext from './MetricsContext';
import styles from './action.css';

const MetricsView = ({ destination }) => {
    const { addressableAudienceMetrics, destinationType } = destination;

    const metricsProps = _.merge(
        {},
        destinationType === 'S2S' && {
            type: 'Device-Based',
            addressableAudience: addressableAudienceMetrics.clientAddressableAudience30Day,
            matchRate: '0%', //TODO: need to get the correct formula to calculate
            lifetimeAddressableAudience:
                addressableAudienceMetrics.platformAddressableAudienceLifetime,
        },
        destinationType === 'PEOPLE_BASED' && {
            type: 'People-Based',
            shareableAudience: 34785, // TODO: fetch from API for PEOPLE_BASED
        },
    );

    const { type } = metricsProps;

    const renderTitle = () => (
        <span className={styles.metricsTitle}>{`${type.toUpperCase()} PLATFORM`}</span>
    );

    return (
        <OverlayTrigger trigger="click" placement="left">
            <Button label="" variant="action" quiet icon={<GraphBarVertical size="S" />} />
            <Popover title={renderTitle()}>
                <MetricsContext {...metricsProps} />
            </Popover>
        </OverlayTrigger>
    );
};

MetricsView.defaultProps = {
    disabled: false,
};

MetricsView.propTypes = {
    disabled: PropTypes.bool,
    destination: PropTypes.shape({
        destinationId: PropTypes.number,
        name: PropTypes.string,
        destinationType: PropTypes.oneOf(['PEOPLE_BASED', 'S2S']).isRequired,
        addressableAudienceMetrics: requiredIf(
            PropTypes.shape({
                platformAddressableAudienceLifetime: PropTypes.number,
                clientAddressableAudience30Day: PropTypes.number,
            }),
            ({ destinationType }) => destinationType === 'S2S',
        ),
        shareableAudience: requiredIf(
            PropTypes.number,
            ({ destinationType }) => destinationType === 'PEOPLE_BASED',
        ),
    }),
};

export default MetricsView;
