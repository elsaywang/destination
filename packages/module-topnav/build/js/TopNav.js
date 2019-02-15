'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTopNav = exports.setActiveWorkspaceAndBindBreakcrumbClick = exports.TopNav = undefined;

var _aamUserroles = require('@aam/aam-userroles');

var _nav = require('./nav.utils');

var _nav2 = require('./nav.config');

var _SubNav = require('./SubNav');

var _TopNav = require('./TopNav.IMS');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initTopNav = function initTopNav() {
    (0, _aamUserroles.getUserRolesPromise)().then(function () {
        if ((0, _aamUserroles.isIMSUser)()) {
            (0, _TopNav.fetchIMSConfig)().then(function (resp) {
                (0, _TopNav.initIMSFeatures)(resp.data);
                new TopNav();
            });
        } else {
            (0, _TopNav.initNonIMSFeatures)();
            new TopNav();
        }
    });
};

var setActiveWorkspace = function setActiveWorkspace(key, workspaces) {
    var allWorkspaces = Array.from(workspaces || document.querySelector('coral-shell-workspaces').children);
    var selectedWorkspace = allWorkspaces.filter(function (ws) {
        return ws.dataset.configKey === key;
    });

    if (selectedWorkspace && selectedWorkspace.length) {
        selectedWorkspace[0].setAttribute('selected', true);
    }
};

var setActiveWorkspaceAndBindBreakcrumbClick = function setActiveWorkspaceAndBindBreakcrumbClick(key, ws) {
    setActiveWorkspace(key, ws);
    (0, _nav.addBreadcrumbClickHandler)();
};

var TopNav = function TopNav() {
    var _this = this;

    var parentNodeSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'coral-shell-header-content';

    _classCallCheck(this, TopNav);

    this.handleEnter = function (e) {
        var workspace = e.currentTarget;
        var isDropTarget = workspace.classList.contains('drop-target');
        var dropZone = document.querySelector('.drop-zone');
        var subNav = new _SubNav.SubNav({
            menuConfig: _nav2.navConfig[workspace.dataset.configKey],
            workspace: workspace
        });

        if (!isDropTarget || !subNav.anchorList.childElementCount) {
            // dashboard or sub nav is empty
            return subNav && subNav.anchorList.hide();
        }

        workspace.classList.add('trigger-enter', 'trigger-enter-active');
        dropZone.appendChild(subNav.anchorList);
    };

    this.handleLeave = function (e) {
        var workspace = e.currentTarget;

        setTimeout(function () {
            var list = document.querySelector('.subNav-anchorlist:not(.open-active)');

            workspace.classList.remove('trigger-enter', 'trigger-enter-active');
            list && list.hide();
        });
    };

    var parentNode = document.querySelector(parentNodeSelector);
    var coralWorkspaces = document.createElement('coral-shell-workspaces');

    coralWorkspaces.innerHTML = Object.keys(_nav2.navConfig).reduce(function (str, key) {
        return str + (0, _nav.getWorkspaceHTML)(_nav2.navConfig[key], key);
    }, '');
    var dropTargets = coralWorkspaces.querySelectorAll('.drop-target');

    coralWorkspaces.childElementCount && Array.from(coralWorkspaces.children).forEach(function (target) {
        target.addEventListener('mouseenter', _this.handleEnter);
    });
    setActiveWorkspaceAndBindBreakcrumbClick((0, _nav.getSelectedWorkSpaceKey)(window.location.href), coralWorkspaces.children);

    dropTargets.length && Array.from(dropTargets).forEach(function (target) {
        target.addEventListener('mouseleave', _this.handleLeave);
        target.parentNode.replaceChild(target, target);
        target.addEventListener('click', function (e) {
            return e.preventDefault();
        });
    });

    parentNode && parentNode.appendChild(coralWorkspaces);
};

exports.TopNav = TopNav;
exports.setActiveWorkspaceAndBindBreakcrumbClick = setActiveWorkspaceAndBindBreakcrumbClick;
exports.initTopNav = initTopNav;