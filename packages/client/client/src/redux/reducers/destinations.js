import { handleActions } from 'redux-actions';
import {
    FETCH_DESTINATIONS_PENDING,
    FETCH_DESTINATIONS_FULFILLED,
    FETCH_DESTINATIONS_REJECTED,
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
                list: state.list.concat(action.payload),
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
            UPDATE_INTEGRATED_PLATFORM_TYPE,
            (state, action) => ({
                ...state,
                integratedPlatformType: action.payload,
            }),
        ],
    ]),
    { list: [], integratedPlatformType: '' },
);
