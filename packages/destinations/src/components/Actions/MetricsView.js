import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Button from '@react/react-spectrum/Button';
import Popover from '@react/react-spectrum/Popover';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import GraphBarVertical from '@react/react-spectrum/Icon/GraphBarVertical';
import MetricsContext from './MetricsContext';
import styles from './action.css';

const MetricsView = ({ destination }) => {
    /* Actual API response doesn't perfectly match format here. Hacking it for now to get this PR in */
    destination = _.merge(destination, {
        type: 'Device-Based',
        shareableAudience: 7839241,
        addressableAudience: 438975,
        matchRate: '32%',
        lifetimeAddressableAudience: 3784610,
    });
    /* ---- End Hacky stuff ---- */

    const { type } = destination;

    const renderTitle = () => (
        <span className={styles.metricsTitle}>{`${type.toUpperCase()} PLATFORM`}</span>
    );

    return (
        <OverlayTrigger trigger="click" placement="left">
            <Button label="" variant="action" quiet icon={<GraphBarVertical size="S" />} />
            <Popover title={renderTitle()}>
                <MetricsContext {...destination} />
            </Popover>
        </OverlayTrigger>
    );
};

MetricsView.propTypes = {
    disabled: false,
    destination: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.oneOf(['People-Based', 'Device-Based']).isRequired,
        shareableAudience: PropTypes.number,
        addressableAudience: PropTypes.number,
        matchRate: PropTypes.string,
        lifetimeAddressableAudience: PropTypes.number,
    }),
};

export default MetricsView;
