import { stringifySignal } from './stringifySignals';
import { getDaysAgoUTCMidnight, getDaysAgoUTCEndOfDay, isToday } from './dateRange';

const normalizeSearchQuery = searchQuery => {
    const search = stringifySignal(searchQuery);

    return search && { search };
};

const normalizeStartDate = ({ viewRecordsFor, customStartDate }) => ({
    startDate: getDaysAgoUTCMidnight(
        viewRecordsFor === 'custom' ? customStartDate : viewRecordsFor,
    ),
});

const normalizeEndDate = ({ viewRecordsFor, customEndDate }) =>
    viewRecordsFor === 'custom' &&
    !isToday(customEndDate) && { endDate: getDaysAgoUTCEndOfDay(customEndDate) };

const normalizeSourceType = ({ source: { sourceType } }) => sourceType !== 'ALL' && { sourceType };

const normalizeDataSourceIds = ({ source: { dataSourceIds } }) =>
    dataSourceIds && dataSourceIds.length && { dataSourceIds };

const normalizeReportSuiteIds = ({ source: { reportSuiteIds } }) =>
    reportSuiteIds && reportSuiteIds.length && { reportSuiteIds };

const normalizeSource = search => {
    const sourceType = normalizeSourceType(search);
    const dataSourceIds = normalizeDataSourceIds(search);
    const reportSuiteIds = normalizeReportSuiteIds(search);

    return (
        (sourceType || dataSourceIds || reportSuiteIds) && {
            source: {
                ...sourceType,
                ...dataSourceIds,
                ...reportSuiteIds,
            },
        }
    );
};

const normalizeSignalStatus = ({ signalStatus }) => signalStatus !== 'ALL' && { signalStatus };

const normalizeFilterNewSignals = ({ filterNewSignals }) =>
    filterNewSignals && { filterNewSignals };

export const normalizeSearch = search => ({
    ...normalizeSearchQuery(search),
    ...normalizeStartDate(search),
    ...normalizeEndDate(search),
    ...normalizeSource(search),
    ...normalizeSignalStatus(search),
    ...normalizeFilterNewSignals(search),
    minEventFires: search.minEventFires,
    includeSourceName: true,
});
