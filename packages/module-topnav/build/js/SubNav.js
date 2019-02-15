'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubNav = undefined;

var _nav = require('./nav.utils');

var _aamUserroles = require('@aam/aam-userroles');

var _TopNav = require('./TopNav');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* global Coral */


var SubNav = function SubNav(_ref) {
    var _this = this;

    var menuConfig = _ref.menuConfig,
        workspace = _ref.workspace;

    _classCallCheck(this, SubNav);

    _initialiseProps.call(this);

    var subMenuHTML = menuConfig && menuConfig.items && menuConfig.items.reduce(function (memo, item) {
        return memo += _this.renderSubNavItem(item);
    }, '');

    this.anchorList = this.initAnchorList(workspace.getBoundingClientRect());
    this.anchorList.innerHTML = subMenuHTML || '';
    this.anchorList.innerHTML && this.setAnchorListCoords(workspace);
    this.bindEvents(this.anchorList);

    return this;
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.initAnchorList = function (workspaceCoords) {
        var oldList = document.querySelector('.subNav-anchorlist');
        var listContainer = oldList.parentNode;
        var anchorList = new Coral.AnchorList();

        listContainer.removeChild(oldList);
        listContainer.appendChild(anchorList);
        anchorList.classList.add('open', 'subNav-anchorlist');
        anchorList.workspaceCoords = workspaceCoords;

        return anchorList;
    };

    this.bindEvents = function (list) {
        list.addEventListener('mouseenter', _this2.handleEnter);
        list.addEventListener('mouseleave', _this2.handleLeave);
        list.querySelectorAll('[is="coral-anchorlist-item"]').forEach(function (item) {
            return item.addEventListener('click', _this2.handleClick);
        });
    };

    this.renderSubNavItem = function (listItemConfig) {
        var canShowItem = listItemConfig.requiredAllRoles ? (0, _aamUserroles.hasAllRoles)(listItemConfig.requiredRoles) : (0, _aamUserroles.hasSomeRoles)(listItemConfig.requiredRoles);

        return canShowItem ? '<a is="coral-anchorlist-item" href="' + listItemConfig.url + '">' + listItemConfig.name + '</a>' : '';
    };

    this.setAnchorListCoords = function (workspace) {
        var workspaceItemLeftOffset = (0, _nav.getSumOfLeftMarginAndLeftPadding)(workspace);
        var anchorListLeftOffset = (0, _nav.getSumOfLeftMarginAndLeftPadding)(_this2.anchorList);
        var firstAnchorListItemSelector = 'a[is="coral-anchorlist-item"]:first-child';
        var firstListItem = _this2.anchorList.querySelector(firstAnchorListItemSelector);
        var firstListItemOffset = (0, _nav.getSumOfLeftMarginAndLeftPadding)(firstListItem);
        var sumAllLeftPaddingMargin = _this2.anchorList.workspaceCoords.left - workspaceItemLeftOffset + (firstListItemOffset || 10) - // only Chrome return the used value, 10, at this point, other browsers return, the resolved value, 0, until the list hits the DOM then they return 10.
        anchorListLeftOffset;

        Object.assign(_this2.anchorList.style, {
            // dynamic width for subnav menu
            minWidth: (0, _nav.pxToNumber)(getComputedStyle(workspace).width) + workspaceItemLeftOffset * 2 // account for left and right padding/margin
            + 'px',
            top: _this2.anchorList.workspaceCoords.height + _this2.anchorList.workspaceCoords.top + 'px',

            // aligning the topnav menu item with the submenu dropdown
            left: sumAllLeftPaddingMargin + 'px'
        });
    };

    this.handleClick = function (e) {
        return (0, _TopNav.setActiveWorkspaceAndBindBreakcrumbClick)((0, _nav.getSelectedWorkSpaceKey)(e.currentTarget.href));
    };

    this.handleEnter = function (e) {
        var anchorList = e.currentTarget;

        anchorList.classList.contains('open') && anchorList.classList.add('open-active');
    };

    this.handleLeave = function (e) {
        var anchorList = e.currentTarget;

        anchorList.classList.remove('open-active');
        anchorList.hide();
    };
};

exports.SubNav = SubNav;