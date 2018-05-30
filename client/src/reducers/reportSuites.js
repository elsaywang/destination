import { handleActions } from 'redux-actions';
import { GET_REPORT_SUITES } from '../actions/reportSuites';

const initialState = [];

export default handleActions(
    {
        [GET_REPORT_SUITES]: (state, action) => action.payload,
    },
    initialState,
);
