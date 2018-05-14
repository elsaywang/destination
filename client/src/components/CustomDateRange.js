import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datepicker from '@react/react-spectrum/Datepicker';
import Label from './common/Label';
import { customDateFormat, maxLookbackDays } from '../constants/dateRangeConstants';
import { getNow, parseDate, boundDate } from '../utils/dateRange';

// The custom start and end dates must be at least 1 day apart.
const minCustomDateRangeLength = 1;

class CustomDateRange extends Component {
    handleCustomStartDateChange = valueText => {
        const customStartDate = boundDate({
            date: parseDate(valueText),
            min: this.getMinCustomStartDate(),
            max: this.getMaxCustomStartDate(),
        }).format(customDateFormat);

        this.props.onCustomStartDateChange(customStartDate);
    };

    handleCustomEndDateChange = valueText => {
        const customEndDate = boundDate({
            date: parseDate(valueText),
            min: this.getMinCustomEndDate(),
            max: this.getMaxCustomEndDate(),
        }).format(customDateFormat);

        this.props.onCustomEndDateChange(customEndDate);
    };

    getMinCustomStartDate() {
        return getNow()
            .startOf('day')
            .subtract(maxLookbackDays, 'days')
            .format(customDateFormat);
    }

    getMaxCustomStartDate() {
        const { customEndDate } = this.props;

        return moment
            .utc(customEndDate)
            .subtract(minCustomDateRangeLength, 'days')
            .format(customDateFormat);
    }

    getMinCustomEndDate() {
        const { customStartDate } = this.props;

        return moment
            .utc(customStartDate)
            .add(minCustomDateRangeLength, 'days')
            .format(customDateFormat);
    }

    getMaxCustomEndDate() {
        return getNow()
            .startOf('day')
            .format(customDateFormat);
    }

    render() {
        const { customStartDate, customEndDate } = this.props;

        return (
            <Fragment>
                <Label value="Start Date">
                    <Datepicker
                        className="custom-start-date"
                        data-test="custom-start-date"
                        value={customStartDate}
                        onChange={this.handleCustomStartDateChange}
                        min={this.getMinCustomStartDate()}
                        max={this.getMaxCustomStartDate()}
                        valueFormat={customDateFormat}
                        displayFormat="MM/DD/YYYY"
                        quiet
                    />
                </Label>

                <Label value="End Date">
                    <Datepicker
                        className="custom-end-date"
                        data-test="custom-end-date"
                        value={customEndDate}
                        onChange={this.handleCustomEndDateChange}
                        min={this.getMinCustomEndDate()}
                        max={this.getMaxCustomEndDate()}
                        valueFormat={customDateFormat}
                        displayFormat="MM/DD/YYYY"
                        quiet
                    />
                </Label>
            </Fragment>
        );
    }
}

CustomDateRange.propTypes = {
    customStartDate: PropTypes.string,
    customEndDate: PropTypes.string,
    onCustomStartDateChange: PropTypes.func,
    onCustomEndDateChange: PropTypes.func,
};

export default CustomDateRange;
