import { FETCH_REPORT_SUITES_FULFILLED } from '../../actions/reportSuites';
import reportSuitesReducer from '../reportSuites';

describe('reportSuitesReducer', () => {
    const initialState = [];
    it('should return the initial state', () => {
        expect(reportSuitesReducer(initialState, {})).toEqual(initialState);
    });
    it('should handle FETCH_REPORT_SUITES_FULFILLED', () => {
        const response = [
            {
                dataSourceId: 167463,
                pid: 1194,
                suite: 'test-report-suite1529440170725',
                datacenter: 'lon',
                ssf: false,
            },
            {
                dataSourceId: 167464,
                pid: 1194,
                suite: 'test-report-suite1529440170724',
                datacenter: 'lon',
                ssf: false,
            },
        ];
        const action = {
            type: FETCH_REPORT_SUITES_FULFILLED,
            payload: response,
        };

        expect(reportSuitesReducer(initialState, action)).toEqual(response);
    });
});
