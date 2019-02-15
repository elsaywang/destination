'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fillUserInfo = exports.initNonIMSFeatures = exports.initIMSFeatures = exports.setUserMenuLinks = exports.fetchIMSConfig = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('whatwg-fetch');

var _aamUserroles = require('@aam/aam-userroles');

var configEndpoint = '/portal/api/v1/configs';
var logoutEndpoint = '/portal/login/Logout.ddx';
var csrfMetaTag = document.querySelector('meta[name="_tk"]');
var parseJSON = function parseJSON(response) {
    return response.json().then(function (json) {
        return {
            ok: response.ok,
            data: json,
            status: response.status
        };
    });
};
var fetchHeader = {
    'AAM-CSRF-Token': csrfMetaTag ? csrfMetaTag.content : window.csrfToken,
    'Content-type': 'application/json'
};

var fetchParams = {
    headers: fetchHeader,
    credentials: 'same-origin'
};

var fetchIMSConfig = function fetchIMSConfig() {
    return fetch(configEndpoint, fetchParams).then(parseJSON);
};

var composeShellIMSConfig = function composeShellIMSConfig(userInfo, globalIMSInfo) {
    var _ref = globalIMSInfo || {},
        experienceCloudConfiguration = _ref.experienceCloudConfiguration,
        imsConfiguration = _ref.imsConfiguration;

    var colon2Slashes = '://';
    var fullUrl = (0, _aamUserroles.isIMSUser)() ? experienceCloudConfiguration.url : '';
    var marketingAdobeDomain = (0, _aamUserroles.isIMSUser)() ? fullUrl.substr(fullUrl.indexOf(colon2Slashes) + colon2Slashes.length) : '';

    return Object.assign({}, (0, _aamUserroles.isIMSUser)() ? {
        jsonconfig: experienceCloudConfiguration.cdn + '/v2/en-us/latest.json',
        clientid: imsConfiguration.clientId,
        organizationsendpoint: 'https://' + imsConfiguration.host + '/ims/organizations/v1',
        profileendpoint: 'https://' + imsConfiguration.host + '/ims/profile/v1',
        logoutendpoint: 'https://' + imsConfiguration.host + '/ims/logout/v1',
        logoutredirecturl: '' + imsConfiguration.redirectUrl,
        profileredirecturl: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/tools/profile.html',
        manageorgurl: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/orgs.html',
        avatarendpoint: 'https://' + imsConfiguration.host + '/ims/avatar/download/{userId}?size=small',
        setactiveorgendpoint: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/header.setActiveOrg.json',
        setactivepcendpoint: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/header.setActivePC.json',
        pulseendpoint: '' + imsConfiguration.pulseEndpoint,
        marketingcloudendpoint: 'https://<tenantId>.' + marketingAdobeDomain,
        getlinkendpoint: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/tools/accountslinking/jcr:content.{productId}.getLink.json?orgId={orgId}&companyName={companyName}&fromProfile=false',
        loginendpoint: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/tools/accountslinking/jcr:content.{productId}.login.json',
        linkendpoint: 'https://<tenantId>.' + marketingAdobeDomain + '/content/mac/default/tools/accountslinking/jcr:content.{productId}.link.json',
        apiKey: imsConfiguration.clientId,
        imssessionurl: userInfo.imsSessionUrl,
        accesstoken: userInfo.imsAccessToken
    } : {}, {
        imsuser: '' + (0, _aamUserroles.isIMSUser)(),
        troubleLink: 'https://marketing.adobe.com/resources/help/en_US/mcloud/link_accounts.html'
    });
};

var assignIMSConfig = function assignIMSConfig(shellIMSConfig) {
    var shell = document.querySelector('coral-shell-ims');

    Object.entries(shellIMSConfig).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            val = _ref3[1];

        val && shell.setAttribute(key, val);
    });
};

var appendMenubarItems = function appendMenubarItems() {
    appendOrgSwitcherMenubarItem();
    appendPulseMenubarItem();
    appendSolutionSwitcherMenubarItem();
};

var appendOrgSwitcherMenubarItem = function appendOrgSwitcherMenubarItem() {
    var helpBtn = document.querySelector('coral-shell-menubar-item[menu="#menu_help"]');
    var orgSwitcherBtn = new Coral.Shell.MenuBar.Item();

    Object.entries({
        class: 'coral-Shell-menubar-item',
        'coral-shell-ims-menu-organizations': '',
        menu: '#menu_organizations'
    }).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            val = _ref5[1];

        return orgSwitcherBtn.setAttribute(key, val);
    });

    helpBtn.parentNode.insertBefore(orgSwitcherBtn, helpBtn);
};

var appendPulseMenubarItem = function appendPulseMenubarItem() {
    var userBtn = document.querySelector('coral-shell-menubar-item[menu="#menu_user"]');
    var pulseBtn = new Coral.Shell.MenuBar.Item();

    Object.entries({
        class: 'coral-Shell-menubar-item',
        'coral-shell-ims-menu-notifications': '',
        icon: 'bell',
        menu: '#menu_pulse'
    }).forEach(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            key = _ref7[0],
            val = _ref7[1];

        return pulseBtn.setAttribute(key, val);
    });

    userBtn.parentNode.insertBefore(pulseBtn, userBtn);
};

var appendSolutionSwitcherMenubarItem = function appendSolutionSwitcherMenubarItem() {
    var pulseBtn = document.querySelector('coral-shell-menubar-item[menu="#menu_pulse"]');
    var solutionSwitcherBtn = new Coral.Shell.MenuBar.Item();

    Object.entries({
        class: 'coral-Shell-menubar-item',
        'coral-shell-ims-menu-solutions': '',
        icon: 'apps',
        menu: '#menu_solutions'
    }).forEach(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            key = _ref9[0],
            val = _ref9[1];

        return solutionSwitcherBtn.setAttribute(key, val);
    });

    pulseBtn.parentNode.insertBefore(solutionSwitcherBtn, pulseBtn);
};

var fillUserInfo = function fillUserInfo(userInfo) {
    var userMenu = document.querySelector('coral-Shell-user');
    var firstName = userInfo.firstName,
        lastName = userInfo.lastName,
        title = userInfo.title,
        companyName = userInfo.companyName;


    userMenu.name.innerHTML = (firstName || '') + ' ' + (lastName || '');
    userMenu.heading.innerHTML = title || '';
    userMenu.subheading.innerHTML = companyName;
};

var setUserMenuLinks = function setUserMenuLinks(isIMSUser) {
    var userFooterLinks = document.querySelectorAll('coral-shell-user-footer [is="coral-anchorbutton"]');

    var hrefs = {
        editProfile: isIMSUser ? '#profile' : '/portal/Account/Partners/EditMyProfileDynamic.ddx',
        signOut: isIMSUser ? '#signout' : '/portal/j_spring_security_logout'
    };

    userFooterLinks.forEach(function (node, index) {
        node.setAttribute('href', Object.values(hrefs)[index]);
    });
};

var initIMSFeatures = function initIMSFeatures(imsConfig) {
    var userInfo = (0, _aamUserroles.getUserInfo)();
    var shellIMSConfig = composeShellIMSConfig(userInfo, imsConfig);

    assignIMSConfig(shellIMSConfig);
    appendMenubarItems();
    bindOrgSwitcherEventListener(imsConfig.experienceCloudConfiguration.url, logoutEndpoint);
    setUserMenuLinks((0, _aamUserroles.isIMSUser)());
    fillUserInfo(userInfo);
};

var initNonIMSFeatures = function initNonIMSFeatures() {
    var userInfo = (0, _aamUserroles.getUserInfo)();
    var shellConfig = composeShellIMSConfig(userInfo);

    assignIMSConfig(shellConfig);
    setUserMenuLinks();
    fillUserInfo(userInfo);
};

var showErrorModal = function showErrorModal() {
    new Coral.Dialog().set({
        id: 'orgChangeError',
        header: {
            innerHTML: 'Error'
        },
        content: {
            innerHTML: "There was an error.  Please refresh and try again."
        },
        footer: {
            innerHTML: '<button is="coral-button" variant="primary" coral-close="" class="coral3-Button coral3-Button--primary" size="M"><coral-button-label>Ok</coral-button-label></button>'
        },
        variant: 'error',
        closable: 'on'
    }).show();
};

var redirectTo = function redirectTo(url) {
    return function () {
        return window.location.href = url;
    };
};

var onOrgChangeDone = function onOrgChangeDone(experienceCloudUrl, logoutEndpoint) {
    return function () {
        return fetch(logoutEndpoint).then(redirectTo(experienceCloudUrl)).catch(showErrorModal);
    };
};

var bindOrgSwitcherEventListener = function bindOrgSwitcherEventListener() {
    var experienceCloudUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var logoutEndpoint = arguments[1];

    document.addEventListener('coral-shell-orgswitcher:change:done', onOrgChangeDone(experienceCloudUrl, logoutEndpoint));
    document.addEventListener('coral-shell-orgswitcher:change:fail', showErrorModal);
};

exports.fetchIMSConfig = fetchIMSConfig;
exports.setUserMenuLinks = setUserMenuLinks;
exports.initIMSFeatures = initIMSFeatures;
exports.initNonIMSFeatures = initNonIMSFeatures;
exports.fillUserInfo = fillUserInfo;