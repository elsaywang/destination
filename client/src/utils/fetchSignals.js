import fetch from '../utils/fetch';
import { normalizeSearch } from '../utils/normalizeSearch';
import { normalizeSortOptions } from '../utils/normalizeSortOptions';
import { pageSize as defaultPageSize } from '../constants/paginationOptions';

export const fetchSignals = ({
    search,
    sortOptions = {},
    pagination: { page = 0, pageSize = defaultPageSize } = {},
}) => {
    const normalizedSearch = normalizeSearch(search);
    const body = JSON.stringify({
        ...normalizeSearch(search),
        ...normalizeSortOptions(sortOptions),
        page,
        pageSize,
    });
    const options = {
        body,
        cache: 'no-cache',
        method: 'POST',
    };

    return fetch('/portal/api/v1/signals/list', options);
};
