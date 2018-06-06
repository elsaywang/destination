export const isLimitReached = (savedSearchlist, limit) => Boolean(savedSearchlist.length >= limit);

export const normalizeSavedSearchList = (savedSearchlist, limit) =>
    isLimitReached(savedSearchlist, limit) ? [...savedSearchlist].slice(0, limit) : savedSearchlist;
