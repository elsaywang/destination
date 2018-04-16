import { handleActions } from 'redux-actions';
import { GET_SAVED_SEARCH_FULFILLED } from '../actions/savedSearch';

const initialState = [];

function addId(obj, i) {
    return {
        ...obj,
        id: i,
    };
}

export default handleActions(
    {
        [GET_SAVED_SEARCH_FULFILLED]: (state, action) =>
            action.payload.map(savedSearch => ({
                ...savedSearch,
                keyValuePairs: savedSearch.keyValuePairs.map(addId),
            })),
    },
    initialState,
);
