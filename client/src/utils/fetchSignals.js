import fetch from '../utils/fetch';
import { normalizeSearch } from '../utils/normalizeSearch';

export const fetchSignals = ({ search, pagination: { page = 0, pageSize = 20 } = {} }) => {
    const normalizedSearch = normalizeSearch(search);
    const body = JSON.stringify({
        ...normalizedSearch,
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
