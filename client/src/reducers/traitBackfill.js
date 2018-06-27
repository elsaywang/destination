import { handleActions } from 'redux-actions';
import { FETCH_LIMITS_FULFILLED } from '../actions/limits';
import { defaultMaxSignalRetentionDays } from '../constants/limitConstants';

const initialState = {
    maxSignalRetentionDays: defaultMaxSignalRetentionDays,
};

export default handleActions(
    {
        [FETCH_LIMITS_FULFILLED]: (state, action) => ({
            ...state,
            maxSignalRetentionDays: action.payload.maxSignalRetentionDays,
        }),
    },
    initialState,
);

export const getMaxSignalRetentionDays = state => state.maxSignalRetentionDays;
