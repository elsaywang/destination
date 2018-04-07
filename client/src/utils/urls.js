import { portalUrl } from '../lib/portalUrl';

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
