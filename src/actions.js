import { createAction } from 'redux-actions';

export const CALL_SEARCH = 'CALL_SEARCH';
export const CALL_SEARCH_FULFILLED = 'CALL_SEARCH_FULFILLED';
export const CALL_SEARCH_REJECTED = 'CALL_SEARCH_REJECTED';
export const callSearch = createAction(
    CALL_SEARCH,
    path =>
        new Promise(() => ({
            search: path,
        })),
);
