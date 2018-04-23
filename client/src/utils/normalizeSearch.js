import { stringifySignal } from './stringifySignals';

export const normalizeSearch = search => ({
    search: stringifySignal(search),
    pageSize: 0,
    pid: 0,
    page: 0,
    // TODO: use utils to calculate startDate/endDate
    startDate: 0,
    endDate: 0,
    source: {
        sourceType: search.signalType === 'ALL' ? '' : search.signalType,
        dataSourceId:
            search.advanced && search.filter.dataSourceId ? search.filter.dataSourceId : '',
        reportSuiteId:
            search.advanced && search.filter.reportSuiteId ? search.filter.reportSuiteId : '',
    },
    signalStatus: search.signalStatus,
    minEventFires: search.minEventFires,
    descending: true,
});
