export const handleLazyLoad = (
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
