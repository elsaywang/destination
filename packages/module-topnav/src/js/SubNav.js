/* global Coral */
import { getSelectedWorkSpaceKey, getSumOfLeftMarginAndLeftPadding, pxToNumber } from './nav.utils';
import { hasAllRoles, hasSomeRoles } from '@aam/aam-userroles';
import { setActiveWorkspaceAndBindBreakcrumbClick } from './TopNav';

class SubNav {
    constructor({ menuConfig, workspace }) {
        const subMenuHTML =
            menuConfig &&
            menuConfig.items &&
            menuConfig.items.reduce((memo, item) => (memo += this.renderSubNavItem(item)), '');

        this.anchorList = this.initAnchorList(workspace.getBoundingClientRect());
        this.anchorList.innerHTML = subMenuHTML || '';
        this.anchorList.innerHTML && this.setAnchorListCoords(workspace);
        this.bindEvents(this.anchorList);

        return this;
    }

    initAnchorList = workspaceCoords => {
        const oldList = document.querySelector('.subNav-anchorlist');
        const listContainer = oldList.parentNode;
        const anchorList = new Coral.AnchorList();

        listContainer.removeChild(oldList);
        listContainer.appendChild(anchorList);
        anchorList.classList.add('open', 'subNav-anchorlist');
        anchorList.workspaceCoords = workspaceCoords;

        return anchorList;
    };

    bindEvents = list => {
        list.addEventListener('mouseenter', this.handleEnter);
        list.addEventListener('mouseleave', this.handleLeave);
        list
            .querySelectorAll('[is="coral-anchorlist-item"]')
            .forEach(item => item.addEventListener('click', this.handleClick));
    };

    renderSubNavItem = listItemConfig => {
        const canShowItem = listItemConfig.requiredAllRoles
            ? hasAllRoles(listItemConfig.requiredRoles)
            : hasSomeRoles(listItemConfig.requiredRoles);

        return canShowItem
            ? `<a is="coral-anchorlist-item" href="${listItemConfig.url}">${
                  listItemConfig.name
              }</a>`
            : '';
    };

    setAnchorListCoords = workspace => {
        const workspaceItemLeftOffset = getSumOfLeftMarginAndLeftPadding(workspace);
        const anchorListLeftOffset = getSumOfLeftMarginAndLeftPadding(this.anchorList);
        const firstAnchorListItemSelector = 'a[is="coral-anchorlist-item"]:first-child';
        const firstListItem = this.anchorList.querySelector(firstAnchorListItemSelector);
        const firstListItemOffset = getSumOfLeftMarginAndLeftPadding(firstListItem);
        const sumAllLeftPaddingMargin =
            this.anchorList.workspaceCoords.left -
            workspaceItemLeftOffset +
            (firstListItemOffset || 10) - // only Chrome return the used value, 10, at this point, other browsers return, the resolved value, 0, until the list hits the DOM then they return 10.
            anchorListLeftOffset;

        Object.assign(this.anchorList.style, {
            // dynamic width for subnav menu
            minWidth: `${
                pxToNumber(getComputedStyle(workspace).width) + workspaceItemLeftOffset * 2 // account for left and right padding/margin
            }px`,
            top: `${this.anchorList.workspaceCoords.height +
                this.anchorList.workspaceCoords.top}px`,

            // aligning the topnav menu item with the submenu dropdown
            left: `${sumAllLeftPaddingMargin}px`,
        });
    };

    handleClick = e =>
        setActiveWorkspaceAndBindBreakcrumbClick(getSelectedWorkSpaceKey(e.currentTarget.href));

    handleEnter = e => {
        const anchorList = e.currentTarget;

        anchorList.classList.contains('open') && anchorList.classList.add('open-active');
    };

    handleLeave = e => {
        const anchorList = e.currentTarget;

        anchorList.classList.remove('open-active');
        anchorList.hide();
    };
}

export { SubNav };
