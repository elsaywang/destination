/**
 * All column keys
 */
export const columnKeys = {
    keyValuePairs: 'keyValuePairs',
    keyName: 'keyName',
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
    width: 200,
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

const reportSuite = {
    title: 'Report Suite',
    key: columnKeys.signalSource,
    width: 180,
};

const onboardedRecord = {
    title: 'Onboarded Record',
    key: columnKeys.signalSource,
    width: 180,
};
/**
 * The "Total Counts", "Event Fires", and "Total Records" column will
 * all use the `totalCount` (no 's') column key. They're all used to display the
 * `totalCount` property of a signal, but we use different labels depending on
 * the selected signal type filter.
 *
 * All - "Total Counts"
 * Adobe Analytics - "Event Fires"
 * Actionable Log Files - "Event Fires"
 * General Online Data - "Event Fires"
 * Onboarded Records - "Total Records"
 */
const totalCounts = {
    title: 'Total Counts',
    key: columnKeys.totalCount,
    width: 88,
    sortable: true,
};
const eventFires = {
    title: 'Event Fires',
    key: columnKeys.totalCount,
    width: 88,
    sortable: true,
};
const totalRecords = {
    title: 'Total Records',
    key: columnKeys.totalCount,
    width: 88,
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
    width: 155,
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
    reportSuite,
    eventFires,
    percentageChange,
    includedInTraits,
];

export const advancedAnalyticsColumns = [
    keyValuePairs,
    keyName,
    eventFires,
    percentageChange,
    includedInTraits,
];

export const actionableLogFilesColumns = [
    keyValuePairs,
    signalType,
    eventFires,
    percentageChange,
    includedInTraits,
];

export const generalOnlineDataColumns = [...actionableLogFilesColumns];

export const onboardedRecordsColumns = [
    keyValuePairs,
    signalType,
    onboardedRecord,
    totalRecords,
    percentageChange,
    includedInTraits,
];

export const sortColumns = [
    totalCounts,
    percentageChange,
    {
        ...keyValuePairs,
        title: 'Key Name',
    },
];

/**
 * All columns
 */
export const columns = [
    keyValuePairs,
    keyName,
    signalType,
    signalSource,
    reportSuite,
    onboardedRecord,
    totalCounts,
    eventFires,
    totalRecords,
    percentageChange,
    includedInTraits,
];
