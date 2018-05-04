import { handleActions } from 'redux-actions';
import { GET_REPORT_SUITES_FULFILLED } from '../actions/reportSuites';

const initialState = [];

export default handleActions(
    {
        [GET_REPORT_SUITES_FULFILLED]: (state, action) => action.payload,
    },
    initialState,
);
