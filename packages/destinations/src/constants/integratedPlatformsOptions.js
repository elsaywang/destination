export const integratedPlatformsOptions = [
    { label: `ALL PLATFORMS`, value: `Integrated Platforms` },
    { label: `PEOPLE-BASED`, value: `People-Based` },
    { label: `DEVICE-BASED`, value: `Device-Based` },
];

export const getIntegratedPlatformsOptionsTypeLabel = type => {
    const integratedPlatformOption = integratedPlatformsOptions.find(
        ({ label, value }) => value === type,
    );
    return integratedPlatformOption ? integratedPlatformOption.label : '';
};
