import fetch from '../utils/fetch';
import { createAsyncAction } from '../utils/createAsyncAction';

export const FETCH_LIMITS = 'FETCH_LIMITS';
export const FETCH_LIMITS_FULFILLED = 'FETCH_LIMITS_FULFILLED';
export const FETCH_LIMITS_REJECTED = 'FETCH_LIMITS_REJECTED';
export const fetchLimits = createAsyncAction(FETCH_LIMITS, () =>
    fetch('/portal/api/v1/signals/limits'),
);
