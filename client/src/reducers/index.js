import { combineReducers } from 'redux';
import results from './results';
import savedSearch from './savedSearch';
import savedSearchFields from './savedSearchFields';
import selectedSignals from './selectedSignals';

export default combineReducers({
    results,
    savedSearch,
    savedSearchFields,
    selectedSignals,
});
