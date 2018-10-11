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

// Ex: Signal A with dsId 12345, Signal B with dsId 67890 => [12345, 67890]
export const getDataSourceIdsOfSelectedResults = ({ selectedSignals, results }) =>
    getSelectedResults({ selectedSignals, results }).map(
        ({ source: { dataSourceIds = [] } } = {}) => dataSourceIds[0],
    );

// Ex: Signal A and Signal B both with sourceType 'ONBOARDED' => true
export const areAllSelectedResultsOnboarded = ({ selectedSignals, results }) => {
    const selectedResults = getSelectedResults({ selectedSignals, results });

    return (
        Boolean(selectedResults.length) &&
        selectedResults.every(({ source: { sourceType } } = {}) => sourceType === 'ONBOARDED')
    );
};

// Ex: Signal A with dsId 12345, Signal B with dsId 12345 => true
export const doAllSelectedResultsShareSameDataSource = ({ selectedSignals, results }) =>
    areAllSelectedResultsOnboarded({ selectedSignals, results }) &&
    getDataSourceIdsOfSelectedResults({ selectedSignals, results }).every(
        (dataSourceId, index, dataSourceIdList) => dataSourceId === dataSourceIdList[0],
    );

// Ex: Signal A with dsId 12345, Signal B with dsId 12345 => [12345]
export const getSharedDataSourceIdsOfSelectedOnboardedResults = ({ selectedSignals, results }) =>
    doAllSelectedResultsShareSameDataSource({ selectedSignals, results })
        ? [...new Set(getDataSourceIdsOfSelectedResults({ selectedSignals, results }))]
        : [];
