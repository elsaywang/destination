import { handleActions } from 'redux-actions';
import { CALL_SEARCH_PENDING, CLEAR_SEARCH, LOAD_MORE_PENDING } from '../actions/searchForm';
import { SELECT_SIGNALS } from '../actions/selectSignals';
import { defaultMaxSignalSelections } from '../constants/limitConstants';

const initialState = {
    selectedRowIndexes: [],
    selectionMessage: '',
    hasSignalSelectionsTypeWarning: false,
    maxSignalSelections: defaultMaxSignalSelections,
};

export default handleActions(
    {
        [SELECT_SIGNALS]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CLEAR_SEARCH]: () => initialState,
        [CALL_SEARCH_PENDING]: () => initialState,
        [LOAD_MORE_PENDING]: () => initialState,
    },
    initialState,
);

export const getSelectedRowIndexes = state => state.selectedRowIndexes;
export const getMaxSignalSelections = state => state.maxSignalSelections;
export const isMaxSignalSelectionsReached = state =>
    Boolean(getSelectedRowIndexes(state).length > getMaxSignalSelections(state));
export const finalizedSelectedRowIndexes = state =>
    isMaxSignalSelectionsReached(state)
        ? [...getSelectedRowIndexes(state)].slice(0, getMaxSignalSelections(state))
        : getSelectedRowIndexes(state);
export const finalizedSelectedSignals = state => ({
    ...state,
    selectedRowIndexes: finalizedSelectedRowIndexes(state),
});
export const hasSignalSelectionsTypeWarning = state => state.hasSignalSelectionsTypeWarning;
