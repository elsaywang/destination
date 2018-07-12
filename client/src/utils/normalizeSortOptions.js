import { sortColumns } from '../constants/columns';

export const normalizeSortBy = ({ sortBy }) =>
    sortColumns.map(col => col.key).includes(sortBy) && { sortBy };

export const normalizeDescending = ({ sortBy, sortDir }) => {
    // By default, the "Key-Value Pairs" column sorts ascending, and the "Total
    // Counts" and "Percentage Change" columns sort descending.
    // Only return a `descending` param for non-default sorts.
    if (sortBy === 'keyValuePairs' && sortDir === -1) {
        return { descending: true };
    } else if (sortBy !== 'keyValuePairs' && sortDir === 1) {
        return { descending: false };
    }

    return {};
};

export const normalizeSortOptions = sortOptions => ({
    ...normalizeSortBy(sortOptions),
    ...normalizeDescending(sortOptions),
});
