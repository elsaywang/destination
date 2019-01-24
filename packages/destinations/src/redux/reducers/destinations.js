import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { createAsyncActionHandlers } from '../../utils/asyncReduxUtils';
import {
    updateIntegratedPlatformType,
    fetchDestinations,
    fetchMoreDestinations,
    deleteDestination,
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

//TODO: change the onPening, onFulfilled once hooked with real-data, need to pass down id 
const deleteDestinationHandlers = createAsyncActionHandlers(deleteDestination, {
    onPending: state => ({
        ...state,
        inFlight: true,
    }),
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge({}, _.omitBy({ ...state.byIds }, el => el.id === action.payload.id)),
        idsToDisplay: state.idsToDisplay.filter(id => id !== action.payload.id),
        inFlight: false,
    }),
    onError: state => ({
        ...state,
        inFlight: false,
    }),
});

export default handleActions(
    new Map([
        ...fetchDestinationsHandlers,
        ...fetchMoreDestinationsHandlers,
        ...deleteDestinationHandlers,
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
