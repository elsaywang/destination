import { createAction } from 'redux-actions';

export const CALL_SEARCH = 'CALL_SEARCH';
export const CALL_SEARCH_FULFILLED = 'CALL_SEARCH_FULFILLED';
export const CALL_SEARCH_REJECTED = 'CALL_SEARCH_REJECTED';
export const callSearch = createAction(CALL_SEARCH, search =>
    fetch('/api/results').then(result => result.json()),
);

export const SORT_SEARCH = 'SORT_SEARCH';
export const SORT_SEARCH_FULFILLED = 'SORT_SEARCH_FULFILLED';
export const SORT_SEARCH_REJECTED = 'SORT_SEARCH_REJECTED';
export const sortSearch = createAction(SORT_SEARCH, (sortColumn, sortDir) => {
    const order = sortDir ? 'desc' : 'asc';

    return fetch(`/api/results?_sort=${sortColumn}?_order=${order}`).then(
        result => result.json(),
        error => {
            throw new Error(error);
        },
    );
});

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = createAction(CLEAR_SEARCH);

export * from './selectSignals.action.js';
