/**
 * All column keys
 */
export const columnKeys = {
    keyValuePairs: 'keyValuePairs',
    keyName: 'keyName',
    valueName: 'valueName',
    signalType: 'signalType',
    signalSource: 'signalSource',
    totalCount: 'totalCount',
    percentageChange: 'percentageChange',
    includedInTraits: 'includedInTraits',
};

/**
 * Individual columns
 */
const keyValuePairs = {
    title: 'Key-Value Pair',
    key: columnKeys.keyValuePairs,
    minWidth: 150,
    sortable: true,
};
const keyName = {
    title: 'Key Name',
    key: columnKeys.keyName,
    width: 150,
    sortable: true,
};
const valueName = {
    title: 'Value Name',
    key: columnKeys.valueName,
    width: 150,
    sortable: true,
};
const signalType = {
    title: 'Signal Type',
    key: columnKeys.signalType,
    width: 140,
    sortable: true,
};
const signalSource = {
    title: 'Signal Source',
    key: columnKeys.signalSource,
    width: 180,
    sortable: true,
};
/**
 * The "Total Counts", "Total Event Fires", and "Total Records" column will
 * all use the `totalCount` (no 's') column key. They're all used to display the
 * `totalCount` property of a signal, but we use different labels depending on
 * the selected signal type filter.
 *
 * All - "Total Counts"
 * Adobe Analytics - "Total Event Fires"
 * Actionable Log Files - "Total Event Fires"
 * General Online Data - "Total Event Fires"
 * Onboarded Records - "Total Records"
 */
const totalCounts = {
    title: 'Total Counts',
    key: columnKeys.totalCount,
    width: 100,
    sortable: true,
};
const totalEventFires = {
    title: 'Total Event Fires',
    key: columnKeys.totalCount,
    width: 100,
    sortable: true,
};
const totalRecords = {
    title: 'Total Records',
    key: columnKeys.totalCount,
    width: 100,
    sortable: true,
};
const percentageChange = {
    title: 'Percentage Change',
    key: columnKeys.percentageChange,
    width: 165,
    sortable: true,
};
const includedInTraits = {
    title: 'Included In Traits',
    key: columnKeys.includedInTraits,
    width: 150,
    sortable: true,
};

/**
 * Column groups by signal type
 */
export const allSignalsColumns = [
    keyValuePairs,
    signalType,
    signalSource,
    totalCounts,
    percentageChange,
    includedInTraits,
];

export const analyticsColumns = [
    keyValuePairs,
    signalType,
    signalSource,
    totalEventFires,
    percentageChange,
    includedInTraits,
];

export const advancedAnalyticsColumns = [
    keyValuePairs,
    keyName,
    valueName,
    totalEventFires,
    percentageChange,
    includedInTraits,
];

export const actionableLogFilesColumns = [
    keyValuePairs,
    signalType,
    totalEventFires,
    percentageChange,
    includedInTraits,
];

export const generalOnlineDataColumns = [...actionableLogFilesColumns];

export const onboardedRecordsColumns = [
    keyValuePairs,
    signalType,
    signalSource,
    totalRecords,
    percentageChange,
    includedInTraits,
];

/**
 * All columns
 */
export const columns = [
    keyValuePairs,
    keyName,
    valueName,
    signalType,
    signalSource,
    totalCounts,
    totalEventFires,
    totalRecords,
    percentageChange,
    includedInTraits,
];
