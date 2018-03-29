export const OnboardedRecords = 'Onboarded Records';

export const equalize = (number, name) => (number > 1 ? `${name}s` : name);

export const formatDisplayContextByType = (number, type, name, suffix = '') =>
    `${number} ${type} ${equalize(number, name)} ${suffix}`;

export const formatSelectedSignalsDisplayContext = (
    totalOnboardedRecords = 0,
    totalRealTimeRecords = 0,
) => {
    if (totalRealTimeRecords && totalOnboardedRecords) {
        return (
            formatDisplayContextByType(totalOnboardedRecords, 'Onboarded', 'signal', ', ') +
            formatDisplayContextByType(totalRealTimeRecords, 'Real-time', 'signal', 'selected')
        );
    } else if (totalOnboardedRecords) {
        return formatDisplayContextByType(totalOnboardedRecords, 'Onboarded', 'signal', 'selected');
    } else if (totalRealTimeRecords) {
        return formatDisplayContextByType(totalRealTimeRecords, 'Real-time', 'signal', 'selected');
    }
    return '';
};

export const getTotalOnboardedRecords = rowRecords =>
    rowRecords.filter(t => t.signalType === OnboardedRecords).length;

export const getTotalRealTimeRecords = rowRecords =>
    rowRecords.filter(t => t.signalType !== OnboardedRecords).length;

export const renderSelectedSignalsContext = rowRecords => {
    const totalSelectedRecords = rowRecords.length;
    if (!totalSelectedRecords) return '';
    const totalOnboardedRecords = getTotalOnboardedRecords(rowRecords);
    const totalRealTimeRecords = getTotalRealTimeRecords(rowRecords);
    return formatSelectedSignalsDisplayContext(totalOnboardedRecords, totalRealTimeRecords);
};
