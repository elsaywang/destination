export const integratedPlatformsOptions = [
    { label: `ALL PLATFORMS`, value: `Integrated Platforms`, serverTypes: ['S2S'] },
    { label: `PEOPLE-BASED`, value: `People-Based`, serverTypes: [] },
    { label: `DEVICE-BASED`, value: `Device-Based`, serverTypes: ['S2S'] },
];

export const getIntegratedPlatformsOptionsTypeLabel = type => {
    const integratedPlatformOption = integratedPlatformsOptions.find(
        ({ label, value }) => value === type,
    );
    return integratedPlatformOption ? integratedPlatformOption.label : '';
};
