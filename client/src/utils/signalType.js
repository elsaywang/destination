import { getSignalTypeLabel } from '../constants/signalTypeOptions';

export const getSignalTypeLabelMessage = type => {
    const signalTypeLabel = getSignalTypeLabel(type);
    return signalTypeLabel === 'All' || !signalTypeLabel
        ? `in All Signals`
        : `in ${signalTypeLabel}`;
};

export const getSearchResultsMessageBySignalTypeLabel = (searchName, type) => {
    const signalTypeLabelMessage = getSignalTypeLabelMessage(type);
    const forSearchNameMessage = `for ${searchName}`;

    if (searchName && signalTypeLabelMessage) {
        return `${forSearchNameMessage} ${signalTypeLabelMessage}`;
    }
    return `${signalTypeLabelMessage}`;
};
