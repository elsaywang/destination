'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pxToNumber = exports.chevronDownIcon = exports.addBreadcrumbClickHandler = exports.getWorkspaceHTML = exports.getSubNavConfigForCurrentPage = exports.getSelectedWorkSpaceConfig = exports.getSelectedWorkSpaceKey = exports.getSumOfLeftMarginAndLeftPadding = undefined;

var _aamUserroles = require('@aam/aam-userroles');

var _nav = require('./nav.config');

var dropPX = function dropPX(str) {
    return str.replace('px', '');
};
var toNumber = function toNumber(str) {
    return Number(str);
};
var pxToNumber = function pxToNumber(str) {
    return toNumber(dropPX(str));
};
var getSumOfLeftMarginAndLeftPadding = function getSumOfLeftMarginAndLeftPadding(element) {
    var computedStyle = getComputedStyle(element);

    return pxToNumber(computedStyle.paddingLeft) + pxToNumber(computedStyle.marginLeft);
};
var chevronDownIcon = '<coral-icon icon="chevronDown" size="XS"></coral-icon>';
var getWorkspaceHTML = function getWorkspaceHTML(config, key) {
    var userRoles = (0, _aamUserroles.getUserRoles)();
    var showWorkspace = !config.requiredRoles.length || (0, _aamUserroles.hasSomeRoles)(config.requiredRoles, userRoles);

    return showWorkspace ? '<a is="coral-shell-workspace"\n            ' + (config.isDropTarget ? ' class="drop-target"' : '') + '\n            href="' + (config.href || '#') + '"\n            data-config-key=\'' + key + '\'>\n            ' + config.name + ' ' + (config.isDropTarget ? chevronDownIcon : '') + '\n        </a>' : '';
};
var getSelectedWorkSpaceConfig = function getSelectedWorkSpaceConfig(href) {
    var config = Object.entries(_nav.navConfig).filter(function (workspaceConfig) {
        return new RegExp(workspaceConfig[1].urlRegex, 'ig').test(href);
    });

    return config.length ? config[0] : [];
};
var getSelectedWorkSpaceKey = function getSelectedWorkSpaceKey() {
    var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
    return getSelectedWorkSpaceConfig(href)[0] || '';
};
var getSubNavConfigForCurrentPage = function getSubNavConfigForCurrentPage() {
    var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;

    var config = _nav.navConfig[getSelectedWorkSpaceKey(href)];
    var subNavItems = config && config.items ? config.items : [];
    var subNavConfig = subNavItems.filter(function (subNavItem) {
        return new RegExp(subNavItem.urlRegex || subNavItem.url, 'ig').test(href);
    });

    return subNavConfig.length ? subNavConfig[0] : {};
};
var addBreadcrumbClickHandler = function addBreadcrumbClickHandler() {
    var levelOneBreadcrumb = document.querySelector('.level1-title');

    levelOneBreadcrumb && levelOneBreadcrumb.addEventListener('click', levelOneBreadcrumbClickHandler);
};

var levelOneBreadcrumbClickHandler = function levelOneBreadcrumbClickHandler() {
    var config = getSubNavConfigForCurrentPage();

    if (config.url) {
        window.location = config.url;
    }
};

exports.getSumOfLeftMarginAndLeftPadding = getSumOfLeftMarginAndLeftPadding;
exports.getSelectedWorkSpaceKey = getSelectedWorkSpaceKey;
exports.getSelectedWorkSpaceConfig = getSelectedWorkSpaceConfig;
exports.getSubNavConfigForCurrentPage = getSubNavConfigForCurrentPage;
exports.getWorkspaceHTML = getWorkspaceHTML;
exports.addBreadcrumbClickHandler = addBreadcrumbClickHandler;
exports.chevronDownIcon = chevronDownIcon;
exports.pxToNumber = pxToNumber;