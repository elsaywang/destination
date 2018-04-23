const getSignalTypeOptions = counts => [
    { label: `All (${counts.ALL})`, value: 'ALL' },
    { label: `Adobe Analytics (${counts.ANALYTICS})`, value: 'ANALYTICS' },
    { label: `Actionable Log Files (${counts.ALF})`, value: 'ALF' },
    { label: `General Online Data (${counts.REALTIME})`, value: 'REALTIME' },
    { label: `Onboarded Records (${counts.ONBOARDED})`, value: 'ONBOARDED' },
];

export default getSignalTypeOptions;
