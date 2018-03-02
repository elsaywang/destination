import { handleActions } from 'redux-actions';
import { CALL_SEARCH_FULFILLED } from '../actions';

const initialState = [];

const results = handleActions(
    {
        [CALL_SEARCH_FULFILLED]: (state = [], action) => {
            return [...state, ...action.payload.results];
        },
    },
    initialState,
);

export default results;
