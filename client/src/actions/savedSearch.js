import { createAction } from 'redux-actions';

export const GET_SAVED_SEARCH = 'GET_SAVED_SEARCH';
export const GET_SAVED_SEARCH_FULFILLED = 'GET_SAVED_SEARCH_FULFILLED';
export const GET_SAVED_SEARCH_REJECTED = 'GET_SAVED_SEARCH_REJECTED';
export const getSavedSearch = createAction(GET_SAVED_SEARCH, async function getSavedSearch() {
    const result = await fetch('/api/v1/users/self/annotations/aam-portal');

    return result.json();
});

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
export const saveSearch = createAction(SAVE_SEARCH, async search => {
    // TODO: normalize this request to api expected request
    try {
        const result = await fetch('/api/v1/users/self/annotations/aam-portal', {
            method: 'put',
            body: JSON.stringify(search),
        });
        //TODO: handle response as correct search to pass to reducer.
        //return result.json();
        //Assume response status code is 200
        return search;
    } catch (error) {
        throw new Error(error);
    }
});
