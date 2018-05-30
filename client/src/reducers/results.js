import { handleActions } from 'redux-actions';
import { CALL_SEARCH, CLEAR_SEARCH, SORT_SEARCH } from '../actions/searchForm';

const initialState = {
    list: [],
    page: 0,
    pageSize: 20,
    total: 0,
};

export const list = handleActions(
    {
        [CALL_SEARCH]: (state, action) =>
            action.payload.list.map(signal => ({
                ...signal,
                categoryType: signal.source.sourceType === 'ONBOARDED' ? 'ONBOARDED' : 'REALTIME',
            })),
    },
    initialState.list,
);

const results = handleActions(
    {
        [CALL_SEARCH]: (state, action) => ({
            ...state,
            list: list(getList(state), action),
        }),
        [CLEAR_SEARCH]: state => ({
            ...state,
            list: [],
        }),
        [SORT_SEARCH]: (state, action) => {
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
