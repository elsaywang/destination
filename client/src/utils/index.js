export const isEmpty = prop => prop.length === 0;

export const fetchTraits = sids => fetch(`/api/traits/${sids}`);

export const getTotal = prop => prop.length;
