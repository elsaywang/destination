import { handleActions } from 'redux-actions';
import {
    UPDATE_SAVE_SEARCH_NAME,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    SAVE_SEARCH_FULFILLED,
    CANCEL_SAVE_SEARCH,
} from '../../actions/savedSearch';
import saveSearchReducer from '../savedSearch';

describe('saveSearch reducer', () => {
    const initialState = {
        list: [],
        saveSearch: {
            name: '',
            includeInDashboard: false,
            sortBy: 'percentageChange',
            descending: false,
        },
    };

    it('should return the initial state', () => {
        expect(saveSearchReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle UPDATE_SAVE_SEARCH_NAME', () => {
        const action = {
            type: UPDATE_SAVE_SEARCH_NAME,
            payload: 'New Save This Search Name',
        };

        expect(saveSearchReducer(initialState, action)).toEqual({
            ...initialState,
            saveSearch: {
                ...initialState.saveSearch,
                name: 'New Save This Search Name',
            },
        });
    });

    it('should handle TRACK_SEARCH_RESULT_IN_DASHBOARD', () => {
        const currentState = {
            ...initialState,
            saveSearch: {
                name: 'New Save This Search Name',
                includeInDashboard: false,
                sortBy: 'percentageChange',
                descending: false,
            },
        };
        const action = {
            type: TRACK_SEARCH_RESULT_IN_DASHBOARD,
            payload: true,
        };

        expect(saveSearchReducer(currentState, action)).toEqual({
            ...initialState,
            saveSearch: {
                name: 'New Save This Search Name',
                includeInDashboard: true,
                sortBy: 'percentageChange',
                descending: false,
            },
        });
    });

    it('should handle SELECT_DEFAULT_SORTING', () => {
        const currentState = {
            ...initialState,
            saveSearch: {
                name: 'New Save This Search Name',
                includeInDashboard: true,
                sortBy: 'percentageChange',
                descending: false,
            },
        };
        const action = {
            type: SELECT_DEFAULT_SORTING,
            payload: 'keyValuePairs',
        };

        expect(saveSearchReducer(currentState, action)).toEqual({
            ...initialState,
            saveSearch: {
                name: 'New Save This Search Name',
                includeInDashboard: true,
                sortBy: 'keyValuePairs',
                descending: false,
            },
        });
    });

    it('should handle CHANGE_SORTING_ORDER', () => {
        const currentState = {
            ...initialState,
            saveSearch: {
                name: 'New Save This Search Name',
                includeInDashboard: true,
                sortBy: 'keyValuePairs',
                descending: false,
            },
        };
        const action = {
            type: CHANGE_SORTING_ORDER,
            payload: true,
        };

        expect(saveSearchReducer(currentState, action)).toEqual({
            ...initialState,
            saveSearch: {
                name: 'New Save This Search Name',
                includeInDashboard: true,
                sortBy: 'keyValuePairs',
                descending: true,
            },
        });
    });

    //TODO:need to update the action payload once integrated with API
    it('should handle SAVE_SEARCH_FULFILLED', () => {
        const currentState = {
            ...initialState,
            list: [
                {
                    name: 'Jadyn Heller',
                    id: 0,
                    keyValuePairs: [
                        {
                            key: 'k-Cambridgeshire',
                            operator: 'contains',
                            value: 60948,
                            id: 0,
                        },
                    ],
                    source: {
                        dataSourceIds: 42251,
                        reportSuiteIds: null,
                        sourceType: 'REALTIME',
                        categoryType: 'Real-Time',
                    },
                    minEventFires: 79746,
                    signalStatus: 'USED',
                    startDate: '2018-04-28T18:13:54.899Z',
                    endDate: '2018-04-28T06:13:52.825Z',
                    sortBy: 'totalCount',
                },
                {
                    name: 'Ms. Guy Pagac',
                    id: 1,
                    keyValuePairs: [
                        {
                            key: 'k-virtual',
                            operator: '==',
                            value: 'v-Unbranded',
                            id: 0,
                        },
                    ],
                    source: {
                        dataSourceIds: 65509,
                        reportSuiteIds: null,
                        sourceType: 'REALTIME',
                        categoryType: 'Real-Time',
                    },
                    minEventFires: 86912,
                    signalStatus: 'USED',
                    startDate: '2018-04-28T21:18:33.376Z',
                    endDate: '2018-04-28T17:07:28.540Z',
                    sortBy: 'totalCount',
                },
            ],
        };
        const action = {
            type: SAVE_SEARCH_FULFILLED,
            payload: currentState.list,
        };

        expect(saveSearchReducer(initialState, action)).toEqual(currentState);
    });

    it('should handle CANCEL_SAVE_SEARCH', () => {
        const currentState = {
            ...initialState,
            saveSearch: {
                name: 'Test',
                includeInDashboard: false,
                sortBy: 'percentageChange',
                descending: false,
            },
        };
        const action = {
            type: CANCEL_SAVE_SEARCH,
            payload: initialState,
        };

        expect(saveSearchReducer(currentState, action)).toEqual(initialState);
    });
});
