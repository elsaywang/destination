import { combineReducers } from 'redux';
import results from './results';

const savedSearches = (state = [], action) => state;

export default combineReducers({
    results,
    savedSearches,
});
