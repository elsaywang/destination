import { handleActions } from 'redux-actions';
import { FETCH_USER_ROLES_FULFILLED } from '../actions/permissions';
import getPermissions from '../utils/permissionCheck';

const initialState = {};

const permissions = handleActions(
    {
        [FETCH_USER_ROLES_FULFILLED]: (state, action) => getPermissions(action.payload.userRoles),
    },
    initialState,
);

export default permissions;
