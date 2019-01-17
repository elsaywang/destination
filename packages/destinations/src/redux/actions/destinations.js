import { generateItems } from '../../constants/tableData';
import { createAsyncAction } from '../../utils/createAsyncAction';
import { createAction } from 'redux-actions';

const FETCH_DESTINATIONS = 'FETCH_DESTINATIONS';
export const FETCH_DESTINATIONS_PENDING = 'FETCH_DESTINATIONS_PENDING';
export const FETCH_DESTINATIONS_FULFILLED = 'FETCH_DESTINATIONS_FULFILLED';
export const FETCH_DESTINATIONS_REJECTED = 'FETCH_DESTINATIONS_REJECTED';

export const fetchDestinations = createAsyncAction(FETCH_DESTINATIONS, () => {
    return new Promise(resolve =>
        // FIXME: mocking this for nowm
        resolve({
            ok: true,
            json: () => {
                return new Promise(res => res(generateItems()));
            },
        }),
    );
});

export const UPDATE_INTEGRATED_PLATFORM_TYPE = 'UPDATE_INTEGRATED_PLATFORM_TYPE';
export const updateIntegratedPlatformType = createAction(UPDATE_INTEGRATED_PLATFORM_TYPE);
