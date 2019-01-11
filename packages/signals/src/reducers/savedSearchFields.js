import { handleActions } from 'redux-actions';
import { POPULATE_SEARCH_FIELDS, CLEAR_SEARCH_FIELDS } from '../actions/savedSearchFields';

const initialState = {
    name: '',
};

export default handleActions(
    {
        [POPULATE_SEARCH_FIELDS]: (state, action) => ({ ...action.payload }),
        [CLEAR_SEARCH_FIELDS]: () => ({ ...initialState }),
    },
    initialState,
);
