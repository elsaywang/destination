import { handleActions } from 'redux-actions';
import {
    CALL_SEARCH_FULFILLED,
    LOAD_MORE_FULFILLED,
    CLEAR_SEARCH,
    SORT_SEARCH_FULFILLED,
} from '../actions/searchForm';

const initialState = {
    list: [],
    page: 0,
    pageSize: 20,
    total: 0,
};

export const handleList = (state, action) =>
    action.payload.list.map(signal => ({
        ...signal,
        categoryType: signal.source.sourceType === 'ONBOARDED' ? 'ONBOARDED' : 'REALTIME',
    }));

const results = handleActions(
    {
        [CALL_SEARCH_FULFILLED]: (state, action) => ({
            ...action.payload,
            list: handleList(getList(state), action),
        }),
        [LOAD_MORE_FULFILLED]: (state, action) => ({
            ...action.payload,
            list: [...getList(state), ...handleList(getList(state), action)],
        }),
        [CLEAR_SEARCH]: state => ({
            ...state,
            list: [],
        }),
        [SORT_SEARCH_FULFILLED]: (state, action) => {
            return {
                ...state,
                list: action.payload.list.reverse(),
            };
        },
    },
    initialState,
);

export const getList = state => state.list;

export default results;
