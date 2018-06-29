import fetch from './fetch';

export const fetchTrait = sid => fetch(`/portal/api/v1/traits/${sid}`);
