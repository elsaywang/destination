import { handleActions } from 'redux-actions';
import { CLEAR_SEARCH, CALL_SEARCH_REJECTED, TOGGLE_ADVANCED_SEARCH } from '../actions/searchForm';
import { GET_SAVED_SEARCH_REJECTED, SAVE_SEARCH_REJECTED } from '../actions/savedSearch';
import { GET_REPORT_SUITES_REJECTED } from '../actions/reportSuites';

const initialState = {
    searchForm: {
        hasError: false,
        errorMessage: '',
    },
    savedSearch: {
        hasError: false,
        errorMessage: '',
    },
    reportSuites: {
        hasError: false,
        errorMessage: '',
    },
    saveSearch: {
        hasError: false,
        errorMessage: '',
    },
};

export const handleErrorState = (state, action) => {
    return {
        hasError: action.error,
        errorMessage: action.payload.statusText,
    };
};

export default handleActions(
    {
        [CLEAR_SEARCH]: () => initialState,
        [CALL_SEARCH_REJECTED]: (state, action) => ({
            ...state,
            searchForm: handleErrorState(state, action),
        }),
        [GET_SAVED_SEARCH_REJECTED]: (state, action) =>
            // Users who haven't saved any searches yet will get a 404 from the
            // annotations API.
            action.payload.status === 404
                ? {
                      ...state,
                  }
                : {
                      ...state,
                      savedSearch: handleErrorState(state, action),
                  },
        [SAVE_SEARCH_REJECTED]: (state, action) => ({
            ...state,
            saveSearch: handleErrorState(state, action),
        }),
        [GET_REPORT_SUITES_REJECTED]: (state, action) => ({
            ...state,
            reportSuites: handleErrorState(state, action),
        }),
        [TOGGLE_ADVANCED_SEARCH]: (state, action) => ({
            ...state,
            reportSuites: {
                hasError: action.payload ? state.reportSuites.hasError : false,
                errorMessage: '',
            },
        }),
    },
    initialState,
);
