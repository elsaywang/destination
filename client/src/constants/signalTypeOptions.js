export const signalTypeOptions = [
    { label: `All Signal Types`, value: 'ALL' },
    { label: `Adobe Analytics`, value: 'ANALYTICS' },
    { label: `Actionable Log Files`, value: 'ALF' },
    { label: `General Online Data`, value: 'REALTIME' },
    { label: `Onboarded Records`, value: 'ONBOARDED' },
];

export const getSignalTypeLabel = type => {
    const signalTypeOption = signalTypeOptions.find(option => option.value === type);

    return signalTypeOption ? signalTypeOption.label : '';
};
