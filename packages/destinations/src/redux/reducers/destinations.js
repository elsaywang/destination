import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { createAsyncActionHandlers } from '../../utils/asyncReduxUtils';
import {
    updateIntegratedPlatformType,
    fetchDestinations,
    fetchMoreDestinations,
} from '../actions/destinations';

const fetchDestinationsHandlers = createAsyncActionHandlers(fetchDestinations, {
    onPending: state => ({
        ...state,
        inFlight: true,
    }),
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge({}, state.list, _.keyBy(action.payload, el => el.id)),
        idsToDisplay: action.payload.map(({ id }) => id),
        inFlight: false,
    }),
    onError: state => ({
        ...state,
        inFlight: false,
    }),
});

const fetchMoreDestinationsHandlers = createAsyncActionHandlers(fetchMoreDestinations, {
    onPending: _.indentity,
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge({}, state.list, _.keyBy(action.payload, el => el.id)),
        idsToDisplay: state.idsToDisplay.concat(action.payload.map(({ id }) => id)),
    }),
    onError: _.indentity,
});

export default handleActions(
    new Map([
        ...fetchDestinationsHandlers,
        ...fetchMoreDestinationsHandlers,
        [
            updateIntegratedPlatformType,
            (state, action) => ({
                ...state,
                integratedPlatformType: action.payload,
            }),
        ],
    ]),
    { list: {}, idsToDisplay: [], destinationType: 'ALL', integratedPlatformType: '' },
);