import { addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import enUs from './messages/en-US.json';

import es from 'react-intl/locale-data/es';
import esEs from './messages/es-ES.json';

const locales = {
    'en-US': {
        locale: 'en',
        messages: enUs,
    },
    'es-ES': {
        locale: 'es',
        messages: esEs,
    },
};

addLocaleData([...en, ...es]);

export const getLocaleData = (locale = 'en-US') =>
    locales[locale] ? locales[locale] : locales['en-US'];
