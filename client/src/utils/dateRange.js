import moment from 'moment';
import {
    customDateFormat,
    dateInputFormats,
    validDateRangeDays,
    defaultDateRangeDays,
} from '../constants/dateRangeConstants';
import { defaultMaxSignalRetentionDays } from '../constants/limitConstants';

/**
 * Most utils in this file are adapted from trait_builder/create.js  and adobe_am_utils.js in the portal.
 * Once both projects have access to shared utils, extract and reuse them.
 */

export const isDateRangePreset = dateRangePreset =>
    validDateRangeDays.map(dateRangeDaysToPreset).includes(dateRangePreset);

export const dateRangeDaysToPreset = (dateRangeDays = defaultDateRangeDays) =>
    validDateRangeDays.includes(dateRangeDays) ? `${dateRangeDays}D` : `${defaultDateRangeDays}D`;

export const dateRangePresetToDays = (
    dateRangePreset = dateRangeDaysToPreset(defaultDateRangeDays),
) => (isDateRangePreset(dateRangePreset) ? parseInt(dateRangePreset) : defaultDateRangeDays);

export const getNow = () => moment.utc();

export const getDefaultCustomStartDate = () =>
    getNow()
        .subtract(defaultDateRangeDays, 'days')
        .format(customDateFormat);

export const getDefaultCustomEndDate = () => getNow().format(customDateFormat);

export const dateToDaysAgo = (date, format = customDateFormat) =>
    getNow().diff(moment.utc(date, format, true), 'days');

export const getDaysAgo = start =>
    isDateRangePreset(start) ? dateRangePresetToDays(start) : dateToDaysAgo(start);

export const getDaysAgoUTCMidnight = start =>
    getNow()
        .subtract(getDaysAgo(start), 'days')
        .startOf('day')
        .valueOf();

export const parseDate = dateInput => moment.utc(dateInput, dateInputFormats);

export const boundDate = ({ date, min, max }) => {
    const lowerBoundedDate = moment.max(moment.utc(date), moment.utc(min));
    const upperBoundedDate = moment.min(lowerBoundedDate, moment.utc(max));

    return upperBoundedDate;
};

export const getDateRangesWithinRetentionPolicy = (
    maxSignalRetentionDays = defaultMaxSignalRetentionDays,
) => validDateRangeDays.filter(dateRangeDays => maxSignalRetentionDays >= dateRangeDays);

export const getDateRangeOptions = (dateRangeDays = validDateRangeDays) => [
    ...dateRangeDays.map(days => ({
        label: `Last ${days} Day${days === 1 ? '' : 's'}`,
        value: dateRangeDaysToPreset(days),
    })),
    {
        label: 'Custom Date Range',
        value: 'custom',
    },
];

export const getDateRangeOptionsWithinRetentionPolicy = (
    maxSignalRetentionDays = defaultMaxSignalRetentionDays,
) => getDateRangeOptions(getDateRangesWithinRetentionPolicy(maxSignalRetentionDays));

export const getDateRangeLabel = dateRangePreset => {
    const dateRangeOption = getDateRangeOptions().find(option => option.value === dateRangePreset);

    return dateRangeOption ? dateRangeOption.label : '';
};
