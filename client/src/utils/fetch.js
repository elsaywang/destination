import { getCsrfToken } from '../lib/getCsrfToken';

export const getOptionsWithAAMAuth = (options = { headers: {} }) => ({
    ...options,
    headers: {
        'content-type': 'application/json',
        ...options.headers,
        'AAM-CSRF-Token': getCsrfToken(),
        'AAM-Disable-Escaping-HTML': true,
    },
    credentials: 'same-origin',
});

const fetch = (url, options) => window.fetch(url, getOptionsWithAAMAuth(options));

export default fetch;
