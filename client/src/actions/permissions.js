import { createAsyncAction } from '../utils/createAsyncAction';
import fetch from '../utils/fetch';

export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';
export const FETCH_USER_ROLES_FULFILLED = 'FETCH_USER_ROLES_FULFILLED';
export const FETCH_USER_ROLES_REJECTED = 'FETCH_USER_ROLES_REJECTED';
export const fetchUserRoles = createAsyncAction(FETCH_USER_ROLES, () =>
    fetch('/portal/api/v1/users/self?includeAllUserRoles=true'),
);
