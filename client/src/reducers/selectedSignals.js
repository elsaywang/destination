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
