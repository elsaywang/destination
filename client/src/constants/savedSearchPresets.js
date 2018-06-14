export const topUnusedSignals = {
    advanced: false,
    descending: false,
    presetId: 'top-unused-signals',
    includeInDashboard: true,
    keyValuePairs: [{ id: 0, key: '', operator: '==', value: '' }],
    minEventFires: 1000,
    name: 'Top Unused Signals',
    signalStatus: 'ALL',
    sortBy: 'percentageChange',
    source: {
        dataSourceIds: [],
        name: '',
        reportSuiteIds: [],
        sourceType: null,
    },
    viewRecordsFor: '7D',
};

export const newUnusedSignals = {
    ...topUnusedSignals,
    name: 'New Unused Signals',
    presetId: 'new-unused-signals',
    filterNewSignals: true,
};

export const savedSearchPresets = [topUnusedSignals, newUnusedSignals];
