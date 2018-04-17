import { createAction } from 'redux-actions';

export const UPDATE_SAVE_SEARCH_NAME = 'UPDATE_SAVE_SEARCH_NAME';
export const updateSaveSearchName = createAction(UPDATE_SAVE_SEARCH_NAME);

export const TRACK_SEARCH_RESULT_IN_DASHBOARD = 'TRACK_SEARCH_RESULT_IN_DASHBOARD';
export const trackSearchResultInDashboard = createAction(TRACK_SEARCH_RESULT_IN_DASHBOARD);

export const SELECT_DEFAULT_SORTING = 'SELECT_DEFAULT_SORTING';
export const selectDefaultSorting = createAction(SELECT_DEFAULT_SORTING);

export const CHANGE_SORTING_ORDER = 'CHANGE_SORTING_ORDER';
export const changeSortingOrder = createAction(CHANGE_SORTING_ORDER);

export const CANCEL_SAVE_SEARCH = 'CANCEL_SAVE_SEARCH';
export const cancleSaveSearch = createAction(CANCEL_SAVE_SEARCH);

export const SAVE_THIS_SEARCH = 'SAVE_THIS_SEARCH';
export const SAVE_THIS_SEARCH_FULFILLED = 'SAVE_THIS_SEARCH_FULFILLED';
export const SAVE_THIS_SEARCH_REJECTED = 'SAVE_THIS_SEARCH_REJECTED';

export const saveCurrentSearch = createAction(SAVE_THIS_SEARCH, async payload => {
    // TODO: normalize this request to api expected request
    try {
        const result = await fetch('/api/saveThisSearch', {
            method: 'post',
            body: JSON.stringify(payload),
        });
        //TODO: handle response as correct payload to pass to reducer.
        //return result.json();
        //Assume response status code is 200
        return payload;
    } catch (error) {
        throw new Error(error);
    }
});
