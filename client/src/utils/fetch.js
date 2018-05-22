import { getCsrfToken } from '../lib/getCsrfToken';

export const getOptionsWithAAMAuth = (options = { headers: {} }) => ({
    ...options,
    headers: {
        'content-type': 'application/json',
        ...options.headers,
        'AAM-CSRF-Token': getCsrfToken(),
    },
    credentials: 'same-origin',
});

export default function(url, options) {
    return fetch(url, getOptionsWithAAMAuth(options));
}
