import moment from 'moment';
import {
    customDateFormat,
    defaultDateRangeDays,
    defaultDateRangePreset,
} from '../constants/dateRangeConstants';

export const getNow = () => moment.utc();

export const getDefaultCustomStartDate = () =>
    getNow()
        .subtract(defaultDateRangeDays, 'days')
        .format(customDateFormat);

export const getDefaultCustomEndDate = () => getNow().format(customDateFormat);
