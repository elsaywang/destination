import { handleActions } from 'redux-actions';
import {
    UPDATE_SAVE_SEARCH_NAME,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    SAVE_SEARCH_FULFILLED,
    CANCEL_SAVE_SEARCH,
    GET_SAVED_SEARCH_LIMIT_FULFILLED,
} from '../../actions/savedSearch';
import saveSearchReducer, {
    getLimit,
    getSavedSearchList,
    isSavedSearchLimitReached,
    getNormalizedSavedSearchList,
    getTotalVisible,
    getSavedSearchListTrackedInDashboard,
    getVisibleSavedSearchList,
} from '../savedSearch';

describe('saveSearch reducer', () => {
    const initialState = {
        list: [],
        limit: 0,
        saveSearch: {
            name: '',
            includeInDashboard: false,
            sortBy: 'percentageChange',
            descending: false,
        },
        totalVisibleInDashboard: 2,
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

    it('should handle GET_SAVED_SEARCH_LIMIT_FULFILLED', () => {
        const currentState = {
            ...initialState,
            limit: 5,
        };
        const payload = { maxSignalRetentionDays: 180, maxSignalSavedSearches: 10 };
        const nextState = {
            ...initialState,
            limit: 10,
        };
        const action = {
            type: GET_SAVED_SEARCH_LIMIT_FULFILLED,
            payload,
        };
        expect(saveSearchReducer(currentState, action)).toEqual(nextState);
    });

    describe('test on selectors', () => {
        describe('getLimit', () => {
            it('should return `limit` property', () => {
                const state = { limit: 5 };
                expect(getLimit(state)).toEqual(5);
            });
        });

        describe('getSavedSearchList', () => {
            it('should return `list` property', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                };
                expect(getSavedSearchList(state)).toEqual(state.list);
            });
        });

        describe('isSavedSearchLimitReached', () => {
            it('should be true if `list` length is equal to `limit` ', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 3,
                };
                expect(isSavedSearchLimitReached(state)).toBeTruthy();
            });

            it('should be true if `list` length is greater than `limit` ', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 2,
                };
                expect(isSavedSearchLimitReached(state)).toBeTruthy();
            });

            it('should be false if `list` length is smaller than `limit` ', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 5,
                };
                expect(isSavedSearchLimitReached(state)).toBeFalsy();
            });
        });

        describe('getNormalizedSavedSearchList', () => {
            it('should return original SavedSearchList if limit is not reached', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 5,
                };
                expect(getNormalizedSavedSearchList(state)).toEqual(state.list);
            });

            it('should return truncated SavedSearchList if limit is reached', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 2,
                };
                const expectedSavedSearchList = [
                    { name: 'test1', kvp: 'ewr-key1' },
                    { name: 'test2', kvp: 'ewr-key2' },
                ];
                expect(getNormalizedSavedSearchList(state)).toEqual(expectedSavedSearchList);
            });
        });

        describe('getTotalVisible', () => {
            it('should return total count visible saved search', () => {
                const state = {
                    totalVisibleInDashboard: 2,
                };
                expect(getTotalVisible(state)).toEqual(state.totalVisibleInDashboard);
            });
        });

        describe('getSavedSearchListTrackedInDashboard', () => {
            it('should return empty list if every `includeInDashboard` is falsy', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1', includeInDashboard: false },
                        { name: 'test2', kvp: 'ewr-key2', includeInDashboard: false },
                        { name: 'test3', kvp: 'ewr-key3', includeInDashboard: false },
                    ],
                };
                expect(getSavedSearchListTrackedInDashboard(state)).toEqual([]);
            });
            it('should return the saved search list with all `includeInDashboard` is truthy', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1', includeInDashboard: true },
                        { name: 'test2', kvp: 'ewr-key2', includeInDashboard: false },
                        { name: 'test3', kvp: 'ewr-key3', includeInDashboard: false },
                        { name: 'test4', kvp: 'ewr-key4', includeInDashboard: false },
                        { name: 'test5', kvp: 'ewr-key5', includeInDashboard: true },
                    ],
                };
                const expectedList = [
                    { name: 'test1', kvp: 'ewr-key1', includeInDashboard: true },
                    { name: 'test5', kvp: 'ewr-key5', includeInDashboard: true },
                ];
                expect(getSavedSearchListTrackedInDashboard(state)).toEqual(expectedList);
            });
        });

        describe('getVisibleSavedSearchList', () => {
            it('should return the tracked in dashboard saved search list with same length as totalVisibleInDashboard', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1', includeInDashboard: true },
                        { name: 'test2', kvp: 'ewr-key2', includeInDashboard: false },
                        { name: 'test3', kvp: 'ewr-ke3', includeInDashboard: false },
                        { name: 'test4', kvp: 'ewr-ke4', includeInDashboard: true },
                        { name: 'test5', kvp: 'ewr-key5', includeInDashboard: true },
                        { name: 'test6', kvp: 'ewr-key6', includeInDashboard: true },
                        { name: 'test7', kvp: 'ewr-key6', includeInDashboard: false },
                    ],
                    totalVisibleInDashboard: 2,
                };
                const expectedList = [
                    { name: 'test1', kvp: 'ewr-key1', includeInDashboard: true },
                    { name: 'test4', kvp: 'ewr-ke4', includeInDashboard: true },
                ];
                expect(getVisibleSavedSearchList(state)).toEqual(expectedList);
            });
        });
    });
});
