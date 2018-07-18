import { handleActions } from 'redux-actions';
import {
    CALL_SEARCH_FULFILLED,
    LOAD_MORE_FULFILLED,
    THROTTLE_LOAD_MORE,
    CLEAR_SEARCH,
    UPDATE_SORT_OPTIONS,
} from '../actions/searchForm';
import { pageSize } from '../constants/paginationOptions';

const initialState = {
    list: [],
    page: 0,
    pageSize,
    total: 0,
    sortBy: undefined,
    descending: true,
    isThrottled: false,
    isEndOfResults: false,
};

export const handleList = (state, action) =>
    action.payload.list.map(signal => ({
        ...signal,
        categoryType: signal.source.sourceType === 'ONBOARDED' ? 'ONBOARDED' : 'REALTIME',
    }));

export const handleIsEndOfResults = (state, { payload: { list, pageSize } }) =>
    list.length < pageSize;

const results = handleActions(
    {
        [CALL_SEARCH_FULFILLED]: (state, action) => ({
            ...state,
            ...action.payload,
            list: handleList(getList(state), action),
            isEndOfResults: handleIsEndOfResults(state, action),
        }),
        [THROTTLE_LOAD_MORE]: (state, action) => ({
            ...state,
            isThrottled: action.payload,
        }),
        [LOAD_MORE_FULFILLED]: (state, action) => ({
            ...state,
            ...action.payload,
            list: [...getList(state), ...handleList(getList(state), action)],
            isEndOfResults: handleIsEndOfResults(state, action),
        }),
        [CLEAR_SEARCH]: state => ({
            ...state,
            list: [],
            isEndOfResults: false,
        }),
        [UPDATE_SORT_OPTIONS]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    initialState,
);

export const getList = state => state.list;
export const getIsEndOfResults = state => state.isEndOfResults;
export const getSortOptions = ({ sortBy, sortDir }) => ({ sortBy, sortDir });

export default results;
