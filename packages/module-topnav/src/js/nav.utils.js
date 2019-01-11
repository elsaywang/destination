import { getUserRoles, hasSomeRoles } from '@aam/aam-userroles';
import { navConfig } from './nav.config';

const dropPX = str => str.replace('px', '');
const toNumber = str => Number(str);
const pxToNumber = str => toNumber(dropPX(str));
const getSumOfLeftMarginAndLeftPadding = element => {
    const computedStyle = getComputedStyle(element);

    return pxToNumber(computedStyle.paddingLeft) + pxToNumber(computedStyle.marginLeft);
};
const chevronDownIcon = '<coral-icon icon="chevronDown" size="XS"></coral-icon>';
const getWorkspaceHTML = (config, key) => {
    const userRoles = getUserRoles();
    const showWorkspace =
        !config.requiredRoles.length || hasSomeRoles(config.requiredRoles, userRoles);

    return showWorkspace
        ? `<a is="coral-shell-workspace"
            ${config.isDropTarget ? ' class="drop-target"' : ''}
            href="${config.href || '#'}"
            data-config-key='${key}'>
            ${config.name} ${config.isDropTarget ? chevronDownIcon : ''}
        </a>`
        : '';
};
const getSelectedWorkSpaceConfig = href => {
    const config = Object.entries(navConfig).filter(workspaceConfig =>
        new RegExp(workspaceConfig[1].urlRegex, 'ig').test(href),
    );

    return config.length ? config[0] : [];
};
const getSelectedWorkSpaceKey = (href = window.location.href) => getSelectedWorkSpaceConfig(href)[0] || '';
const getSubNavConfigForCurrentPage = (href = window.location.href) => {
    const config = navConfig[getSelectedWorkSpaceKey(href)];
    const subNavItems = (config && config.items) ? config.items : [];
    const subNavConfig = subNavItems.filter(subNavItem =>
        new RegExp(subNavItem.urlRegex || subNavItem.url, 'ig').test(href),
    );

    return subNavConfig.length ? subNavConfig[0] : {};
};
const addBreadcrumbClickHandler = () => {
    const levelOneBreadcrumb = document.querySelector('.level1-title');

    levelOneBreadcrumb &&
        levelOneBreadcrumb.addEventListener('click', levelOneBreadcrumbClickHandler);
};

const levelOneBreadcrumbClickHandler = () => {
    const config = getSubNavConfigForCurrentPage();

    if (config.url) {
        window.location = config.url;
    }
};

export {
    getSumOfLeftMarginAndLeftPadding,
    getSelectedWorkSpaceKey,
    getSelectedWorkSpaceConfig,
    getSubNavConfigForCurrentPage,
    getWorkspaceHTML,
    addBreadcrumbClickHandler,
    chevronDownIcon,
    pxToNumber,
};
