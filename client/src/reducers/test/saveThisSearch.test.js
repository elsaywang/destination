import { handleActions } from 'redux-actions';
import {
    UPDATE_SAVE_SEARCH_NAME,
    TRACK_SEARCH_RESULT_IN_DASHBOARD,
    SELECT_DEFAULT_SORTING,
    CHANGE_SORTING_ORDER,
    SAVE_THIS_SEARCH_FULFILLED,
    CANCEL_SAVE_SEARCH,
} from '../../actions/saveThisSearch';
import saveThisSearchReducer from '../saveThisSearch';

describe('saveThisSearch reducer', () => {
    const initialState = {
        name: '',
        includeInDashboard: false,
        sortBy: '',
        descending: false,
    };
    it('should return the initial state', () => {
        expect(saveThisSearchReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle UPDATE_SAVE_SEARCH_NAME', () => {
        const action = {
            type: UPDATE_SAVE_SEARCH_NAME,
            payload: 'New Save This Search Name',
        };
        expect(saveThisSearchReducer(initialState, action)).toEqual({
            name: 'New Save This Search Name',
            includeInDashboard: false,
            sortBy: '',
            descending: false,
        });
    });

    it('should handle TRACK_SEARCH_RESULT_IN_DASHBOARD', () => {
        const currentState = {
            name: 'New Save This Search Name',
            includeInDashboard: false,
            sortBy: '',
            descending: false,
        };
        const action = {
            type: TRACK_SEARCH_RESULT_IN_DASHBOARD,
            payload: true,
        };
        expect(saveThisSearchReducer(currentState, action)).toEqual({
            name: 'New Save This Search Name',
            includeInDashboard: true,
            sortBy: '',
            descending: false,
        });
    });
    it('should handle SELECT_DEFAULT_SORTING', () => {
        const currentState = {
            name: 'New Save This Search Name',
            includeInDashboard: true,
            sortBy: '',
            descending: false,
        };
        const action = {
            type: SELECT_DEFAULT_SORTING,
            payload: 'Key-Value Pair',
        };
        expect(saveThisSearchReducer(currentState, action)).toEqual({
            name: 'New Save This Search Name',
            includeInDashboard: true,
            sortBy: 'Key-Value Pair',
            descending: false,
        });
    });

    it('should handle CHANGE_SORTING_ORDER', () => {
        const currentState = {
            name: 'New Save This Search Name',
            includeInDashboard: true,
            sortBy: 'Key-Value Pair',
            descending: false,
        };
        const action = {
            type: CHANGE_SORTING_ORDER,
            payload: true,
        };
        expect(saveThisSearchReducer(currentState, action)).toEqual({
            name: 'New Save This Search Name',
            includeInDashboard: true,
            sortBy: 'Key-Value Pair',
            descending: true,
        });
    });
    //TODO:need to update the action payload once integrated with API
    it('should handle SAVE_THIS_SEARCH_FULFILLED', () => {
        const currentState = {
            name: 'New Save This Search Name',
            includeInDashboard: true,
            sortBy: 'Key-Value Pair',
            descending: true,
        };
        const nextState = {
            name: 'Saved Successfully !',
            includeInDashboard: true,
            sortBy: 'Signal Type',
            descending: false,
        };
        const action = {
            type: SAVE_THIS_SEARCH_FULFILLED,
            payload: nextState,
        };
        expect(saveThisSearchReducer(currentState, action)).toEqual(nextState);
    });

    it('should handle CANCEL_SAVE_SEARCH', () => {
        const currentState = {
            name: 'Test',
            includeInDashboard: false,
            sortBy: '',
            descending: false,
        };
        const action = {
            type: SAVE_THIS_SEARCH_FULFILLED,
            payload: initialState,
        };
        expect(saveThisSearchReducer(currentState, action)).toEqual(initialState);
    });
});
