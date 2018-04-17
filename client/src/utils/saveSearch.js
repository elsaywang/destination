import { allSignalsColumns } from '../constants/columns';

export const saveThisSearch = 'Save This Search';
export const checkBoxLabel = 'Track this search result in dashboard';
export const defaultSorting = 'Default Sorting';
export const textFieldLabelName = 'Name';
export const textFieldPlaceHolder = 'Enter a name for this saved search';

export const sortingOptions = allSignalsColumns.map(({ title, key }) => ({
    label: title,
    value: key,
}));

export const radioGroupOptions = [
    { label: 'Descending', value: 'descending' },
    { label: 'Ascending', value: 'ascending' },
];
