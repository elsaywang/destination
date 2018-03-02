const columns = {
    keyValuePair: {
        title: 'Key-Value Pair',
        key: 'keyValuePair',
        minWidth: 150,
    },
    keyName: {
        title: 'Key Name',
        key: 'keyName',
        width: 150,
    },
    valueName: {
        title: 'Value Name',
        key: 'valueName',
        width: 150,
    },
    signalType: {
        title: 'Signal Type',
        key: 'signalType',
        width: 140,
    },
    signalSource: {
        title: 'Signal Source',
        key: 'signalSource',
        width: 180,
    },
    totalCounts: {
        title: 'Total Counts',
        key: 'totalCounts',
        width: 100,
    },
    totalEventFires: {
        title: 'Total Event Fires',
        key: 'totalEventFires',
        width: 100,
    },
    percentageChange: {
        title: 'Percentage Change',
        key: 'percentageChange',
        width: 120,
    },
    includedInTraits: {
        title: 'Included In Traits',
        key: 'includedInTraits',
        width: 120,
    },
};

// TODO: Actionable Log Files and General Online Data don't show Signal Source
export const basicColumns = [
    columns.keyValuePair,
    columns.signalType,
    columns.signalSource,
    columns.totalCounts,
    columns.percentageChange,
    columns.includedInTraits,
];

export const analyticsColumns = [
    columns.keyValuePair,
    columns.keyName,
    columns.valueName,
    columns.totalEventFires,
    columns.percentageChange,
    columns.includedInTraits,
];
