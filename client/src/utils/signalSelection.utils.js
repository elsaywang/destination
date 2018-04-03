const onboardedRecords = 'Onboarded Records';

export const equalize = (number, name) => (number > 1 ? `${name}s` : name);

export const formatSelectionMessageBySignalCategory = (number, category, name, suffix = '') =>
    `${number} ${category} ${equalize(number, name)} ${suffix}`;

export const formatSelectedSignalsSelectionMessage = (
    totalOnboardedRecords = 0,
    totalRealTimeRecords = 0,
) => {
    if (totalRealTimeRecords && totalOnboardedRecords) {
        return (
            formatSelectionMessageBySignalCategory(
                totalOnboardedRecords,
                'Onboarded',
                'signal',
                ', ',
            ) +
            formatSelectionMessageBySignalCategory(
                totalRealTimeRecords,
                'Real-time',
                'signal',
                'selected',
            )
        );
    } else if (totalOnboardedRecords) {
        return formatSelectionMessageBySignalCategory(
            totalOnboardedRecords,
            'Onboarded',
            'signal',
            'selected',
        );
    } else if (totalRealTimeRecords) {
        return formatSelectionMessageBySignalCategory(
            totalRealTimeRecords,
            'Real-time',
            'signal',
            'selected',
        );
    }
    return '';
};

export const getTotalOnboardedRecords = rowRecords =>
    rowRecords.filter(record => record.signalType === onboardedRecords).length;

export const getTotalRealTimeRecords = rowRecords =>
    rowRecords.filter(record => record.signalType !== onboardedRecords).length;

export const renderSelectedSignalsMessage = rowRecords => {
    if (!rowRecords.length) {
        return '';
    }
    const totalOnboardedRecords = getTotalOnboardedRecords(rowRecords);
    const totalRealTimeRecords = getTotalRealTimeRecords(rowRecords);
    return formatSelectedSignalsSelectionMessage(totalOnboardedRecords, totalRealTimeRecords);
};

export const hasWarning = rowRecords =>
    Boolean(getTotalOnboardedRecords(rowRecords) && getTotalRealTimeRecords(rowRecords));
