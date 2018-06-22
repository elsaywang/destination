import { stringifySignal } from './stringifySignals';
import { getDaysAgoUTCMidnight } from './dateRange';

const normalizeStartDate = ({ viewRecordsFor, customStartDate }) =>
    getDaysAgoUTCMidnight(viewRecordsFor === 'custom' ? customStartDate : viewRecordsFor);

const normalizeEndDate = ({ viewRecordsFor, customEndDate }) =>
    viewRecordsFor === 'custom' ? getDaysAgoUTCMidnight(customEndDate) : null;

const normalizeSourceType = ({ source }) =>
    source.sourceType === 'ALL' ? null : source.sourceType;

const normalizeDataSourceIds = ({ source }) =>
    source.dataSourceIds && source.dataSourceIds.length ? source.dataSourceIds : null;

const normalizeReportSuiteIds = ({ advanced, source }) =>
    advanced && source.reportSuiteIds && source.reportSuiteIds.length
        ? source.reportSuiteIds
        : null;

const normalizeSignalStatus = ({ signalStatus }) => (signalStatus === 'ALL' ? null : signalStatus);

const normalizeFilterNewSignals = ({ filterNewSignals }) =>
    filterNewSignals && { filterNewSignals };

export const normalizeSearch = search => ({
    search: stringifySignal(search),
    startDate: normalizeStartDate(search),
    endDate: normalizeEndDate(search),
    source: {
        sourceType: normalizeSourceType(search),
        dataSourceIds: normalizeDataSourceIds(search),
        reportSuiteIds: normalizeReportSuiteIds(search),
    },
    signalStatus: normalizeSignalStatus(search),
    minEventFires: search.minEventFires,
    ...normalizeFilterNewSignals(search),
    descending: true,
});
