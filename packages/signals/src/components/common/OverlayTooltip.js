import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './OverlayTooltip.css';
import Tooltip from '@react/react-spectrum/Tooltip';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Info from '@react/react-spectrum/Icon/Info';
import Button from '@react/react-spectrum/Button';

const OverlayTooltip = ({ message, className }) => {
    return (
        <div className={classNames(styles.tooltip, className)} data-test="overlay-tooltip">
            <OverlayTrigger trigger={['hover', 'focus']} placement="right">
                <Button quiet variant="tool" icon={<Info size="S" />} />
                <Tooltip data-test="saved-search-limit-message">{message}</Tooltip>
            </OverlayTrigger>
        </div>
    );
};

OverlayTooltip.propTypes = {
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default OverlayTooltip;
