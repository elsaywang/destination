import { handleActions } from 'redux-actions';
import {
    FETCH_DESTINATIONS_PENDING,
    FETCH_DESTINATIONS_FULFILLED,
    FETCH_DESTINATIONS_REJECTED,
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
    ]),
    { list: [], destinationType: 'ALL' },
);
