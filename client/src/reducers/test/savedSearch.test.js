import { handleActions } from 'redux-actions';
import {
    UPDATE_SAVE_SEARCH_NAME,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    SAVE_SEARCH_FULFILLED,
    CANCEL_SAVE_SEARCH,
} from '../../actions/savedSearch';
import { FETCH_LIMITS_FULFILLED } from '../../actions/limits';
import saveSearchReducer, {
    getLimit,
    getSavedSearchList,
    isSavedSearchLimitReached,
    getNormalizedSavedSearchList,
    getTotalVisibleSavedSearchCount,
    getTrackedInDashboardSavedSearchList,
    getVisibleSavedSearchList,
    getHasMoreSavedSearches,
} from '../savedSearch';
import { savedSearchPresets } from '../../constants/savedSearchPresets';

jest.mock('../../constants/savedSearchPresets', () => ({
    savedSearchPresets: [
        {
            name: 'Top Unused Signals',
            presetId: 'top-unused-signals',
            includeInDashboard: true,
        },
        {
            name: 'New Unused Signals',
            presetId: 'new-unused-signals',
            includeInDashboard: true,
        },
    ],
}));

describe('saveSearch reducer', () => {
    const initialState = {
        list: [],
        limit: 0,
        saveSearch: {
            name: '',
            includeInDashboard: false,
            sortBy: 'totalCount',
            descending: true,
        },
        totalVisibleSavedSearch: 2,
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

    it('should handle FETCH_LIMITS_FULFILLED', () => {
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
            type: FETCH_LIMITS_FULFILLED,
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
            it('should return saved search presets concatenated with `list` property', () => {
                const state = {
                    list: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }],
                };
                expect(getSavedSearchList(state)).toEqual([...savedSearchPresets, ...state.list]);
            });
        });

        describe('isSavedSearchLimitReached', () => {
            it('should be true if presets length plus `list` length is equal to `limit` ', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 5,
                };
                expect(isSavedSearchLimitReached(state)).toBeTruthy();
            });

            it('should be true if presets length plus `list` length is greater than `limit` ', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 4,
                };
                expect(isSavedSearchLimitReached(state)).toBeTruthy();
            });

            it('should be false if presets length plus `list` length is smaller than `limit` ', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 6,
                };
                expect(isSavedSearchLimitReached(state)).toBeFalsy();
            });
        });

        describe('getNormalizedSavedSearchList', () => {
            it('should return saved search presets concatenated with original SavedSearchList if limit is not exceeded', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 5,
                };
                expect(getNormalizedSavedSearchList(state)).toEqual([
                    ...savedSearchPresets,
                    ...state.list,
                ]);
            });

            it('should return saved search presets concanenated with original SavedSearchList, truncated, if limit is exceeded', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1' },
                        { name: 'test2', kvp: 'ewr-key2' },
                        { name: 'test3', kvp: 'ewr-ke3' },
                    ],
                    limit: 3,
                };
                const expectedSavedSearchList = [
                    ...savedSearchPresets,
                    { name: 'test1', kvp: 'ewr-key1' },
                ];
                expect(getNormalizedSavedSearchList(state)).toEqual(expectedSavedSearchList);
            });
        });

        describe('getTotalVisibleSavedSearchCount', () => {
            it('should return total count visible saved search', () => {
                const state = {
                    totalVisibleSavedSearch: 2,
                };
                expect(getTotalVisibleSavedSearchCount(state)).toEqual(
                    state.totalVisibleSavedSearch,
                );
            });
        });

        describe('getTrackedInDashboardSavedSearchList', () => {
            it('should return empty list if every `includeInDashboard` is falsy', () => {
                const state = {
                    list: [
                        { name: 'test1', kvp: 'ewr-key1', includeInDashboard: false },
                        { name: 'test2', kvp: 'ewr-key2', includeInDashboard: false },
                        { name: 'test3', kvp: 'ewr-key3', includeInDashboard: false },
                    ],
                };
                expect(getTrackedInDashboardSavedSearchList(state)).toEqual(savedSearchPresets);
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
                expect(getTrackedInDashboardSavedSearchList(state)).toEqual([
                    ...savedSearchPresets,
                    ...expectedList,
                ]);
            });
        });

        describe('getVisibleSavedSearchList', () => {
            it('should return the tracked in dashboard saved search list with same length as totalVisibleSavedSearch', () => {
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
                    totalVisibleSavedSearch: 3,
                };
                const expectedList = [
                    ...savedSearchPresets,
                    { name: 'test1', kvp: 'ewr-key1', includeInDashboard: true },
                ];
                expect(getVisibleSavedSearchList(state)).toEqual(expectedList);
            });
        });

        describe('getHasMoreSavedSearches', () => {
            describe('when the count of visible saved searches is less than the count of total saved searches tracked in the dashboard', () => {
                const state = {
                    list: [{ name: 'test1', kvp: 'ewr-key1', includeInDashboard: true }],
                    totalVisibleSavedSearch: 2,
                };

                it('should return true', () => {
                    expect(getHasMoreSavedSearches(state)).toEqual(true);
                });
            });

            describe('when the count of visible saved searches is equal to the count of total saved searches tracked in the dashboard', () => {
                const state = {
                    list: [{ name: 'test1', kvp: 'ewr-key1', includeInDashboard: false }],
                    totalVisibleSavedSearch: 2,
                };

                it('should return false', () => {
                    expect(getHasMoreSavedSearches(state)).toEqual(false);
                });
            });

            describe('when the count of visible saved searches is greater than than the count of total saved searches tracked in the dashboard, should never happen', () => {
                const state = {
                    list: [{ name: 'test1', kvp: 'ewr-key1', includeInDashboard: false }],
                    totalVisibleSavedSearch: 3,
                };

                it('should return false', () => {
                    expect(getHasMoreSavedSearches(state)).toEqual(false);
                });
            });
        });
    });
});
