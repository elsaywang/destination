import { isKeyValuePairEmpty } from './searchValidation';
import { stringifySignal } from './stringifySignals';
import { getDaysAgoUTCMidnight } from './dateRange';

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
    viewRecordsFor === 'custom' && { endDate: getDaysAgoUTCMidnight(customEndDate) };

const normalizeSourceType = ({ source: { sourceType } }) => sourceType !== 'ALL' && { sourceType };

const normalizeDataSourceIds = ({ source: { dataSourceIds } }) =>
    dataSourceIds && dataSourceIds.length && { dataSourceIds };

const normalizeReportSuiteIds = ({ advanced, source: { reportSuiteIds } }) =>
    advanced && reportSuiteIds && reportSuiteIds.length && { reportSuiteIds };

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
    sortBy: search.sortBy,
    minEventFires: search.minEventFires,
    ...normalizeFilterNewSignals(search),
    descending: search.descending,
    includeSourceName: true,
});
