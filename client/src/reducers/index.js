import { combineReducers } from 'redux';
import results from './results';
import selectedSignals from './selectedSignals';

const savedSearches = (state = []) => state;

export default combineReducers({
    results,
    savedSearches,
    selectedSignals,
});
