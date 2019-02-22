import { createAsyncAction } from '../../utils/asyncReduxUtils';
import { apiUrl } from '../../utils/urls';
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

    // FIXME: This is actually garbage
    if (queryOptions && queryOptions.itemsSeen) {
        queryOptions.page = Math.floor(queryOptions.itemsSeen / defaultQueryOptions.pageSize);
    }

    // HACK: so so gross. This function shouldn't have to know so much about the store's structure
    const storeToQueryMappers = {
        sortColumn: columnKey => ({ sortBy: columnKey }),
        sortDirection: sortDirection => ({ descending: sortDirection === -1 }),
        searchFormText: searchFormText => ({ search: searchFormText }),
        filterBy: filterBy => ({ restrictType: filterBy }),
    };

    const queryDataFromStore = _.pick(getStore().destinations, Object.keys(storeToQueryMappers));

    const appliedQueryOptions = _.transform(
        queryDataFromStore,
        (result, val, key) => _.merge(result, storeToQueryMappers[key](val)),
        {},
    );

    const allQueryOptions = _.merge({}, defaultQueryOptions, appliedQueryOptions, queryOptions);
    const queryOptionsAsTuples = _.flatMap(Object.entries(allQueryOptions), ([key, val]) => {
        if (Array.isArray(val)) {
            return val.map(queryVal => [key, queryVal]);
        }

        return [[key, val]];
    });
    const queryString = queryOptionsAsTuples.map(([key, val]) => `${key}=${val}`).join('&');

    return fetch(`${apiUrl}/destinations?${queryString}`);
};

export const applySearch = createAction('APPLY_SEARCH');

export const applyFilter = createAction('APPLY_FILTER');

export const fetchDestinations = createAsyncAction('FETCH_DESTINATIONS', queryDestinationsAPI)({
    json: true,
});

export const fetchMoreDestinations = createAsyncAction(
    'FETCH_MORE_DESTINATIONS',
    queryDestinationsAPI,
)({ json: true });

//TODO: update with real api delete call
const deleteFromDestinationsAPI = (
    idToDelete, //fetch(`${portalUrl}/api/v1/destinations/${idToDelete}`, { method: 'DELETE' });
) => fetch(`${apiUrl}/destinations/${idToDelete}`, { method: 'DELETE' });

export const deleteDestination = createAsyncAction('DELETE_DESTINATION', deleteFromDestinationsAPI)(
    { json: false },
);
