import { createAction } from 'redux-actions';

export const POPULATE_SEARCH_FIELDS = 'POPULATE_SEARCH_FIELDS';
export const populateSearchFields = createAction(POPULATE_SEARCH_FIELDS);

export const CLEAR_SEARCH_FIELDS = 'CLEAR_SEARCH_FIELDS';
export const clearSearchFields = createAction(CLEAR_SEARCH_FIELDS);
