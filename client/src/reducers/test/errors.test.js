import { handleActions } from 'redux-actions';
import {
    CLEAR_SEARCH,
    CALL_SEARCH_REJECTED,
    TOGGLE_ADVANCED_SEARCH,
} from '../../actions/searchForm';
import { GET_SAVED_SEARCH_REJECTED, SAVE_SEARCH_REJECTED } from '../../actions/savedSearch';
import { GET_REPORT_SUITES_REJECTED } from '../../actions/reportSuites';
import errorsReducer, { handleErrorState } from '../errors.js';

describe('test on `handleErrorState`', () => {
    it('should return error state object with `hasError` is true and `errorMessage`', () => {
        const action = {
            error: true,
            payload: { message: 'there is error in your action' },
        };
        const state = {};
        const expectedErrorObject = {
            hasError: true,
            errorMessage: action.payload.message,
        };
        expect(handleErrorState(state, action)).toEqual(expectedErrorObject);
    });
});

describe('test on errors reducer', () => {
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

    it('should return the initial state', () => {
        expect(errorsReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle CLEAR_SEARCH', () => {
        const action = {
            type: CLEAR_SEARCH,
        };
        expect(errorsReducer({}, action)).toEqual(initialState);
    });

    it('should handle CALL_SEARCH_REJECTED', () => {
        const action = {
            type: CALL_SEARCH_REJECTED,
            payload: { message: 'there is error in call search' },
            error: true,
        };
        const expectedCallSeachError = {
            ...initialState,
            searchForm: {
                hasError: true,
                errorMessage: 'there is error in call search',
            },
        };
        expect(errorsReducer(initialState, action)).toEqual(expectedCallSeachError);
    });

    describe('handling GET_SAVED_SEARCH_REJECTED', () => {
        it('should update the saved search error state when the request failure is not a 404', () => {
            const action = {
                type: GET_SAVED_SEARCH_REJECTED,
                payload: {
                    status: 400,
                    message: 'there is error in get saved search',
                },
                error: true,
            };
            const expectedGetSavedSeachError = {
                ...initialState,
                savedSearch: {
                    hasError: true,
                    errorMessage: 'there is error in get saved search',
                },
            };
            expect(errorsReducer(initialState, action)).toEqual(expectedGetSavedSeachError);
        });

        it('should not update the saved search error state when the request failure is a 404', () => {
            const action = {
                type: GET_SAVED_SEARCH_REJECTED,
                payload: {
                    status: 404,
                    message: 'there is error in get saved search',
                },
                error: true,
            };

            expect(errorsReducer(initialState, action)).toEqual(initialState);
        });
    });

    it('should handle SAVE_SEARCH_REJECTED', () => {
        const action = {
            type: SAVE_SEARCH_REJECTED,
            payload: { message: 'there is error in save search' },
            error: true,
        };
        const expectedSaveSeachError = {
            ...initialState,
            saveSearch: {
                hasError: true,
                errorMessage: 'there is error in save search',
            },
        };
        expect(errorsReducer(initialState, action)).toEqual(expectedSaveSeachError);
    });

    it('should handle GET_REPORT_SUITES_REJECTED', () => {
        const action = {
            type: GET_REPORT_SUITES_REJECTED,
            payload: { message: 'there is error in get report Suite' },
            error: true,
        };
        const expectedGetReportSuiteError = {
            ...initialState,
            reportSuites: {
                hasError: true,
                errorMessage: 'there is error in get report Suite',
            },
        };
        expect(errorsReducer(initialState, action)).toEqual(expectedGetReportSuiteError);
    });

    it('should handle TOGGLE_ADVANCED_SEARCH when payload exists in action and reportSuite state has error', () => {
        const action = {
            type: TOGGLE_ADVANCED_SEARCH,
            payload: [],
        };
        const currentState = {
            ...initialState,
            reportSuites: {
                hasError: true,
                errorMessage: '',
            },
        };
        const expectedToggleAdvancedSearchError = {
            ...currentState,
            reportSuites: {
                hasError: true,
                errorMessage: '',
            },
        };
        expect(errorsReducer(currentState, action)).toEqual(expectedToggleAdvancedSearchError);
    });

    it('should handle TOGGLE_ADVANCED_SEARCH and errorMessage should be empty when no payload in action', () => {
        const action = {
            type: TOGGLE_ADVANCED_SEARCH,
        };
        const expectedToggleAdvancedSearchError = {
            ...initialState,
            reportSuites: {
                hasError: false,
                errorMessage: '',
            },
        };
        expect(errorsReducer(initialState, action)).toEqual(expectedToggleAdvancedSearchError);
    });
});
