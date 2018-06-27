import { validDateRangeDays } from '../constants/dateRangeConstants';
import { defaultMaxSignalRetentionDays } from '../constants/limitConstants';
import { dateRangeDaysToPreset } from './dateRange';

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
