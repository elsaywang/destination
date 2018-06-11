import { handleActions } from 'redux-actions';
import {
    GET_SAVED_SEARCH_FULFILLED,
    UPDATE_SAVE_SEARCH_NAME,
    SAVE_SEARCH_FULFILLED,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    CANCEL_SAVE_SEARCH,
    GET_SAVED_SEARCH_LIMIT_FULFILLED,
    LOAD_MORE_SAVED_SEARCH,
    RESET_VISIBLE_SAVED_SEARCH,
} from '../actions/savedSearch';
import {
    defaultSavedSearchLimit,
    defaultTotalVisibleSavedSearch,
} from '../constants/limitConstants.js';

const initialState = {
    list: [],
    limit: defaultSavedSearchLimit,
    totalVisibleSavedSearch: defaultTotalVisibleSavedSearch,
    saveSearch: {
        name: '',
        includeInDashboard: false,
        sortBy: 'percentageChange',
        descending: false,
    },
};

const addId = (obj, i) => ({
    ...obj,
    id: i,
});

const list = handleActions(
    {
        [GET_SAVED_SEARCH_FULFILLED]: (state, action) =>
            action.payload.map(savedSearch => ({
                ...savedSearch,
                keyValuePairs: savedSearch.keyValuePairs.map(addId),
            })),
        [SAVE_SEARCH_FULFILLED]: (state, action) => action.payload,
    },
    initialState.list,
);

const saveSearch = handleActions(
    {
        [SAVE_SEARCH_FULFILLED]: () => ({
            ...initialState.saveSearch,
        }),
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
        [CHANGE_SORTING_ORDER]: (state, action) => ({
            ...state,
            descending: action.payload,
        }),
        [CANCEL_SAVE_SEARCH]: () => ({
            ...initialState.saveSearch,
        }),
    },
    initialState.saveSearch,
);

const limit = handleActions(
    {
        [GET_SAVED_SEARCH_LIMIT_FULFILLED]: (state, action) => ({
            ...state,
            limit: action.payload.maxSignalSavedSearches,
        }),
    },
    initialState.limit,
);

const totalVisibleSavedSearch = handleActions(
    {
        [LOAD_MORE_SAVED_SEARCH]: (state, action) => ({
            ...state,
            totalVisibleSavedSearch: state + 1,
        }),
        [RESET_VISIBLE_SAVED_SEARCH]: () => ({
            totalVisibleSavedSearch: initialState.totalVisibleSavedSearch,
        }),
    },
    initialState.totalVisibleSavedSearch,
);

const handleSavedSearchList = (state, action) => ({
    ...state,
    list: list(state.list, action),
});

const handleSaveSearch = (state, action) => ({
    ...state,
    saveSearch: saveSearch(state.saveSearch, action),
});

const handleSavedSearchListLimit = (state, action) => ({
    ...state,
    ...limit(state.limit, action),
});

const handleLoadMoreSavedSearch = (state, action) => ({
    ...state,
    ...totalVisibleSavedSearch(state.totalVisibleSavedSearch, action),
});

export default handleActions(
    {
        [GET_SAVED_SEARCH_FULFILLED]: handleSavedSearchList,
        [GET_SAVED_SEARCH_LIMIT_FULFILLED]: handleSavedSearchListLimit,
        [LOAD_MORE_SAVED_SEARCH]: handleLoadMoreSavedSearch,
        [RESET_VISIBLE_SAVED_SEARCH]: handleLoadMoreSavedSearch,
        [SAVE_SEARCH_FULFILLED]: (state, action) => ({
            limit: limit(state.limit, action),
            list: list(state.list, action),
            saveSearch: saveSearch(state.saveSearch, action),
            totalVisibleSavedSearch: totalVisibleSavedSearch(state.totalVisibleSavedSearch, action),
        }),
        [UPDATE_SAVE_SEARCH_NAME]: handleSaveSearch,
        [TRACK_SEARCH_RESULT_IN_DASHBOARD]: handleSaveSearch,
        [SELECT_DEFAULT_SORTING]: handleSaveSearch,
        [CHANGE_SORTING_ORDER]: handleSaveSearch,
        [CANCEL_SAVE_SEARCH]: handleSaveSearch,
    },
    initialState,
);

export const getLimit = state => state.limit;
export const getSavedSearchList = state => state.list;
export const isSavedSearchLimitReached = state =>
    Boolean(getSavedSearchList(state).length >= getLimit(state));
export const getNormalizedSavedSearchList = state =>
    isSavedSearchLimitReached(state)
        ? [...getSavedSearchList(state)].slice(0, getLimit(state))
        : getSavedSearchList(state);

export const getTotalVisibleSavedSearchCount = state => state.totalVisibleSavedSearch;
export const getTrackedInDashboardSavedSearchList = state =>
    getSavedSearchList(state).filter(({ includeInDashboard }) => includeInDashboard);
export const getVisibleSavedSearchList = state =>
    [...getTrackedInDashboardSavedSearchList(state)].slice(
        0,
        getTotalVisibleSavedSearchCount(state),
    );
