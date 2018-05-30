import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const GET_REPORT_SUITES = 'GET_REPORT_SUITES';
export const GET_REPORT_SUITES_REJECTED = 'GET_REPORT_SUITES_REJECTED';
export const getReportSuites = createAsyncAction(GET_REPORT_SUITES, () =>
    fetch('/portal/api/v1/report-suites'),
);
