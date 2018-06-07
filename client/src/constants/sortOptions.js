import { sortColumns } from './columns';

export const ascending = 'ascending';
export const descending = 'descending';

export const sortingOptions = sortColumns.map(({ title, key }) => ({
    label: title,
    value: key,
}));

export const radioGroupOptions = [
    { label: 'Descending', value: descending },
    { label: 'Ascending', value: ascending },
];

export const getSortLabel = sortBy => {
    const sortingOption = sortingOptions.find(option => option.value === sortBy);

    return sortingOption ? sortingOption.label : '';
};
