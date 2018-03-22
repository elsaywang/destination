import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import classNames from 'classnames';
import styles from './PercentageChange.css';

const maxBarWidth = 2; // Coupled to half of 4rem width of the .barContainer class.

class PercentageChange extends Component {
    /**
     * Get the width of the colored bar that visualizes the percentage change.
     * @param  {number} percentageChange       prop, used for width of colored bar
     * @param  {Number} maxPercentageMagnitude prop, used to normalize bar's width
     * @param  {maxBarWidth} maxBarWidth       constant, used as scaling factor
     * @return {string}                        width of colored bar in `rem`
     */
    getBarWidth({ percentageChange, maxPercentageMagnitude, maxBarWidth }) {
        const minWidth = 0.1 * maxPercentageMagnitude;
        const normalizedBarWidth =
            (Math.abs(percentageChange) + minWidth) / (maxPercentageMagnitude + minWidth);
        const scaledBarWidth = normalizedBarWidth * maxBarWidth;

        return `${scaledBarWidth}rem`;
    }

    render() {
        const { percentageChange, maxPercentageMagnitude } = this.props;
        const barClass = classNames({
            [styles['bar--positive']]: percentageChange >= 0,
            [styles['bar--negative']]: percentageChange < 0,
        });
        const barWidth = this.getBarWidth({
            percentageChange,
            maxPercentageMagnitude,
            maxBarWidth,
        });

        return (
            <div className={styles.percentageChange}>
                <FormattedNumber value={percentageChange} style="percent" minimumFractionDigits={2}>
                    {percentage => <span className={styles.percentage}>{percentage}</span>}
                </FormattedNumber>
                <span className={styles.barContainer}>
                    <span className={styles.middleDivider} />
                    <span style={{ width: barWidth }} className={barClass} />
                </span>
            </div>
        );
    }
}

export default PercentageChange;
