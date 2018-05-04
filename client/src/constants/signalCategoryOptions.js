export const getSignalCategory = type => {
    if (type === 'ONBOARDED') {
        return 'Onboarded';
    }

    if (type === 'ALL') {
        return '';
    }

    return 'Real-Time';
};
