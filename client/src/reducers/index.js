import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const results = (state = [], action) => state;
const savedSearches = (state = [], action) => state;
const test = handleActions(
    {
        CALL_SEARCH_FULFILLED: (state, action) => action.payload,
    },
);

export default combineReducers({
    results,
    savedSearches,
    test,
});
