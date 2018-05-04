const signalTypeOptions = [
    { label: `All`, value: 'ALL' },
    { label: `Adobe Analytics`, value: 'ANALYTICS' },
    { label: `Actionable Log Files`, value: 'ALF' },
    { label: `General Online Data`, value: 'REALTIME' },
    { label: `Onboarded Records`, value: 'ONBOARDED' },
];

export const getSignalTypeOptions = counts => [
    { label: `All (${counts.ALL})`, value: 'ALL' },
    { label: `Adobe Analytics (${counts.ANALYTICS})`, value: 'ANALYTICS' },
    { label: `Actionable Log Files (${counts.ALF})`, value: 'ALF' },
    { label: `General Online Data (${counts.REALTIME})`, value: 'REALTIME' },
    { label: `Onboarded Records (${counts.ONBOARDED})`, value: 'ONBOARDED' },
];

export const getSignalTypeLabel = type => {
    const signalTypeOption = signalTypeOptions.find(option => option.value === type);

    return signalTypeOption ? signalTypeOption.label : '';
};
