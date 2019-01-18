import { createAsyncAction } from '../../utils/createAsyncAction';
import { createAction } from 'redux-actions';
import _ from 'lodash';

export const UPDATE_INTEGRATED_PLATFORM_TYPE = 'UPDATE_INTEGRATED_PLATFORM_TYPE';
export const updateIntegratedPlatformType = createAction(UPDATE_INTEGRATED_PLATFORM_TYPE);

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

    return fetch(`http://localhost:3003/api?${queryString}`);
};

const FETCH_DESTINATIONS = 'FETCH_DESTINATIONS';
export const FETCH_DESTINATIONS_PENDING = 'FETCH_DESTINATIONS_PENDING';
export const FETCH_DESTINATIONS_FULFILLED = 'FETCH_DESTINATIONS_FULFILLED';
export const FETCH_DESTINATIONS_REJECTED = 'FETCH_DESTINATIONS_REJECTED';

export const fetchDestinations = createAsyncAction(FETCH_DESTINATIONS, queryDestinationsAPI);

const FETCH_MORE_DESTINATIONS = 'FETCH_MORE_DESTINATIONS';
export const FETCH_MORE_DESTINATIONS_PENDING = 'FETCH_MORE_DESTINATIONS_PENDING';
export const FETCH_MORE_DESTINATIONS_FULFILLED = 'FETCH_MORE_DESTINATIONS_FULFILLED';
export const FETCH_MORE_DESTINATIONS_REJECTED = 'FETCH_MORE_DESTINATIONS_REJECTED';

export const fetchMoreDestinations = createAsyncAction(
    FETCH_MORE_DESTINATIONS,
    queryDestinationsAPI,
);
