import { handleActions } from 'redux-actions';
import { GET_DATA_SOURCES_FULFILLED } from '../actions/dataSources';

const initialState = [];

export default handleActions(
    {
        [GET_DATA_SOURCES_FULFILLED]: (state, action) => action.payload,
    },
    initialState,
);

export const getDataSourcesNameId = state =>
    state.map(({ name, dataSourceId }) => ({ name, dataSourceId }));
