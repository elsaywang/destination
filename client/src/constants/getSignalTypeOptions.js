const getSignalTypeOptions = counts => [
    { label: `All (${counts.all})`, value: 'all' },
    { label: `Adobe Analytics (${counts.adobeAnalytics})`, value: 'adobeAnalytics' },
    { label: `Actionable Log Files (${counts.actionableLogFiles})`, value: 'actionableLogFiles' },
    { label: `General Online Data (${counts.generalOnlineData})`, value: 'generalOnlineData' },
    { label: `Onboarded Records (${counts.onboardedRecords})`, value: 'onboardedRecords' },
];

export default getSignalTypeOptions;
