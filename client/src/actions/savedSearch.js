import { createAction } from 'redux-actions';

export const GET_SAVED_SEARCH = 'GET_SAVED_SEARCH';
export const GET_SAVED_SEARCH_FULFILLED = 'GET_SAVED_SEARCH_FULFILLED';
export const GET_SAVED_SEARCH_REJECTED = 'GET_SAVED_SEARCH_REJECTED';
export const getSavedSearch = createAction(GET_SAVED_SEARCH, async function getSavedSearch() {
    const result = await fetch('/api/v1/users/self/annotations/aam-portal');

    return result.json();
});
