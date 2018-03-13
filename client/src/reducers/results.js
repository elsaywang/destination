import { handleActions } from 'redux-actions';
import { CALL_SEARCH_FULFILLED } from '../actions';

const initialState = {
    list: [],
    page: 0,
    pageSize: 0,
    total: 0,
};

const list = handleActions(
    {
        [CALL_SEARCH_FULFILLED]: (state, action) => action.payload.list,
    },
    initialState.list,
);

const results = handleActions(
    {
        [CALL_SEARCH_FULFILLED]: (state, action) => {
            return {
                ...state,
                list: list(getList(state), action),
            };
        },
    },
    initialState,
);

export const getList = state => state.list;

export default results;
