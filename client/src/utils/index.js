export * from './signalSelection.utils.js';
export const fetchTraits = sids => {
    // fetch(`/api/traits/${sids}`
    return fetch('/api/traits/');
};
