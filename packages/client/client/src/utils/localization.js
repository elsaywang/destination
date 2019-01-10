import { defineMessages } from 'react-intl';

export const getMessages = defaultMessage =>
    defineMessages({
        title: {
            id: 'components.Layout.title',
            description: `Title for the ${defaultMessage} page`,
            defaultMessage,
        },
    });
