import { createAsyncAction } from '../../utils/asyncReduxUtils';
import { apiUrl } from '../../utils/urls';
import { createAction } from 'redux-actions';
import _ from 'lodash';

export const updateIntegratedPlatformType = createAction('UPDATE_INTEGRATED_PLATFORM_TYPE');

const queryDestinationsAPI = queryOptions => {
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

    queryOptions = _.merge({}, defaultQueryOptions, queryOptions);
    const queryString = Object.entries(queryOptions)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');

    return fetch(`${apiUrl}?${queryString}`);
};

export const fetchDestinations = createAsyncAction('FETCH_DESTINATIONS', queryDestinationsAPI);

export const fetchMoreDestinations = createAsyncAction(
    'FETCH_MORE_DESTINATIONS',
    queryDestinationsAPI,
);
