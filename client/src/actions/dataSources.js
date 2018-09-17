import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const FETCH_DATA_SOURCES = 'FETCH_DATA_SOURCES';
export const FETCH_DATA_SOURCES_FULFILLED = 'FETCH_DATA_SOURCES_FULFILLED';
export const FETCH_DATA_SOURCES_REJECTED = 'FETCH_DATA_SOURCES_REJECTED';
export const fetchDataSources = createAsyncAction(FETCH_DATA_SOURCES, () =>
    fetch('/portal/api/v1/datasources/?inboundOnly=true&excludeReportSuites=true'),
);
