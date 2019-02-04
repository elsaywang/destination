export const routes = [
    { route: '/destinations/all', name: 'All', types: [] },
    {
        route: '/destinations/adobeExperienceCloud',
        name: 'Adobe Experience Cloud',
        types: ['ANALYTICS'],
    },
    { route: '/destinations/integratedPlatforms', name: 'Integrated Platforms', types: ['S2S'] },
    { route: '/destinations/custom', name: 'Custom', types: ['PUSH', 'ADS'] },
];
