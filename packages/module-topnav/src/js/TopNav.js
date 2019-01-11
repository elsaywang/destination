import { getUserRolesPromise, isIMSUser } from '@aam/aam-userroles';
import { addBreadcrumbClickHandler, getSelectedWorkSpaceKey, getWorkspaceHTML } from './nav.utils';
import { navConfig } from './nav.config';
import { SubNav } from './SubNav';
import { fetchIMSConfig, initIMSFeatures, initNonIMSFeatures } from './TopNav.IMS';

const initTopNav = () => {
    getUserRolesPromise()
        .then(() => {
            if(isIMSUser()) {
                fetchIMSConfig().then((resp) => {
                    initIMSFeatures(resp.data);
                    new TopNav();
                });
            } else {
                initNonIMSFeatures();
                new TopNav();
            }
        });
}

const setActiveWorkspace = (key, workspaces) => {
    const allWorkspaces = Array.from(
        workspaces || document.querySelector('coral-shell-workspaces').children,
    );
    const selectedWorkspace = allWorkspaces.filter(ws => ws.dataset.configKey === key);

    if (selectedWorkspace && selectedWorkspace.length) {
        selectedWorkspace[0].setAttribute('selected', true);
    }
};

const setActiveWorkspaceAndBindBreakcrumbClick = (key, ws) => {
    setActiveWorkspace(key, ws);
    addBreadcrumbClickHandler();
};

class TopNav {
    constructor(parentNodeSelector = 'coral-shell-header-content') {
        const parentNode = document.querySelector(parentNodeSelector);
        const coralWorkspaces = document.createElement('coral-shell-workspaces');

        coralWorkspaces.innerHTML = Object.keys(navConfig).reduce(
            (str, key) => str + getWorkspaceHTML(navConfig[key], key),
            '',
        );
        const dropTargets = coralWorkspaces.querySelectorAll('.drop-target');

        coralWorkspaces.childElementCount &&
            Array.from(coralWorkspaces.children).forEach(target => {
                target.addEventListener('mouseenter', this.handleEnter);
            });
        setActiveWorkspaceAndBindBreakcrumbClick(
            getSelectedWorkSpaceKey(window.location.href),
            coralWorkspaces.children,
        );

        dropTargets.length &&
            Array.from(dropTargets).forEach(target => {
                target.addEventListener('mouseleave', this.handleLeave);
                target.parentNode.replaceChild(target, target);
                target.addEventListener('click', e => e.preventDefault());
            });

        parentNode && parentNode.appendChild(coralWorkspaces);
    }

    handleEnter = e => {
        const workspace = e.currentTarget;
        const isDropTarget = workspace.classList.contains('drop-target');
        const dropZone = document.querySelector('.drop-zone');
        const subNav = new SubNav({
            menuConfig: navConfig[workspace.dataset.configKey],
            workspace,
        });

        if (!isDropTarget || !subNav.anchorList.childElementCount) {
            // dashboard or sub nav is empty
            return subNav && subNav.anchorList.hide();
        }

        workspace.classList.add('trigger-enter', 'trigger-enter-active');
        dropZone.appendChild(subNav.anchorList);
    };

    handleLeave = e => {
        const workspace = e.currentTarget;

        setTimeout(() => {
            const list = document.querySelector('.subNav-anchorlist:not(.open-active)');

            workspace.classList.remove('trigger-enter', 'trigger-enter-active');
            list && list.hide();
        });
    };
}

export { TopNav, setActiveWorkspaceAndBindBreakcrumbClick, initTopNav };
