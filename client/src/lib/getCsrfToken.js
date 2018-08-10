export const getCsrfToken = () => document.querySelector('meta[name="_tk"]').content;
