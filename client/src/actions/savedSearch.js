import { createAction } from 'redux-actions';
import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const GET_SAVED_SEARCH = 'GET_SAVED_SEARCH';
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
export const SAVE_SEARCH_REJECTED = 'SAVE_SEARCH_REJECTED';
export const saveSearch = createAsyncAction(SAVE_SEARCH, search =>
    fetch('/portal/api/v1/users/self/annotations/aam-portal', {
        method: 'PUT',
        body: JSON.stringify(search),
    }),
);
