import { handleActions } from 'redux-actions';
import {
    GET_SAVED_SEARCH_FULFILLED,
    UPDATE_SAVE_SEARCH_NAME,
    SAVE_SEARCH_FULFILLED,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    CANCEL_SAVE_SEARCH,
} from '../actions/savedSearch';

const initialState = {
    list: [],
    saveSearch: {
        name: '',
        includeInDashboard: false,
        sorting: '',
        descending: false,
    },
};

const addId = (obj, i) => ({
    ...obj,
    id: i,
});

const list = handleActions(
    {
        [GET_SAVED_SEARCH_FULFILLED]: (state, action) =>
            action.payload.map(savedSearch => ({
                ...savedSearch,
                keyValuePairs: savedSearch.keyValuePairs.map(addId),
            })),
        [SAVE_SEARCH_FULFILLED]: (state, action) => action.payload,
    },
    initialState.list,
);

const saveSearch = handleActions(
    {
        [SAVE_SEARCH_FULFILLED]: () => ({
            ...initialState.saveSearch,
        }),
        [UPDATE_SAVE_SEARCH_NAME]: (state, action) => ({
            ...state,
            name: action.payload,
        }),
        [TRACK_SEARCH_RESULT_IN_DASHBOARD]: (state, action) => ({
            ...state,
            includeInDashboard: action.payload,
        }),
        [SELECT_DEFAULT_SORTING]: (state, action) => ({
            ...state,
            sorting: action.payload,
        }),
        [CHANGE_SORTING_ORDER]: (state, action) => ({
            ...state,
            descending: action.payload,
        }),
        [CANCEL_SAVE_SEARCH]: () => ({
            ...initialState.saveSearch,
        }),
    },
    initialState.saveSearch,
);

const handleSavedSearchList = (state, action) => ({
    ...state,
    list: list(state.list, action),
});

const handleSaveSearch = (state, action) => ({
    ...state,
    saveSearch: saveSearch(state.saveSearch, action),
});

export default handleActions(
    {
        [GET_SAVED_SEARCH_FULFILLED]: handleSavedSearchList,
        [SAVE_SEARCH_FULFILLED]: (state, action) => ({
            list: list(state.list, action),
            saveSearch: saveSearch(state.saveSearch, action),
        }),
        [UPDATE_SAVE_SEARCH_NAME]: handleSaveSearch,
        [TRACK_SEARCH_RESULT_IN_DASHBOARD]: handleSaveSearch,
        [SELECT_DEFAULT_SORTING]: handleSaveSearch,
        [CHANGE_SORTING_ORDER]: handleSaveSearch,
        [CANCEL_SAVE_SEARCH]: handleSaveSearch,
    },
    initialState,
);
