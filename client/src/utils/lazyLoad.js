export const handleLazyLoadSavedSearches = (
    isBottomPassed,
    visibleSavedSearchList,
    trackedInDashboardSavedSearchList,
    loadMoreFn,
) => {
    if (
        isBottomPassed &&
        visibleSavedSearchList.length < trackedInDashboardSavedSearchList.length
    ) {
        loadMoreFn();
    }
};
