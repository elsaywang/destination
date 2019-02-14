import _ from 'lodash';

export const integratedPlatformsOptions = [
    { label: `ALL PLATFORMS`, value: `Integrated Platforms`, serverTypes: ['S2S', 'PEOPLE_BASED'] },
    {
        label: `PEOPLE-BASED`,
        value: `People-Based`,
        serverTypes: ['PEOPLE_BASED'],
        platformOptions: ['Facebook', 'Google', 'Twitter', 'LinkedIn'],
    },

    { label: `DEVICE-BASED`, value: `Device-Based`, serverTypes: ['S2S'] },
];

export const getIntegratedPlatformsOptionByType = type => {
    const integratedPlatformOption = integratedPlatformsOptions.find(
        ({ label, value }) => value === type,
    );
    return integratedPlatformOption || '';
};

export const getPlatformOptions = type => {
    const { platformOptions } = getIntegratedPlatformsOptionByType(type);
    return platformOptions || [];
};

export const destinationTemplateIDMap = _.keyBy(
    getPlatformOptions('People-Based'),
    option => getPlatformOptions('People-Based').indexOf(option) + 1,
);
// map id may change
// {
//  "1": "Facebook",
//  "2": "Google",
//  "3": "Twitter",
//  "4": "LinkedIn",
// }
