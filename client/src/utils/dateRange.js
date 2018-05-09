import moment from 'moment';
import {
    customDateFormat,
    validDateRangeDays,
    defaultDateRangeDays,
} from '../constants/dateRangeConstants';

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

export const getDaysAgoTimestamp = start =>
    getNow()
        .subtract(getDaysAgo(start), 'days')
        .valueOf();
