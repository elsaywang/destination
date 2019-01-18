import _ from 'lodash';
import { handleActions } from 'redux-actions';
import {
    FETCH_DESTINATIONS_PENDING,
    FETCH_DESTINATIONS_FULFILLED,
    FETCH_DESTINATIONS_REJECTED,
    FETCH_MORE_DESTINATIONS_PENDING,
    FETCH_MORE_DESTINATIONS_FULFILLED,
    FETCH_MORE_DESTINATIONS_REJECTED,
    UPDATE_INTEGRATED_PLATFORM_TYPE,
} from '../actions/destinations';

export default handleActions(
    new Map([
        [
            FETCH_DESTINATIONS_PENDING,
            (state, action) => ({
                ...state,
                inFlight: true,
            }),
        ],
        [
            FETCH_DESTINATIONS_FULFILLED,
            (state, action) => ({
                ...state,
                byIds: _.merge({}, state.list, _.keyBy(action.payload, el => el.id)),
                idsToDisplay: action.payload.map(({ id }) => id),
                inFlight: false,
            }),
        ],
        [
            FETCH_DESTINATIONS_REJECTED,
            (state, action) => ({
                ...state,
                inFlight: false,
            }),
        ],
        [
            FETCH_MORE_DESTINATIONS_PENDING,
            (state, action) => ({
                ...state,
            }),
        ],
        [
            FETCH_MORE_DESTINATIONS_FULFILLED,
            (state, action) => ({
                ...state,
                byIds: _.merge({}, state.list, _.keyBy(action.payload, el => el.id)),
                idsToDisplay: state.idsToDisplay.concat(action.payload.map(({ id }) => id)),
            }),
        ],
        [
            FETCH_MORE_DESTINATIONS_REJECTED,
            (state, action) => ({
                ...state,
            }),
        ],
        [
            UPDATE_INTEGRATED_PLATFORM_TYPE,
            (state, action) => ({
                ...state,
                integratedPlatformType: action.payload,
            }),
        ],
    ]),
    { list: {}, idsToDisplay: [], destinationType: 'ALL', integratedPlatformType: '' },
);
