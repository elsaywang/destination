import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Datepicker from '@react/react-spectrum/Datepicker';
import Label from './common/Label';

class CustomDateRange extends Component {
    render() {
        const {
            customStartDate,
            onCustomStartDateChange,
            customEndDate,
            onCustomEndDateChange,
        } = this.props;

        return (
            <Fragment>
                <Label value="Start Date">
                    <Datepicker
                        className="custom-start-date"
                        data-test="custom-start-date"
                        value={customStartDate}
                        onChange={onCustomStartDateChange}
                        quiet
                    />
                </Label>

                <Label value="End Date">
                    <Datepicker
                        className="custom-end-date"
                        data-test="custom-end-date"
                        value={customEndDate}
                        onChange={onCustomEndDateChange}
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
