import fetch from '../utils/fetch';
import { normalizeSearch } from '../utils/normalizeSearch';
import { pageSize as defaultPageSize } from '../constants/paginationOptions';

export const fetchSignals = ({
    search,
    sortOptions = {},
    pagination: { page = 0, pageSize = defaultPageSize } = {},
}) => {
    const body = JSON.stringify({
        ...normalizeSearch(search),
        ...sortOptions,
        page,
        pageSize,
    });
    const options = {
        body,
        cache: 'no-cache',
        method: 'POST',
    };

    return fetch('/portal/api/v1/signals/list', options); //.then(err => console.error(err));
};
