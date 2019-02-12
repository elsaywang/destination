import _ from 'lodash';

export const integratedPlatformsOptions = [
    { label: `ALL PLATFORMS`, value: `Integrated Platforms`, serverTypes: ['S2S'] },
    {
        label: `PEOPLE-BASED`,
        value: `People-Based`,
        serverTypes: [],
        platformOptions: ['Facebook', 'Google', 'Twitter', 'LinkedIn'],
    },
    { label: `DEVICE-BASED`, value: `Device-Based`, serverTypes: ['S2S'] },
];

export const getIntegratedPlatformsOptionByType = type => {
    const integratedPlatformOption = integratedPlatformsOptions.find(
        ({ label, value }) => value === type,
    );
    return integratedPlatformOption ? integratedPlatformOption : '';
};

export const getPlatformOptions = (type = 'People-Based') => {
    const integratedPlatformOption = getIntegratedPlatformsOptionByType(type);
    const { platformOptions } = integratedPlatformOption;
    return platformOptions && platformOptions.length ? platformOptions : [];
};



export const destinationTemplateIDMap = _.keyBy(
    getPlatformOptions(),
    option => getPlatformOptions().indexOf(option) + 1,
);
// map id may change
// {
//  "1": "Facebook",
//  "2": "Google",
//  "3": "Twitter",
//  "4": "LinkedIn",
// }
