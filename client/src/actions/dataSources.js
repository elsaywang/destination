import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const GET_DATA_SOURCES = 'GET_DATA_SOURCES';
export const GET_DATA_SOURCES_FULFILLED = 'GET_DATA_SOURCES_FULFILLED';
export const GET_DATA_SOURCES_REJECTED = 'GET_DATA_SOURCES_REJECTED';
export const getDataSources = createAsyncAction(GET_DATA_SOURCES, () =>
    fetch('/portal/api/v1/datasources/?inboundOnly=true&excludeReportSuites=true'),
);
