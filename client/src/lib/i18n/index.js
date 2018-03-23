import { addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import enMessages from './messages/en.json';

import es from 'react-intl/locale-data/es';
import esMessages from './messages/es.json';

const locales = {
    en: {
        locale: 'en',
        messages: enMessages,
    },
    es: {
        locale: 'es',
        messages: esMessages,
    },
};

addLocaleData([...en, ...es]);

export const getLocaleData = (locale = 'en') => (locales[locale] ? locales[locale] : locales['en']);
