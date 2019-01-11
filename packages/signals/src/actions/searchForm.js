import { createAction } from 'redux-actions';
import { createAsyncAction } from '../utils/createAsyncAction';
import { fetchSignals } from '../utils/fetchSignals';

export const TOGGLE_ADVANCED_SEARCH = 'TOGGLE_ADVANCED_SEARCH';
export const toggleAdvancedSearch = createAction(TOGGLE_ADVANCED_SEARCH);

export const CALL_SEARCH = 'CALL_SEARCH';
export const CALL_SEARCH_PENDING = 'CALL_SEARCH_PENDING';
export const CALL_SEARCH_FULFILLED = 'CALL_SEARCH_FULFILLED';
export const CALL_SEARCH_REJECTED = 'CALL_SEARCH_REJECTED';
export const callSearch = createAsyncAction(CALL_SEARCH, fetchSignals);

export const LOAD_MORE = 'LOAD_MORE';
export const LOAD_MORE_PENDING = 'LOAD_MORE_PENDING';
export const LOAD_MORE_FULFILLED = 'LOAD_MORE_FULFILLED';
export const LOAD_MORE_REJECTED = 'LOAD_MORE_REJECTED';
export const loadMore = createAsyncAction(LOAD_MORE, fetchSignals);

export const THROTTLE_LOAD_MORE = 'THROTTLE_LOAD_MORE';
export const throttleLoadMore = createAction(THROTTLE_LOAD_MORE);

export const UPDATE_SORT_OPTIONS = 'UPDATE_SORT_OPTIONS';
export const updateSortOptions = createAction(UPDATE_SORT_OPTIONS);

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = createAction(CLEAR_SEARCH);
