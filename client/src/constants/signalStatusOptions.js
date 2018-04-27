const signalStatusOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Unused Signals', value: 'UNUSED' },
    { label: 'Signals Included in Traits', value: 'USED' },
];

export const getSignalStatusLabel = status => signalStatusOptions.find(option => option.value === status).label;

export default signalStatusOptions;
