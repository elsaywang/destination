export const getTooltipMessage = (isLimitReached, limit) =>
    isLimitReached
        ? `Saved search limit (${limit}) reached`
        : `You may save up to ${limit} searches`;
