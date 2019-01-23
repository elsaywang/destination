import React from 'react';
import PropTypes from 'prop-types';
import Button from '@react/react-spectrum/Button';
import Popover from '@react/react-spectrum/Popover';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import GraphBarVertical from '@react/react-spectrum/Icon/GraphBarVertical';
import styles from './action.css';

const MetcisView = ({ destination, disabled }) => {
    const {
        type,
        shareableAudience,
        addressableAudience,
        matchRate,
        lifetimeAddressableAudience,
    } = destination;

    const renderTitle = () => (
        <span className={styles.metricsTitle}>{`${type.toUpperCase()} PLATFORM`}</span>
    );

    return (
        <OverlayTrigger trigger="click" placement="left">
            <Button label="" variant="action" quiet icon={<GraphBarVertical size="S" />} />
            <Popover title={renderTitle()}>
                TBD
                <br />
            </Popover>
        </OverlayTrigger>
    );
};

MetcisView.defaultProps = {
    disabled: false,
};

MetcisView.protoTypes = {
    destination: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.oneOf(['People-Based', 'Device-Based']),
        shareableAudience: PropTypes.number,
        addressableAudience: PropTypes.number,
        matchRate: PropTypes.string,
        lifetimeAddressableAudience: PropTypes.number,
    }),
};

export default MetcisView;
