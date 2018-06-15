import { getSignalTypeLabel } from '../constants/signalTypeOptions';

export const getSignalTypeLabelMessage = type => {
    const signalTypeLabel = getSignalTypeLabel(type);
    if (!signalTypeLabel) {
        return '';
    }
    return signalTypeLabel === 'All' ? `in ${signalTypeLabel} Signals` : `in ${signalTypeLabel}`;
};

export const getMessageForSearchBySignalTypeLabel = (searchName, type) => {
    const signalTypeLabelMessage = getSignalTypeLabelMessage(type);
    const forSearchNameMessage = `for ${searchName}`;

    if (searchName && signalTypeLabelMessage) {
        return `${forSearchNameMessage} ${signalTypeLabelMessage}`;
    } else if (signalTypeLabelMessage) {
        return `${signalTypeLabelMessage}`;
    } else {
        return `${forSearchNameMessage}`;
    }
};
