import { handleActions } from 'redux-actions';
import {
    CALL_SEARCH_FULFILLED,
    CALL_SEARCH_PENDING,
    LOAD_MORE_FULFILLED,
    THROTTLE_LOAD_MORE,
    CLEAR_SEARCH,
    UPDATE_SORT_OPTIONS,
} from '../actions/searchForm';
import { defaultDescending } from '../constants/sortOptions';
import { pageSize } from '../constants/paginationOptions';

const initialState = {
    list: [],
    page: 0,
    pageSize,
    total: 0,
    sortBy: undefined,
    descending: defaultDescending,
    isThrottled: false,
    isEndOfResults: false,
    isLoaded: false,
};

export const handleList = list =>
    list.map(signal => ({
        ...signal,
        categoryType: signal.source.sourceType === 'ONBOARDED' ? 'ONBOARDED' : 'REALTIME',
    }));

export const handleIsEndOfResults = (state, { payload: { list, pageSize } }) =>
    list.length < pageSize;

const results = handleActions(
    {
        [CALL_SEARCH_PENDING]: (state, action) => ({
            ...state,
            isLoaded: false,
        }),
        [CALL_SEARCH_FULFILLED]: (state, action) => ({
            ...state,
            ...action.payload,
            list: handleList(action.payload.list),
            isEndOfResults: handleIsEndOfResults(state, action),
            isLoaded: true,
        }),
        [THROTTLE_LOAD_MORE]: (state, action) => ({
            ...state,
            isThrottled: action.payload,
        }),
        [LOAD_MORE_FULFILLED]: (state, action) => ({
            ...state,
            ...action.payload,
            list: [...getList(state), ...handleList(action.payload.list)],
            isEndOfResults: handleIsEndOfResults(state, action),
            isLoaded: true,
        }),
        [CLEAR_SEARCH]: state => ({
            ...state,
            list: [],
            isEndOfResults: false,
            isLoaded: false,
        }),
        [UPDATE_SORT_OPTIONS]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    initialState,
);

export const getList = state => state.list;
export const isEndOfResults = state => state.isEndOfResults;
export const isResultsLoaded = state => state.isLoaded;
export const getSortOptions = ({ sortBy, descending }) => ({ sortBy, descending });

export default results;
