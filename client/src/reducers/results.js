import { handleActions } from 'redux-actions';
import { CALL_SEARCH, LOAD_MORE, CLEAR_SEARCH, SORT_SEARCH } from '../actions/searchForm';

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
        [CALL_SEARCH]: (state, action) => ({
            ...action.payload,
            list: handleList(getList(state), action),
        }),
        [LOAD_MORE]: (state, action) => ({
            ...action.payload,
            list: [...getList(state), ...handleList(getList(state), action)],
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
