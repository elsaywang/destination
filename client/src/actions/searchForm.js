import { createAction } from 'redux-actions';
import { normalizeSearch } from '../utils/normalizeSearch';

export const CALL_SEARCH = 'CALL_SEARCH';
export const CALL_SEARCH_FULFILLED = 'CALL_SEARCH_FULFILLED';
export const CALL_SEARCH_REJECTED = 'CALL_SEARCH_REJECTED';
export const callSearch = createAction(CALL_SEARCH, async search => {
    const normalizedSearch = normalizeSearch(search);
    const options = {
        body: JSON.stringify(normalizedSearch),
        cache: 'no-cache',
        method: 'POST',
    };

    // TODO: pass in options above when making a real API call,
    // currently the json-server does not return anything for a POST call
    const result = await fetch('/api/signals/list');

    // TODO: This will allow us to see the API request body until we call the
    // real API.
    console.log(normalizedSearch);

    return result.json();
});

export const SORT_SEARCH = 'SORT_SEARCH';
export const SORT_SEARCH_FULFILLED = 'SORT_SEARCH_FULFILLED';
export const SORT_SEARCH_REJECTED = 'SORT_SEARCH_REJECTED';
export const sortSearch = createAction(SORT_SEARCH, (sortColumn, sortDir) => {
    const order = sortDir ? 'desc' : 'asc';

    return fetch(`/api/signals/list?_sort=${sortColumn}?_order=${order}`).then(
        result => result.json(),
        error => {
            throw new Error(error);
        },
    );
});

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = createAction(CLEAR_SEARCH);
