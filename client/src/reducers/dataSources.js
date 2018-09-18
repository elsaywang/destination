import { handleActions } from 'redux-actions';
import { FETCH_DATA_SOURCES_FULFILLED } from '../actions/dataSources';

const initialState = [];

export default handleActions(
    {
        [FETCH_DATA_SOURCES_FULFILLED]: (state, action) => action.payload,
    },
    initialState,
);

export const getDataSources = state =>
    state.map(({ name, dataSourceId }) => ({ name, dataSourceId }));
