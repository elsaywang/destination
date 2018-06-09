import { createAction } from 'redux-actions';
import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const GET_SAVED_SEARCH = 'GET_SAVED_SEARCH';
export const GET_SAVED_SEARCH_FULFILLED = 'GET_SAVED_SEARCH_FULFILLED';
export const GET_SAVED_SEARCH_REJECTED = 'GET_SAVED_SEARCH_REJECTED';
export const getSavedSearch = createAsyncAction(GET_SAVED_SEARCH, () =>
    fetch('/portal/api/v1/users/self/annotations/aam-portal'),
);

export const UPDATE_SAVE_SEARCH_NAME = 'UPDATE_SAVE_SEARCH_NAME';
export const updateSaveSearchName = createAction(UPDATE_SAVE_SEARCH_NAME);

export const TRACK_SEARCH_RESULT_IN_DASHBOARD = 'TRACK_SEARCH_RESULT_IN_DASHBOARD';
export const trackSearchResultInDashboard = createAction(TRACK_SEARCH_RESULT_IN_DASHBOARD);

export const SELECT_DEFAULT_SORTING = 'SELECT_DEFAULT_SORTING';
export const selectDefaultSorting = createAction(SELECT_DEFAULT_SORTING);

export const CHANGE_SORTING_ORDER = 'CHANGE_SORTING_ORDER';
export const changeSortingOrder = createAction(CHANGE_SORTING_ORDER);

export const CANCEL_SAVE_SEARCH = 'CANCEL_SAVE_SEARCH';
export const cancelSaveSearch = createAction(CANCEL_SAVE_SEARCH);

export const SAVE_SEARCH = 'SAVE_SEARCH';
export const SAVE_SEARCH_FULFILLED = 'SAVE_SEARCH_FULFILLED';
export const SAVE_SEARCH_REJECTED = 'SAVE_SEARCH_REJECTED';
export const saveSearch = createAsyncAction(SAVE_SEARCH, search =>
    fetch('/portal/api/v1/users/self/annotations/aam-portal', {
        method: 'PUT',
        body: JSON.stringify(search),
    }),
);

export const GET_SAVED_SEARCH_LIMIT = 'GET_SAVED_SEARCH_LIMIT';
export const GET_SAVED_SEARCH_LIMIT_FULFILLED = 'GET_SAVED_SEARCH_LIMIT_FULFILLED';
export const GET_SAVED_SEARCH_LIMIT_REJECTED = 'GET_SAVED_SEARCH_LIMIT_REJECTED';
export const getSavedSearchLimit = createAsyncAction(GET_SAVED_SEARCH_LIMIT, () =>
    fetch('/portal/api/v1/signals/limits'),
);

export const LOAD_MORE_SAVED_SEARCH = 'LOAD_MORE_SAVED_SEARCH';
export const loadMoreSavedSearch = createAction(LOAD_MORE_SAVED_SEARCH);

export const RESET_VISIBLE_SAVED_SEARCH = 'RESET_VISIBLE_SAVED_SEARCH';
export const resetVisibleSavedSearch = createAction(RESET_VISIBLE_SAVED_SEARCH);
