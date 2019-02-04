import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '@react/react-spectrum/Heading';
import styles from './action.css';
import { metricsHeadings } from '../../constants/metrics';

const MetricsContext = ({ type, ...metricsValues }) => {
    return metricsHeadings
        .filter(({ integratedType }) => integratedType === type)
        .map(({ heading, key }) => (
            <Fragment key={key}>
                <Heading
                    variant="subtitle2"
                    className={classNames(styles.contextHeading, {
                        [styles.lifeTimeAddressableAudience]:
                            `${key}` === `lifetimeAddressableAudience`,
                    })}>
                    {heading}
                </Heading>
                <span className={styles.contextData}>{metricsValues[key].toLocaleString()}</span>
            </Fragment>
        ));
};

MetricsContext.defaultProps = {};

MetricsContext.propTypes = {
    type: PropTypes.oneOf(['People-Based', 'Device-Based']),
    shareableAudience: PropTypes.number,
    addressableAudience: PropTypes.number,
    matchRate: PropTypes.string,
    lifetimeAddressableAudience: PropTypes.number,
};

export default MetricsContext;
