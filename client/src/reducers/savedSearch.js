import { handleActions } from 'redux-actions';
import { GET_SAVED_SEARCH_FULFILLED } from '../actions/savedSearch';

const initialState = [];

export default handleActions(
    {
        [GET_SAVED_SEARCH_FULFILLED]: (state, action) => [...action.payload],
    },
    initialState,
);
