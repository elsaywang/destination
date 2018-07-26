export const topUnusedSignals = {
    advanced: false,
    presetId: 'top-unused-signals',
    includeInDashboard: true,
    keyValuePairs: [{ id: 0, key: '', operator: '==', value: '' }],
    minEventFires: 1000,
    filterNewSignals: false,
    name: 'Top Unused Signals',
    signalStatus: 'UNUSED',
    source: {
        dataSourceIds: [],
        name: '',
        reportSuiteIds: [],
        sourceType: 'ALL',
    },
    viewRecordsFor: '7D',
    sortBy: 'totalCount',
};

export const newUnusedSignals = {
    ...topUnusedSignals,
    name: 'New Unused Signals',
    presetId: 'new-unused-signals',
    filterNewSignals: true,
};

export const savedSearchPresets = [topUnusedSignals, newUnusedSignals];
