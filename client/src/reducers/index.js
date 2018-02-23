import { combineReducers } from 'redux';

const results = (state = [], action) => state;
const savedSearches = (state = [], action) => state;

export default combineReducers({
    results,
    savedSearches,
});
