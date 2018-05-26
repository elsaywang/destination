import fetch from '../utils/fetch';
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

    const result = await fetch('/portal/api/v1/signals/list', options);

    return result.json();
});

export const SORT_SEARCH = 'SORT_SEARCH';
export const SORT_SEARCH_FULFILLED = 'SORT_SEARCH_FULFILLED';
export const SORT_SEARCH_REJECTED = 'SORT_SEARCH_REJECTED';
export const sortSearch = createAction(SORT_SEARCH, (search, sortBy, sortDir) => {
    const descending = sortDir === -1;
    const normalizedSearch = normalizeSearch(search);
    const options = {
        body: JSON.stringify({
            ...normalizedSearch,
            sortBy,
            descending,
        }),
        cache: 'no-cache',
        method: 'POST',
    };

    return fetch(`/portal/api/v1/signals/list`, options).then(
        result => result.json(),
        error => {
            throw new Error(error);
        },
    );
});

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = createAction(CLEAR_SEARCH);
