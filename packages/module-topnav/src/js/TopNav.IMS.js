import 'whatwg-fetch';
import { getUserInfo, isIMSUser } from '@aam/aam-userroles';

const configEndpoint = '/portal/api/v1/configs';
const logoutEndpoint = '/portal/login/Logout.ddx';
const csrfMetaTag = document.querySelector('meta[name="_tk"]');
const parseJSON = response =>
    response.json().then(json => ({
        ok: response.ok,
        data: json,
        status: response.status
    }));
const fetchHeader = {
   'AAM-CSRF-Token': csrfMetaTag ? csrfMetaTag.content : window.csrfToken,
   'Content-type':'application/json'
};

const fetchParams = {
    headers: fetchHeader,
    credentials: 'same-origin'
};

const fetchIMSConfig = () => (fetch(configEndpoint, fetchParams).then(parseJSON));

const composeShellIMSConfig = (userInfo, globalIMSInfo) => {
    const { experienceCloudConfiguration, imsConfiguration } = globalIMSInfo || {};
    const colon2Slashes = '://';
    const fullUrl = isIMSUser() ? experienceCloudConfiguration.url : '';
    const marketingAdobeDomain = isIMSUser() ? fullUrl.substr(fullUrl.indexOf(colon2Slashes) + colon2Slashes.length) : '';

    return Object.assign({},
        isIMSUser() ? {
            jsonconfig: `${experienceCloudConfiguration.cdn}/v2/en-us/latest.json`,
            clientid: imsConfiguration.clientId,
            organizationsendpoint: `https://${imsConfiguration.host}/ims/organizations/v1`,
            profileendpoint: `https://${imsConfiguration.host}/ims/profile/v1`,
            logoutendpoint: `https://${imsConfiguration.host}/ims/logout/v1`,
            logoutredirecturl: `${imsConfiguration.redirectUrl}`,
            profileredirecturl: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/tools/profile.html`,
            manageorgurl: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/orgs.html`,
            avatarendpoint: `https://${imsConfiguration.host}/ims/avatar/download/{userId}?size=small`,
            setactiveorgendpoint: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/header.setActiveOrg.json`,
            setactivepcendpoint: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/header.setActivePC.json`,
            pulseendpoint: `${imsConfiguration.pulseEndpoint}`,
            marketingcloudendpoint: `https://<tenantId>.${marketingAdobeDomain}`,
            getlinkendpoint: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/tools/accountslinking/jcr:content.{productId}.getLink.json?orgId={orgId}&companyName={companyName}&fromProfile=false`,
            loginendpoint: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/tools/accountslinking/jcr:content.{productId}.login.json`,
            linkendpoint: `https://<tenantId>.${marketingAdobeDomain}/content/mac/default/tools/accountslinking/jcr:content.{productId}.link.json`,
            apiKey: imsConfiguration.clientId,
            imssessionurl: userInfo.imsSessionUrl,
            accesstoken: userInfo.imsAccessToken
        } : {},
        {
            imsuser: `${isIMSUser()}`,
            troubleLink: `https://marketing.adobe.com/resources/help/en_US/mcloud/link_accounts.html`,
        });
    };

const assignIMSConfig = (shellIMSConfig) => {
    const shell = document.querySelector('coral-shell-ims');

    Object.entries(shellIMSConfig).forEach(([key, val]) => {
        val && shell.setAttribute(key, val);
    });
}

const appendMenubarItems = () => {
    appendOrgSwitcherMenubarItem();
    appendPulseMenubarItem();
    appendSolutionSwitcherMenubarItem();
};

const appendOrgSwitcherMenubarItem = () => {
    const helpBtn = document.querySelector('coral-shell-menubar-item[menu="#menu_help"]');
    const orgSwitcherBtn = new Coral.Shell.MenuBar.Item();

    Object.entries({
        class: 'coral-Shell-menubar-item',
        'coral-shell-ims-menu-organizations': '',
        menu: '#menu_organizations'
    }).forEach(([key, val]) => orgSwitcherBtn.setAttribute(key, val));

    helpBtn.parentNode.insertBefore(orgSwitcherBtn, helpBtn);
};

const appendPulseMenubarItem = () => {
    const userBtn = document.querySelector('coral-shell-menubar-item[menu="#menu_user"]');
    const pulseBtn = new Coral.Shell.MenuBar.Item();

    Object.entries({
        class: 'coral-Shell-menubar-item',
        'coral-shell-ims-menu-notifications': '',
        icon: 'bell',
        menu: '#menu_pulse'
    }).forEach(([key, val]) => pulseBtn.setAttribute(key, val));

    userBtn.parentNode.insertBefore(pulseBtn, userBtn);
};

const appendSolutionSwitcherMenubarItem = () => {
    const pulseBtn = document.querySelector('coral-shell-menubar-item[menu="#menu_pulse"]');
    const solutionSwitcherBtn = new Coral.Shell.MenuBar.Item();

    Object.entries({
        class: 'coral-Shell-menubar-item',
        'coral-shell-ims-menu-solutions': '',
        icon: 'apps',
        menu: '#menu_solutions'
    }).forEach(([key, val]) => solutionSwitcherBtn.setAttribute(key, val));

    pulseBtn.parentNode.insertBefore(solutionSwitcherBtn, pulseBtn);
};

const fillUserInfo = (userInfo) => {
    const userMenu = document.querySelector('coral-Shell-user');
    const { firstName, lastName, title, companyName } = userInfo;

    userMenu.name.innerHTML = `${firstName || ''} ${lastName || ''}`;
    userMenu.heading.innerHTML = title || '';
    userMenu.subheading.innerHTML = companyName;
};

const setUserMenuLinks = (isIMSUser) => {
    const userFooterLinks = document.querySelectorAll('coral-shell-user-footer [is="coral-anchorbutton"]');

    const hrefs = {
        editProfile: isIMSUser
            ? '#profile'
            : '/portal/Account/Partners/EditMyProfileDynamic.ddx',
        signOut: isIMSUser
            ? '#signout'
            : '/portal/j_spring_security_logout'
    };

    userFooterLinks.forEach((node, index) => {
        node.setAttribute('href', Object.values(hrefs)[index]);
    });
};

const initIMSFeatures = (imsConfig) => {
    const userInfo = getUserInfo();
    const shellIMSConfig = composeShellIMSConfig(userInfo, imsConfig);

    assignIMSConfig(shellIMSConfig);
    appendMenubarItems();
    bindOrgSwitcherEventListener(imsConfig.experienceCloudConfiguration.url, logoutEndpoint);
    setUserMenuLinks(isIMSUser());
    fillUserInfo(userInfo);
};

const initNonIMSFeatures = () => {
    const userInfo = getUserInfo();
    const shellConfig = composeShellIMSConfig(userInfo);

    assignIMSConfig(shellConfig);
    setUserMenuLinks();
    fillUserInfo(userInfo);
};

const showErrorModal = () => {
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

const redirectTo = (url) => () => window.location.href = url;

const onOrgChangeDone = (experienceCloudUrl, logoutEndpoint) => () => fetch(logoutEndpoint)
   .then(redirectTo(experienceCloudUrl))
   .catch(showErrorModal); 

const bindOrgSwitcherEventListener = (experienceCloudUrl = '', logoutEndpoint) => {
    document.addEventListener('coral-shell-orgswitcher:change:done', onOrgChangeDone(experienceCloudUrl, logoutEndpoint)); 
    document.addEventListener('coral-shell-orgswitcher:change:fail', showErrorModal);
};

export {
    fetchIMSConfig,
    setUserMenuLinks,
    initIMSFeatures,
    initNonIMSFeatures,
    fillUserInfo
};