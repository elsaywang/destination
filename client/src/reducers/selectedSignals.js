import { handleActions } from 'redux-actions';
import { CLEAR_SEARCH } from '../actions/searchForm';
import { SELECT_SIGNALS } from '../actions/selectSignals';
import { defaultMaxSignalSelections } from '../constants/limitConstants';

const initialState = {
    selectedRowIndexes: [],
    selectionMessage: '',
    hasTraitsCreationDisabledWarning: false,
    maxSignalSelections: defaultMaxSignalSelections,
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
export const getMaxSignalSelections = state => state.maxSignalSelections;
export const isMaxSignalSelectionsReached = state =>
    Boolean(getSelectedRowIndexes(state).length >= getMaxSignalSelections(state));
export const finalizedSelectedRowIndexes = state =>
    isMaxSignalSelectionsReached(state)
        ? [...getSelectedRowIndexes(state)].slice(0, getMaxSignalSelections(state))
        : getSelectedRowIndexes(state);
export const finalizedSelectedSignals = state => ({
    ...state,
    selectedRowIndexes: finalizedSelectedRowIndexes(state),
});
export const hasTraitsCreationDisabledWarning = state => state.hasTraitsCreationDisabledWarning;
