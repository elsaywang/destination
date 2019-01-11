/*
This is a modified copy of `PermissionCheckService` from AAM Portal,
includes CREATE_TRAIT permission check.
TODO: We will need to migrate this into a shared module later.
*/

export default function getPermissions(roles) {
    const canCreateTraits = roles.includes('CREATE_TRAITS');
    const canViewTraits = roles.includes('VIEW_TRAITS');
    const canViewSegments = roles.includes('VIEW_SEGMENTS');
    const canCreateDestinations = roles.includes('CREATE_DESTINATIONS');
    const canViewDestinations = roles.includes('VIEW_DESTINATIONS');
    const canViewAllTraits = roles.includes('VIEW_ALL_TRAITS');
    const canViewAllSegments = roles.includes('VIEW_ALL_SEGMENTS');
    const canEditAllSegments = roles.includes('EDIT_ALL_SEGMENTS');
    const canMapAllToDestinations = roles.includes('MAP_ALL_TO_DESTINATIONS');
    const canEnableMapAllSegments = canEditAllSegments && canMapAllToDestinations;
    const isPartnerAdmin = roles.includes('PTRADMIN');
    const isDataProvider = roles.includes('ACCOUNT_DATA_PROVIDER');
    const isDeviceGraphProvider = roles.includes('ACCOUNT_DEVICE_GRAPH_PROVIDER');
    const hasAnalyticsDestinationAccess = roles.includes('FEATURE_ANALYTICS_DESTINATION');

    return {
        canCreateTraits,
        canViewTraits,
        canViewSegments,
        canCreateDestinations,
        canViewDestinations,
        canViewAllTraits,
        canViewAllSegments,
        canEditAllSegments,
        canMapAllToDestinations,
        canEnableMapAllSegments,
        isPartnerAdmin,
        isDataProvider,
        isDeviceGraphProvider,
        hasAnalyticsDestinationAccess,
    };
}
