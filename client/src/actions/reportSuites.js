import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const FETCH_REPORT_SUITES = 'FETCH_REPORT_SUITES';
export const FETCH_REPORT_SUITES_FULFILLED = 'FETCH_REPORT_SUITES_FULFILLED';
export const FETCH_REPORT_SUITES_REJECTED = 'FETCH_REPORT_SUITES_REJECTED';
export const fetchReportSuites = createAsyncAction(FETCH_REPORT_SUITES, () =>
    fetch('/portal/api/v1/report-suites'),
);
