export const categoryTypes = ['REAL-TIME', 'ONBOARDED'];

export const signalTypeOptions = [
    { label: `All Signal Types`, value: 'ALL', category: '' },
    { label: `Adobe Analytics`, value: 'ANALYTICS', category: 'REAL-TIME' },
    { label: `Actionable Log Files`, value: 'ALF', category: 'REAL-TIME' },
    { label: `General Online Data`, value: 'REALTIME', category: 'REAL-TIME' },
    { label: `Onboarded Records`, value: 'ONBOARDED', category: 'ONBOARDED' },
];

export const getSignalTypeLabel = type => {
    const signalTypeOption = signalTypeOptions.find(option => option.value === type);

    return signalTypeOption ? signalTypeOption.label : '';
};
