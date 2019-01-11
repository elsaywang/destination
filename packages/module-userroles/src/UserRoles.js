import 'whatwg-fetch';

let roles = [];
let userInfo = {};
let fetching = false;
const toBeResolved = [];
const toBeRejected = [];
const url = '/portal/api/v1/users/self?includeAllUserRoles=true';
const parseJSON = response =>
    response.json().then(json => ({
        ok: response.ok,
        data: json,
        status: response.status
    }));
const csrfToken = document.querySelector('meta[name="_tk"]');
const params = {
    'AAM-CSRF-Token': csrfToken ? csrfToken.content : window.csrfToken,
    'Content-type': 'application/json'
};

function fetchUserRoles() {
    fetching = true;

    return fetch(url, {
        headers: params,
        credentials: 'same-origin'
    })
        .then(parseJSON)
        .then(json => {
            userInfo = json.ok ? json.data : {};
            roles = json.ok ? json.data.userRoles : [];
            const isPromiseQueueEmpty = toBeResolved.length === 0;

            if (isPromiseQueueEmpty) {
                json.ok ? Promise.resolve(roles) : Promise.reject(json);
            } else {
                json.ok
                    ? toBeResolved.forEach(resolve => resolve(roles))
                    : toBeRejected.forEach(reject => reject(json));
            }
        });
}

const getUserRolesPromise = () => {
    if (roles.length) {
        return Promise.resolve(roles);
    }

    if (fetching) {
        return new Promise((resolve, reject) => {
            toBeResolved.push(resolve);
            toBeRejected.push(reject);
        });
    }

    return fetchUserRoles();
};

const getUserRoles = () => roles;

const getUserInfo = () => userInfo;

const isIMSUser = () => userInfo.authSystem === 'ims';

const hasAllRoles = (requiredRoles, userRoles = roles) =>
    requiredRoles.every(role => userRoles.includes(role));

const hasSomeRoles = (requiredRoles, userRoles = roles) =>
    requiredRoles.some(role => userRoles.includes(role));

export {
    getUserRolesPromise,
    getUserRoles,
    hasSomeRoles,
    hasAllRoles,
    getUserInfo,
    isIMSUser
};
