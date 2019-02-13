export const integratedPlatformsOptions = [
    {
        label: `ALL PLATFORMS`,
        value: `Integrated Platforms`,
        serverTypes: ['S2S', 'PEOPLE_BASED'],
    },
    { label: `PEOPLE-BASED`, value: `People-Based`, serverTypes: ['PEOPLE_BASED'] },
    { label: `DEVICE-BASED`, value: `Device-Based`, serverTypes: ['S2S'] },
];

export const getIntegratedPlatformsOptionsTypeLabel = type => {
    const integratedPlatformOption = integratedPlatformsOptions.find(
        ({ label, value }) => value === type,
    );
    return integratedPlatformOption ? integratedPlatformOption.label : '';
};
