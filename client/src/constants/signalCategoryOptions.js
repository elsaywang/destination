export const getSignalCategory = type => {
    if (type === 'ONBOARDED') {
        return 'Onboarded';
    }

    if (type === 'ALL') {
        return 'Real-Time and Onboarded';
    }

    return 'Real-Time';
};
