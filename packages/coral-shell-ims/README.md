# AAM coral-shell-ims build and deploy process
This is AAM's fork of [Tartan's coral-shell-ims](https://git.corp.adobe.com/Tartan/coral-shell-ims.git) repo. Below is the steps to set up, update/re-sync, and build this library for AAM.

1. ##### Clone this repo to your machine:
    ```
    $ git clone git@git.corp.adobe.com:AAM/coral-shell-ims.git
    ```

2. ##### Set Tartan repo as a `upstream`:
    ```
    // Inside your local coral-shell-ims folder
    $ git remote add upstream git@git.corp.adobe.com:Tartan/coral-shell-ims.git
    ```
    Once this is done, you should have this AAM/coral-shell-ims repo as a remote `origin`, and the Tartan/coral-shell-ims repo as a remote `upstream`, to double check:
    ```
    $ git remote show origin
    // Fetch/Push URL being: git@git.corp.adobe.com:AAM/coral-shell-ims.git
    $ git remote show upstream
    // Fetch/Push URL being: git@git.corp.adobe.com:Tartan/coral-shell-ims.git
    ```

3. ##### Sync `master` with Tartan:
    ```
    // In your local copy
    $ git checkout master // If you're not on `master`
    $ git pull --rebase upstream master
    ```
    This will sync your local `master` branch with Tartan's master branch, then:
    ```
    $ git push origin master
    ```
    To update this repo with what you just got from Tartan.

4. ##### For Deployment:
    - Make sure you have the following Artifactory links in either local or global `.npmrc`:

    ```
        @spectrum:registry=https://artifactory.corp.adobe.com/artifactory/api/npm/npm-spectrum-snapshot-local
        @coralui:registry=https://artifactory.corp.adobe.com:443/artifactory/api/npm/npm-coralui-release
    ```

    - Branching and Versioning and Releases

        1. Development work should **branch off from the last release branch, instead of `master`**.
        2. Name your branch using the version that is appropriate for your work, following the practice of [Sematic Versioning](https://semver.org/)
            for the most part, with these conditions:

                1. Major Version - When Tartan introduced a breaking change
                2. Minor Version - When you added a new Coral component(s)
                3. Patch Version
                    - When a non-breaking update from Tartan is introduced,
                        ie. a regular sync from Tartan
                    - When you patched something in the last release

        3. Once your branch is tested locally, you may **create a pre-release** with the head of your branch
        4. In AAM Portal, create a corresponding feature branch to pull in the pre-release that you created
        5. Have QE test and sign off your portal branch, then mark your pre-release as a regular release

----

# coral-shell-ims
TO NOTE: THIS CODE IS MEANT ONLY AS A REFERENCE TO IMPLEMENT SHELL. 
See the [functional example here](https://git.corp.adobe.com/pages/Tartan/coral-shell-ims/).

The intent is to create a top level wrapper component ```<coral-shell-ims>``` for Coral-Shell which integrates with IMS and fetches user's profile, organization details, product contexts etc and render the shell components accordingly.

The endpoints which this component interacts with have been externalized, so that they can be replaced with whatever is needed. For example, Analytics & Social have to support Non-IMS User logins with the Shell, so they could replace the IMS endpoints with their own and as long as those endpoints obey the same contract as of IMS, the shell would be able to fetch data from them.

The markup may look like the following if you want to Integrate with IMS-Stage environment.

```
<coral-shell-ims class="shellContainer"
  clientid="MarketingCloud11_qa"
  organizationsendpoint="https://ims-na1-stg1.adobelogin.com/ims/organizations/v1"
  profileendpoint="https://ims-na1-stg1.adobelogin.com/ims/profile/v1"
  logoutendpoint="https://ims-na1-stg1.adobelogin.com/ims/logout/v1"
  logoutredirecturl="http://git.corp.adobe.com/pages/amangal/examples/coral-shell-ims/"
  profileredirecturl=""
  manageorgurl=""
  avatarendpoint="https://adobeid-na1-stg1.services.adobe.com/ims/avatar/download/{userId}?size=small"
  setactiveorgendpoint="https://<tenantId>.marketing-qa.corp.adobe.com/content/mac/default/header.setActiveOrg.json"
  setactivepcendpoint="https://<tenantId>.marketing-qa.corp.adobe.com/content/mac/default/header.setActivePC.json"
  imsuser="true">
```

The configurable endpoints are explained below:

* ```organizationsendpoint``` --- Endpoint to fetch Organizations data for a user. For IMS we use this API - https://wiki.corp.adobe.com/display/ims/IMS+API+-+organizations
* ```profileendpoint``` --- Endpoint to fetch Profile Data for a user. This also includes the product contexts information. For IMS, we use https://wiki.corp.adobe.com/display/ims/IMS+API+-+profile
* ```logoutendpoint``` --- Endpoint to log out the user. For IMS it is https://wiki.corp.adobe.com/display/ims/IMS+API+-+logout
* ```logoutredirecturl``` --- Where to redirect the user after the user has been logout
* ```profileredirecturl``` --- Where to take the user on click of Profile button in the User dropdown
* ```manageorgurl``` --- Where to redirect user on clicking Manage Organizations button in the Org Swticher
* ```avatarendpoint``` --- URL to get avatar of the logged in user.
* ```setactiveorgendpoint``` --- Sets the Active Organization in IMS. Since IMS does not provide CORS support for this API, so we need a proxy server using which we can do this. MAC Platform provides one such endpoint
* ```setactivepcendpoint``` --- Sets the Active Product Context for the User in IMS
* ```imsuser``` --- Boolean flag to denote whether the user is IMS user or not.
* ```clientid``` --- Client Id. Required by IMS APIs. This is application specific. For a Non-IMS User, needs to be evaluated whether such an identifier is needed or not.

Apart from the above configurations in the markup, the ```<coral-shell-ims>``` also needs to be provided certain properties when a user logs in

* ```accesstoken``` -- The Access Token of the Currently Logged in User
* ```imssessionurl``` -- the IMS Session URL. Used only for IMS users, it can be fetched from user profile data

The Solution Switcher shows all the Solutions and Core Services. The Solutions/Core Services on which the user has access are shown with Colored Icons, while others are shown using MonoChrome icons. Whether a user has access on a particular Solution or Core Service is decided using User's Product Context. Some of Core services are marked as ```default``` meaning everyone has access on it. This information about all the Solutions and Core Services depends on the environment ( Dev/QA/Stage/Prod etc ) should be kept in every solution as a Configuration and provided to the Shell using ```allproducts```  and ```allservices``` The configuration for this instance of the shell can be found at https://git.corp.adobe.com/amangal/coral-shell-ims/blob/master/examples/resources/config/config_qa.json

**Do not use NPM 3.x to install. Instead, use NPM 2.14.12 and Node 0.12.9**. ( As of now, This is true for all the Coral3 components not just for Shell )

Below are some references and documentation that may be helpful when implementing Shell with IMS...
* [Shell 3.0 Design Spec](https://wiki.corp.adobe.com/display/CloudUI/Shell+3.0)
* [Shell 3.0 Project](https://wiki.corp.adobe.com/display/marketingcloud/Shell+3.0)
* [Shell 3.0 FAQ](https://wiki.corp.adobe.com/display/marketingcloud/Shell+3.0+FAQ)
* [IMS Intrgration Guide](https://wiki.corp.adobe.com/display/ims/IMS+Integration+Guide)
* [IMS API Token](https://wiki.corp.adobe.com/display/ims/IMS+API+-+token)
* [IMS Hosts](https://wiki.corp.adobe.com/display/ims/IMS+Hosting)
* [IMS Endpoints](https://wiki.corp.adobe.com/display/ims/Endpoints+Index)
* [Pulse API Docs](https://wiki.corp.adobe.com/display/marketingcloud/Pulse+API+Specifications)
* [Help API Docs](https://wiki.corp.adobe.com/display/techpubs/Help+Menu+in+Unified+Marketing+Cloud+UI)
