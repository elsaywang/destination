/**
 * All column keys
 */
export const columnKeys = {
    keyValuePairs: 'keyValuePairs',
    keyName: 'keyName',
    valueName: 'valueName',
    signalType: 'signalType',
    signalSource: 'signalSource',
    totalCounts: 'totalCounts',
    totalEventFires: 'totalEventFires',
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
const totalCounts = {
    title: 'Total Counts',
    key: columnKeys.totalCounts,
    width: 100,
    sortable: true,
};
const totalEventFires = {
    title: 'Total Event Fires',
    key: columnKeys.totalEventFires,
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

// These are the same for now
export const analyticsColumns = [...allSignalsColumns];

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
    totalCounts,
    percentageChange,
    includedInTraits,
];

// These are the same for now
export const generalOnlineDataColumns = [...actionableLogFilesColumns];

// These are the same for now
export const onboardedRecordsColumns = [...allSignalsColumns];
