import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    getBarWidth({ percentageChange, maxPercentageMagnitude }) {
        const minWidth = 0.1 * maxPercentageMagnitude;
        const normalizedBarWidth =
            (Math.abs(percentageChange) + minWidth) / (maxPercentageMagnitude + minWidth);
        const scaledBarWidth = normalizedBarWidth * maxBarWidth;
        const barWidth = Math.round(scaledBarWidth * 100) / 100;

        return `${barWidth}rem`;
    }

    getClassVariant(percentageChange) {
        return percentageChange >= 0 ? 'percentageChange--positive' : 'percentageChange--negative';
    }

    render() {
        const { percentageChange, maxPercentageMagnitude } = this.props;
        const percentageChangeClass = classNames(
            styles.percentageChange,
            styles[this.getClassVariant(percentageChange)],
        );
        const sign = percentageChange >= 0 ? '+' : '–';
        const barWidth = this.getBarWidth({
            percentageChange,
            maxPercentageMagnitude,
        });

        return (
            <div className={percentageChangeClass}>
                <FormattedNumber
                    value={Math.abs(percentageChange)}
                    style="percent"
                    minimumFractionDigits={2}>
                    {percentage => (
                        <span className={styles.percentage}>{`${sign} ${percentage}`}</span>
                    )}
                </FormattedNumber>
                <span className={styles.barContainer}>
                    <span className={styles.middleDivider} />
                    <span style={{ width: barWidth }} className={styles.bar} />
                </span>
            </div>
        );
    }
}

PercentageChange.propTypes = {
    percentageChange: PropTypes.number.isRequired,
    maxPercentageMagnitude: PropTypes.number.isRequired,
};

export default PercentageChange;
