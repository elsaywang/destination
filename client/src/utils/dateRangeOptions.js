import { validDateRangeDays } from '../constants/dateRangeConstants';
import { defaultMaxSignalRetentionDays } from '../constants/limitConstants';
import { dateRangeDaysToPreset } from './dateRange';

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

export const getDateRangeLabel = dateRangePreset => {
    const dateRangeOption = getDateRangeOptions().find(option => option.value === dateRangePreset);

    return dateRangeOption ? dateRangeOption.label : '';
};
