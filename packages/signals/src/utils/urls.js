import { portalUrl } from '../constants/portalUrl';

export const serialize = (options = {}) => {
    const entries = Object.entries(options);
    const isEmpty = entries.length === 0;

    if (isEmpty) {
        return '';
    }

    return `?${entries.map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')}`;
};

export const traitsUrl = options => `${portalUrl}/Traits/Traits.ddx${serialize(options)}`;
export const createRuleBasedTraitUrl = options => `${traitsUrl(options)}#new/rule`;
export const createOnboardedTraitUrl = options => `${traitsUrl(options)}#new/onboarded`;
export const dataSourceEditUrl = dataSourceId =>
    `${portalUrl}/Segments/DatasourceManagement.ddx#datasources/edit/${dataSourceId}`;

export const footerUrls = [
    {
        item: 'Help',
        url: 'https://experiencecloud.adobe.com/resources/help/en_US/aam/',
    },
    {
        item: 'Terms of Use',
        url: 'http://www.adobe.com/go/marketingcloud_terms_of_use',
    },
    {
        item: 'Privacy Policy',
        url: 'http://www.adobe.com/go/marketingcloud_privacy',
    },
];

export const dataExplorerDocumentationLink = {
    url: '//experiencecloud.adobe.com/resources/help/en_US/aam/data-explorer.html',
    description: 'Learn more about Data Explorer',
};
