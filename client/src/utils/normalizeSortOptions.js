import { sortColumns } from '../constants/columns';

export const normalizeSortBy = ({ sortBy }) =>
    sortColumns.map(col => col.key).includes(sortBy) && { sortBy };

// If no `descending` param is passed, then the `/signal/list` API returns
// results sorted in descending order, regardless of the `sortBy` param.
// Explicitly set `descending` to `false` if and only if `sortDir` is 1.
export const normalizeDescending = ({ sortDir }) => sortDir === 1 && { descending: false };

export const normalizeSortOptions = sortOptions => ({
    ...normalizeSortBy(sortOptions),
    ...normalizeDescending(sortOptions),
});
