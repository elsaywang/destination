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
        sourceType: search.source.sourceType === 'ALL' ? '' : search.source.sourceType,
        dataSourceIds:
            search.advanced && search.source.dataSourceIds ? search.source.dataSourceIds : 0,
        reportSuiteIds:
            search.advanced && search.source.reportSuiteIds ? search.source.reportSuiteIds : '',
    },
    signalStatus: search.signalStatus,
    minEventFires: search.minEventFires,
    descending: true,
});
