import { combineReducers } from 'redux';
import results from './results';

const savedSearches = (state = []) => state;

export default combineReducers({
    results,
    savedSearches,
});
