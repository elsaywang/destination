import { createAction } from 'redux-actions';

export const GET_REPORT_SUITES = 'GET_REPORT_SUITES';
export const GET_REPORT_SUITES_FULFILLED = 'GET_REPORT_SUITES_FULFILLED';
export const GET_REPORT_SUITES_REJECTED = 'GET_REPORT_SUITES_REJECTED';
export const getReportSuites = createAction(GET_REPORT_SUITES, async function getReportSuites() {
    const result = await fetch('/api/v1/datasources/?search=suite');

    return result.json();
});
