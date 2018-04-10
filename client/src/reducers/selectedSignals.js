import { handleActions } from 'redux-actions';
import { SELECT_SIGNALS } from '../actions/selectSignals';

const initialState = { records: [], selectionMessage: '', hasWarning: false };

export default handleActions(
    {
        [SELECT_SIGNALS]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    initialState,
);

export const getRecords = state => state.records;
export const getSelectedSignalsDataType = state => {
    if (!getRecords(state).length) {
        return null;
    }

    return state.records.every(signal => signal.dataType === 'ONBOARDED')
        ? 'ONBOARDED'
        : 'REALTIME';
};
