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
        replacementDataInFlight: true,
    }),
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge({}, _.keyBy(action.payload, el => el.id)),
        idsToDisplay: action.payload.map(({ id }) => id),
        replacementDataInFlight: false,
    }),
    onError: state => ({
        ...state,
        replacementDataInFlight: false,
    }),
});

const fetchMoreDestinationsHandlers = createAsyncActionHandlers(fetchMoreDestinations, {
    onPending: _.indentity,
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge({}, state.byIds, _.keyBy(action.payload, el => el.id)),
        idsToDisplay: state.idsToDisplay.concat(action.payload.map(({ id }) => id)),
    }),
    onError: _.indentity,
});

//TODO: validate with real-data api call
const deleteDestinationHandlers = createAsyncActionHandlers(deleteDestination, {
    onPending: (state, action) => ({
        ...state,
        ...(action.payload[0] && { idToDelete: action.payload[0] }),
        replacementDataInFlight: true,
    }),
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge(
            {},
            _.omitBy({ ...state.byIds }, el => state.idToDelete && el.id === state.idToDelete),
        ),
        idsToDisplay: state.idsToDisplay.filter(id => state.idToDelete && id !== state.idToDelete),
        replacementDataInFlight: false,
    }),
    onError: _.indentity,
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
    { idsToDisplay: [], destinationType: 'ALL', integratedPlatformType: '' },
);
