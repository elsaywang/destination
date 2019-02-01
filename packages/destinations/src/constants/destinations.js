export const destinationCategories = [
    'All',
    'Adobe Experience Cloud',
    'Integrated Platforms',
    'Custom',
];

//PEOPLE_BASED is the new Destination Type under the Integrated Platform.
export const destinationTypeMap = {
    PUSH: 'URL',
    ADS: 'Cookie',
    S2S: 'Device-Based',
    ANALYTICS: 'Adobe Analytics',
    PEOPLE_BASED: 'People-Based',
};

export const getCategoryByDestinationType = type => {
    switch (type) {
        case 'PUSH':
        case 'ADS':
            return 'Custom';

        case 'S2S':
        case 'PEOPLE_BASED':
            return 'Integrated Platforms';

        case 'ANALYTICS':
            return 'Adobe Experience Cloud';

        default:
            return '';
    }
};
