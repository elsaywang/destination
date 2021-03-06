import { handleActions } from 'redux-actions';
import { CLEAR_SEARCH, CALL_SEARCH_REJECTED, TOGGLE_ADVANCED_SEARCH } from '../actions/searchForm';
import { GET_SAVED_SEARCH_REJECTED, SAVE_SEARCH_REJECTED } from '../actions/savedSearch';
import { FETCH_REPORT_SUITES_REJECTED } from '../actions/reportSuites';
import { FETCH_DATA_SOURCES_REJECTED } from '../actions/dataSources';

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
    dataSources: {
        hasError: false,
        errorMessage: '',
    },
};

export const handleErrorState = (state, action) => ({
    hasError: action.error,
    errorMessage: action.payload.message,
});

export default handleActions(
    {
        [CLEAR_SEARCH]: () => initialState,
        [CALL_SEARCH_REJECTED]: (state, action) => ({
            ...state,
            searchForm: handleErrorState(state, action),
        }),
        [GET_SAVED_SEARCH_REJECTED]: (state, action) => ({
            ...state,
            // Users who haven't saved any searches yet will get a 404 from the
            // annotations API. Treat this like a 200 that returns an empty list
            // by doing nothing to the `error` reducer state.
            ...(action.payload.status !== 404 && {
                savedSearch: handleErrorState(state, action),
            }),
        }),
        [SAVE_SEARCH_REJECTED]: (state, action) => ({
            ...state,
            saveSearch: handleErrorState(state, action),
        }),
        [FETCH_REPORT_SUITES_REJECTED]: (state, action) => ({
            ...state,
            reportSuites: handleErrorState(state, action),
        }),
        [FETCH_DATA_SOURCES_REJECTED]: (state, action) => ({
            ...state,
            dataSources: handleErrorState(state, action),
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

export const getSearchFormError = state => state.searchForm;
export const hasSearchFormError = state => getSearchFormError(state).hasError;
export const getSearchFormErrorMessage = state => getSearchFormError(state).errorMessage;

export const getSavedSearchError = state => state.savedSearch;
export const hasSavedSearchError = state => getSavedSearchError(state).hasError;
export const getSavedSearchErrorMessage = state => getSavedSearchError(state).errorMessage;

export const getSaveSearchError = state => state.saveSearch;
export const hasSaveSearchError = state => getSaveSearchError(state).hasError;
export const getSaveSearchErrorMessage = state => getSaveSearchError(state).errorMessage;

export const getReportSuitesError = state => state.reportSuites;
export const hasReportSuitesError = state => getReportSuitesError(state).hasError;
export const getReportSuitesErrorMessage = state => getReportSuitesError(state).errorMessage;

export const getDataSourcesError = state => state.dataSources;
export const hasDataSourcesError = state => getDataSourcesError(state).hasError;
export const getDataSourcesErrorMessage = state => getDataSourcesError(state).errorMessage;

export const hasError = state =>
    hasSearchFormError(state) ||
    hasSavedSearchError(state) ||
    hasSaveSearchError(state) ||
    hasReportSuitesError(state) ||
    hasDataSourcesError(state);
