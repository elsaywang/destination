import { combineReducers } from 'redux';
import results from './results';
import selectedSignals from './selectedSignals';
import savedSearch from './savedSearch';

export default combineReducers({
    results,
    savedSearch,
    selectedSignals,
});
