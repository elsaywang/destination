/**
 * Individual columns
 */
const keyValuePair = {
    title: 'Key-Value Pair',
    key: 'keyValuePair',
    minWidth: 150,
};
const keyName = {
    title: 'Key Name',
    key: 'keyName',
    width: 150,
};
const valueName = {
    title: 'Value Name',
    key: 'valueName',
    width: 150,
};
const signalType = {
    title: 'Signal Type',
    key: 'signalType',
    width: 140,
};
const signalSource = {
    title: 'Signal Source',
    key: 'signalSource',
    width: 180,
};
const totalCounts = {
    title: 'Total Counts',
    key: 'totalCounts',
    width: 100,
};
const totalEventFires = {
    title: 'Total Event Fires',
    key: 'totalEventFires',
    width: 100,
};
const percentageChange = {
    title: 'Percentage Change',
    key: 'percentageChange',
    width: 120,
};
const includedInTraits = {
    title: 'Included In Traits',
    key: 'includedInTraits',
    width: 120,
};

/**
 * Column groups by signal type
 */
export const allSignalsColumns = [
    keyValuePair,
    signalType,
    signalSource,
    totalCounts,
    percentageChange,
    includedInTraits,
];

// These are the same for now
export const analyticsColumns = [...allSignalsColumns];

export const advancedAnalyticsColumns = [
    keyValuePair,
    keyName,
    valueName,
    totalEventFires,
    percentageChange,
    includedInTraits,
];

export const actionableLogFilesColumns = [
    keyValuePair,
    signalType,
    totalCounts,
    percentageChange,
    includedInTraits,
];

// These are the same for now
export const generalOnlineDataColumns = [...actionableLogFilesColumns];

// These are the same for now
export const onboardedRecordsColumns = [...allSignalsColumns];
