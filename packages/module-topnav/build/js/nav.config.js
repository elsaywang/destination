'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var navConfig = {
    dashboard: {
        name: 'Dashboard',
        isDropTarget: false,
        href: '/portal/Analytics/reports.ddx#/dashboard',
        urlRegex: '/portal/analytics/reports.ddx#/dashboard',
        requiredRoles: [],
        items: []
    },
    audienceData: {
        name: 'Audience Data',
        isDropTarget: true,
        urlRegex: '/portal/(segments/(models|segmentbuilder|listdestinations|datasourcemanagement|managedestination)|audiencelab|traits|profilemerge|signals)',
        requiredRoles: ['VIEW_DATASOURCES', 'VIEW_TRAITS', 'VIEW_SEGMENTS', 'VIEW_DESTINATIONS', 'VIEW_MODELS'],
        items: [{
            name: 'Data Sources',
            requiredRoles: ['VIEW_DATASOURCES'],
            url: '/portal/Segments/DatasourceManagement.ddx#datasources/list',
            urlRegex: '/portal/Segments/DatasourceManagement.ddx'
        }, {
            name: 'Signals <coral-tag size="S" quiet>New</coral-tag>',
            requiredRoles: ['VIEW_SIGNALS', 'FEATURE_DATA_EXPLORER'],
            requiredAllRoles: true,
            url: '/portal/signals/'
        }, {
            name: 'Traits',
            requiredRoles: ['VIEW_TRAITS'],
            url: '/portal/Traits/Traits.ddx#show/list',
            urlRegex: '/portal/Traits/Traits.ddx'
        }, {
            name: 'Segments',
            requiredRoles: ['VIEW_SEGMENTS'],
            url: '/portal/Segments/SegmentBuilder.ddx#list',
            urlRegex: '/portal/Segments/SegmentBuilder.ddx'
        }, {
            name: 'Destinations',
            requiredRoles: ['VIEW_DESTINATIONS'],
            url: '/portal/Segments/ListDestinations.ddx',
            urlRegex: '/portal/Segments/.*destination(s{0,}).ddx'
        }, {
            name: 'Profile Merge Rules',
            requiredRoles: ['VIEW_DATASOURCES', 'ACCOUNT_FULL_AAM'],
            requiredAllRoles: true,
            url: '/portal/ProfileMerge/ProfileMerge.ddx'
        }, {
            name: 'Models',
            requiredRoles: ['VIEW_MODELS'],
            url: '/portal/Segments/Models.ddx'
        }, {
            name: 'Audience Lab',
            requiredRoles: ['MANAGE_SEGMENT_TEST_GROUPS', 'ACCOUNT_FULL_AAM'],
            requiredAllRoles: true,
            url: '/portal/AudienceLab/AudienceLab.ddx'
        }]
    },
    analytics: {
        name: 'Analytics',
        isDropTarget: true,
        urlRegex: 'portal/analytics/(reports.ddx#/(general|trend)|outbound|onboarding|tableau)',
        requiredRoles: [],
        items: [{
            name: 'General Reports',
            requiredRoles: ['VIEW_TRAITS', 'VIEW_SEGMENTS', 'VIEW_DESTINATIONS'],
            url: '/portal/Analytics/reports.ddx#/general-reports'
        }, {
            name: 'Trend Reports',
            requiredRoles: ['VIEW_TRAITS', 'VIEW_SEGMENTS'],
            url: '/portal/Analytics/reports.ddx#/trend-graph'
        }, {
            name: 'Audience Reports',
            requiredRoles: ['ACCOUNT_FULL_AAM'],
            url: '/portal/Analytics/tableau/ViewReport.ddx'
        }, {
            name: 'Onboarding Status',
            requiredRoles: ['PTRADMIN'],
            url: '/portal/Analytics/OnboardingStatus.ddx'
        }, {
            name: 'Outbound File History',
            requiredRoles: ['VIEW_DESTINATIONS'],
            url: '/portal/Analytics/OutboundHistory.ddx#/outbound-history'
        }]
    },
    audienceMarketplace: {
        name: 'Audience Marketplace',
        isDropTarget: true,
        requiredRoles: ['FEATURE_AUDIENCE_MARKETPLACE'],
        urlRegex: '/portal/Analytics/+(index)',
        items: [{
            name: 'Marketplace',
            requiredRoles: ['ACCOUNT_FULL_AAM'],
            url: '/portal/Analytics/index.ddx#/marketplace'
        }, {
            name: 'Shared Data',
            requiredRoles: ['ACCOUNT_DATA_PROVIDER'],
            url: '/portal/Analytics/index.ddx#/myshareddata'
        }, {
            name: 'Payables',
            requiredRoles: ['ACCOUNT_FULL_AAM'],
            url: '/portal/Analytics/index.ddx#/payables'
        }, {
            name: 'Receivables',
            requiredRoles: ['ACCOUNT_DATA_PROVIDER'],
            url: '/portal/Analytics/index.ddx#/receivables'
        }]
    },
    tools: {
        name: 'Tools',
        isDropTarget: true,
        urlRegex: '/portal/(profile/visitorprofileviewer|tim|segments/managederivedsignal)',
        requiredRoles: ['VIEW_TRAITS', 'VIEW_SEGMENTS', 'VIEW_DERIVED_SIGNALS', 'VIEW_TAGS'],
        items: [{
            name: 'Tags',
            requiredRoles: ['VIEW_TAGS'],
            url: '/portal/tim/TimHome.ddx'
        }, {
            name: 'Derived Signals',
            requiredRoles: ['VIEW_DERIVED_SIGNALS'],
            url: '/portal/Segments/ManageDerivedSignal.ddx'
        }, {
            name: 'Visitor Profile Viewer',
            requiredRoles: ['VIEW_TRAITS', 'VIEW_SEGMENTS'],
            url: '/portal/Profile/VisitorProfileViewer.ddx'
        }]
    },
    administration: {
        name: 'Administration',
        isDropTarget: true,
        urlRegex: '/portal/account/partners',
        requiredRoles: ['PTRADMIN'],
        items: [{
            name: 'Users',
            requiredRoles: ['PTRADMIN'],
            url: '/portal/Account/Partners/UserManagement.ddx'
        }, {
            name: 'Groups',
            requiredRoles: ['PTRADMIN'],
            url: '/portal/Account/Partners/GroupManagement.ddx'
        }, {
            name: 'Limits',
            requiredRoles: ['PTRADMIN'],
            url: '/portal/Account/Partners/Limits.ddx#/limits'
        }]
    }
};

exports.navConfig = navConfig;