import { handleActions } from 'redux-actions';
import { CLEAR_SEARCH } from '../actions/searchForm';
import { SELECT_SIGNALS } from '../actions/selectSignals';

const initialState = {
    selectedRowIndexes: [],
    selectionMessage: '',
    hasWarning: false,
};

export default handleActions(
    {
        [SELECT_SIGNALS]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CLEAR_SEARCH]: () => initialState,
    },
    initialState,
);

export const getSelectedRowIndexes = state => state.selectedRowIndexes;
