import { handleActions } from 'redux-actions';
import { FETCH_REPORT_SUITES_FULFILLED } from '../actions/reportSuites';

const initialState = [];

export default handleActions(
    {
        [FETCH_REPORT_SUITES_FULFILLED]: (state, action) => action.payload,
    },
    initialState,
);
