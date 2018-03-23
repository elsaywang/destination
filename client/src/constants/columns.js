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
};
const keyName = {
    title: 'Key Name',
    key: columnKeys.keyName,
    width: 150,
};
const valueName = {
    title: 'Value Name',
    key: columnKeys.valueName,
    width: 150,
};
const signalType = {
    title: 'Signal Type',
    key: columnKeys.signalType,
    width: 140,
};
const signalSource = {
    title: 'Signal Source',
    key: columnKeys.signalSource,
    width: 180,
};
const totalCounts = {
    title: 'Total Counts',
    key: columnKeys.totalCounts,
    width: 100,
};
const totalEventFires = {
    title: 'Total Event Fires',
    key: columnKeys.totalEventFires,
    width: 100,
};
const percentageChange = {
    title: 'Percentage Change',
    key: columnKeys.percentageChange,
    width: 165,
};
const includedInTraits = {
    title: 'Included In Traits',
    key: columnKeys.includedInTraits,
    width: 120,
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
