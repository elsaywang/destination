import { handleActions } from 'redux-actions';
import {
    UPDATE_SAVE_SEARCH_NAME,
    SAVE_THIS_SEARCH_FULFILLED,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    CANCEL_SAVE_SEARCH,
} from '../actions/saveThisSearch';

const initialState = {
    name: '',
    includeInDashboard: false,
    sortBy: '',
    descending: false,
};

export default handleActions(
    {
        [UPDATE_SAVE_SEARCH_NAME]: (state, action) => ({
            ...state,
            name: action.payload,
        }),
        [TRACK_SEARCH_RESULT_IN_DASHBOARD]: (state, action) => ({
            ...state,
            includeInDashboard: action.payload,
        }),
        [SELECT_DEFAULT_SORTING]: (state, action) => ({
            ...state,
            sortBy: action.payload,
        }),
        [CHANGE_SORTING_ORDER]: (state, action) => ({ ...state, descending: action.payload }),
        [CANCEL_SAVE_SEARCH]: (state, action) => ({
            ...state,
            ...initialState,
        }),
        [SAVE_THIS_SEARCH_FULFILLED]: (state, action) => ({ ...state, ...action.payload }),
    },
    initialState,
);
