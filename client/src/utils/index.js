// TODO: export this and use it in SignalsTable
export const isNumeric = val => Number(parseFloat(val)) === val;

export const fetchTraits = sids => {
    // fetch(`/api/traits/${sids}`
    return fetch('/api/traits/');
};
