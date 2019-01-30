import { createAsyncAction } from '../../utils/asyncReduxUtils';
import { apiUrl, portalUrl } from '../../utils/urls';
import { createAction } from 'redux-actions';
import _ from 'lodash';
import fetch from '../../utils/fetch';

export const updateIntegratedPlatformType = createAction('UPDATE_INTEGRATED_PLATFORM_TYPE');

const queryDestinationsAPI = (queryOptions, getStore) => {
    const defaultQueryOptions = {
        includeMetrics: true,
        includePermissions: true,
        includeMasterDataSourceIdType: true,
        page: 0,
        pageSize: 50,
        q: 1546620859342,
        sortBy: 'name',
        descending: false,
    };

    const queryDataFromStore = _.pick(getStore().destinations, [
        'sortColumn',
        'sortDirection',
        'searchFormText',
    ]);

    // HACK: so so gross. This function shouldn't have to know so much about the store's structure
    const storeToQueryMappers = {
        sortColumn: sortColumn => ({ sortBy: sortColumn.key }),
        sortDirection: sortDirection => ({ descending: sortDirection === -1 }),
        searchFormText: searchFormText => ({ search: searchFormText }),
    };

    const appliedQueryOptions = _.transform(
        queryDataFromStore,
        (result, val, key) => _.merge(result, storeToQueryMappers[key](val)),
        {},
    );

    queryOptions = _.merge({}, defaultQueryOptions, appliedQueryOptions, queryOptions);
    const queryString = Object.entries(queryOptions)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');

    return fetch(`${apiUrl}/destinations?${queryString}`);
};

export const applySort = createAction('APPLY_SORT');

export const applySearch = createAction('APPLY_SEARCH');

export const applyFilter = createAction('APPLY_FILTER');

export const fetchDestinations = createAsyncAction('FETCH_DESTINATIONS', queryDestinationsAPI);

export const fetchMoreDestinations = createAsyncAction(
    'FETCH_MORE_DESTINATIONS',
    queryDestinationsAPI,
);

//TODO: update with real api delete call
export const deleteFromDestinationsAPI = (
    idToDelete, //fetch(`${portalUrl}/api/v1/destinations/${idToDelete}`, { method: 'DELETE' });
) => fetch(`${apiUrl}/destinations/${idToDelete}`, { method: 'DELETE' });

export const deleteDestination = createAsyncAction('DELETE_DESTINATION', deleteFromDestinationsAPI);
