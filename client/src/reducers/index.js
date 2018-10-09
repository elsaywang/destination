import { combineReducers } from 'redux';
import results from './results';
import savedSearch from './savedSearch';
import savedSearchFields from './savedSearchFields';
import selectedSignals, { getSelectedRowIndexes } from './selectedSignals';
import reportSuites from './reportSuites';
import errors from './errors';
import permissions from './permissions';
import traitBackfill from './traitBackfill';
import dataSources from './dataSources';

export default combineReducers({
    results,
    savedSearch,
    savedSearchFields,
    selectedSignals,
    reportSuites,
    errors,
    permissions,
    traitBackfill,
    dataSources,
});

export const getSelectedResults = ({ selectedSignals, results }) =>
    getSelectedRowIndexes(selectedSignals).map(index => ({
        ...results.list[index],
    }));

export const getSelectedResultsDataSources = ({ selectedSignals, results }) => {
    const dataSources = getSelectedResults({ selectedSignals, results }).map(
        ({ source }) => source,
    );
    //flatten the nested subarrays
    return dataSources
        .map(({ dataSourceIds }) => dataSourceIds)
        .reduce((prevDataSourceIds, currentDataSourceIds) => {
            //dataSourceIds may be null
            return currentDataSourceIds
                ? [...prevDataSourceIds, ...currentDataSourceIds]
                : [...prevDataSourceIds];
        }, []);
};
