export const routes = [
    { route: '/', name: '', types: [] },
    { route: '/destinations', name: 'All', types: [] },
    {
        route: '/destinations/adobeExperienceCloud',
        name: 'Adobe Experience Cloud',
        types: ['ANALYTICS'],
    },
    { route: '/destinations/integratedPlatforms', name: 'Integrated Platforms', types: ['S2S'] },
    { route: '/destinations/custom', name: 'Custom', types: ['PUSH', 'ADS'] },
];
