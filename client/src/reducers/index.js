import { combineReducers } from 'redux';
import results from './results';
import selectedSignals from './selectedSignals';
import savedSearch from './savedSearch';
import saveThisSearch from './saveThisSearch';
import savedSearchFields from './savedSearchFields';

export default combineReducers({
    results,
    savedSearch,
    selectedSignals,
    saveThisSearch,
    savedSearchFields,
});
