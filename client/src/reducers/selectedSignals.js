import { handleActions } from 'redux-actions';
import { SELECT_SIGNALS } from '../actions';

const initialState = { records: [], selectionMessage: '', warning: false };

export default handleActions(
    {
        [SELECT_SIGNALS]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    initialState,
);
