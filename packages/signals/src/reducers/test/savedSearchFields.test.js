import { handleActions } from 'redux-actions';
import { POPULATE_SEARCH_FIELDS, CLEAR_SEARCH_FIELDS } from '../../actions/savedSearchFields';
import savedSearchFieldsReucer from '../savedSearchFields';

describe('searchField reducer', () => {
    const initialState = {
        name: '',
    };
    it('should return the initial state', () => {
        expect(savedSearchFieldsReucer(initialState, {})).toEqual(initialState);
    });

    it('should handle POPULATE_SEARCH_FIELDS', () => {
        const action = {
            type: POPULATE_SEARCH_FIELDS,
            payload: {
                name: 'Irwin Jones',
                keyValuePairs: [
                    {
                        key: 'k-white',
                        operator: '>',
                        value: 7655,
                        id: 0,
                    },
                    {
                        key: 'k-Yuan Renminbi',
                        operator: '<',
                        value: 41663,
                        id: 1,
                    },
                ],
                source: {
                    dataSourceIds: 28018,
                    reportSuiteIds: null,
                    sourceType: 'REALTIME',
                    categoryType: 'Real-Time',
                },
                minEventFires: 37211,
                signalStatus: 'USED',
                startDate: '2018-04-27T03:51:24.565Z',
                endDate: '2018-04-26T17:36:47.082Z',
                sortBy: 'Key Value Pairs',
            },
        };
        expect(savedSearchFieldsReucer(initialState, action)).toEqual(action.payload);
    });

    it('should handle CLEAR_SEARCH_FIELDS', () => {
        const action = {
            type: CLEAR_SEARCH_FIELDS,
            payload: {},
        };
        expect(savedSearchFieldsReucer(initialState, action)).toEqual(initialState);
    });
});
