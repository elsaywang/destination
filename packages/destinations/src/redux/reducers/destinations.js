import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { createAsyncActionHandlers } from '../../utils/asyncReduxUtils';
import { applySort } from '../actions/tableActions';
import {
    updateIntegratedPlatformType,
    fetchDestinations,
    fetchMoreDestinations,
    deleteDestination,
    applySearch,
    applyFilter,
} from '../actions/destinations';
import columnsForDestinationType from '../../constants/columns';

const initialDestinationType = 'All';

const fetchDestinationsHandlers = createAsyncActionHandlers(fetchDestinations, {
    onPending: (state, action) => ({
        ...state,
        replacementDataInFlight: true,
    }),
    onFulfilled: (state, action) => ({
        ...state,
        byIds: _.merge({}, state.byIds, _.keyBy(action.payload.list, el => el.destinationId)),
        idsToDisplay: action.payload.list.map(({ destinationId }) => destinationId),
        replacementDataInFlight: false,
    }),
    onError: state => ({
        ...state,
        replacementDataInFlight: false,
    }),
});

const fetchMoreDestinationsHandlers = createAsyncActionHandlers(fetchMoreDestinations, {
    onPending: _.indentity,
    onFulfilled: (state, action) => {
        const allDestinationsLoaded = state.idsToDisplay.includes(
            _.first(action.payload.list).destinationId,
        );
        return {
            ...state,
            byIds: _.merge({}, state.byIds, _.keyBy(action.payload.list, el => el.destinationId)),
            idsToDisplay: allDestinationsLoaded
                ? state.idsToDisplay
                : state.idsToDisplay.concat(
                      action.payload.list.map(({ destinationId }) => destinationId),
                  ),
        };
    },
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
            _.omitBy(
                { ...state.byIds },
                el => state.idToDelete && el.destinationId === state.idToDelete,
            ),
        ),
        idsToDisplay: state.idsToDisplay.filter(id => state.idToDelete && id !== state.idToDelete),
        replacementDataInFlight: false,
    }),
    onError: state => ({
        ...state,
        replacementDataInFlight: false,
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
        [
            applySort,
            (state, action) => ({
                ...state,
                sortColumn: action.payload.sortColumn,
                sortDirection: action.payload.sortDirection,
            }),
        ],
        [
            applySearch,
            (state, action) => ({
                ...state,
                searchFormText: action.payload,
            }),
        ],
        [
            applyFilter,
            (state, action) => ({
                ...state,
                filterBy: action.payload,
            }),
        ],
    ]),
    {
        idsToDisplay: [],
        destinationType: initialDestinationType,
        sortColumn: columnsForDestinationType[initialDestinationType][0].key,
        sortDirection: 1,
        integratedPlatformType: '',
    },
);
