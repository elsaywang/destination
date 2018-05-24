import { stringifySignal } from './stringifySignals';
import { getDaysAgoTimestamp } from './dateRange';

const normalizeStartDate = ({ viewRecordsFor, customStartDate }) =>
    getDaysAgoTimestamp(viewRecordsFor === 'custom' ? customStartDate : viewRecordsFor);

const normalizeEndDate = ({ viewRecordsFor, customEndDate }) =>
    viewRecordsFor === 'custom' ? getDaysAgoTimestamp(customEndDate) : null;

const normalizeSourceType = ({ source }) => (source.sourceType === 'ALL' ? '' : source.sourceType);

const normalizeDataSourceIds = ({ advanced, source }) =>
    advanced && source.dataSourceIds ? source.dataSourceIds : null;

const normalizeReportSuiteIds = ({ advanced, source }) =>
    advanced && source.reportSuiteIds ? source.reportSuiteIds : null;

export const normalizeSearch = search => ({
    search: stringifySignal(search),
    pageSize: 0,
    pid: 0,
    page: 0,
    startDate: normalizeStartDate(search),
    endDate: normalizeEndDate(search),
    source: {
        sourceType: normalizeSourceType(search),
        dataSourceIds: normalizeDataSourceIds(search),
        reportSuiteIds: normalizeReportSuiteIds(search),
    },
    signalStatus: search.signalStatus,
    minEventFires: search.minEventFires,
    descending: true,
});
