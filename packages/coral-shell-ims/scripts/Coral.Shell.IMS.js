/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2015 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
 (function($, window, undefined) {
  'use strict';

  /**
  Outer component hits APIs, listens to events, and call APIs of sub-components.
  Attributes are added to elements of interest so they can be found easily (vs querying by tagname).
  Special attributes:
    * [coral-shell-ims-menu-organizations] - The menu item that has the current organization's name. The label will be set to reflect the current organization.
    * [coral-shell-ims-menu-notifications] - The menu item that has the notifications icon. The badge attribute will be set to reflect the number of notifications. This information can be gathered from the pulse component.
    * [coral-shell-ims-marketing-cloud] - The subcloud for marketing cloud. These will be populated on login and when organizations are switched.
    * [coral-shell-ims-advertising-cloud] - The subcloud for advertising cloud. These will be populated on login and when organizations are switched.
    * [coral-shell-ims-analytics-cloud] - The subcloud for analytics cloud. These will be populated on login and when organizations are switched.
    * [coral-shell-ims-services] - The list containing services (secondary products). These will be populated on login and when organizations are switched.
    * [coral-shell-ims-help] - The help component. Its events will be listened to and its API will be used to populate results when a search is performed (see coral-shell-help's examples).
    * [coral-shell-img-orgswitcher] - The orgswitcher comopnent.  Its events will be listened to and its API will be used to populate organizations on login.
    * [coral-shell-ims-pulse] - The pulse component. Its events will be listened to in order to populate the badge attribute on the corresponding menu item.
    * [coral-shell-ims-user] - The user component. Its content will be populated on login.
    **/
    Coral.register( /** @lends Coral.Shell.IMS */ {
    /**
      @class Coral.Shell.IMS
      @classdesc The outer shell component
      @extends Coral.Component
      */
      name: 'Shell.IMS',
      tagName: 'coral-shell-ims',
      className: 'coral-Shell-IMS',

      events: {
        'click a[is="coral-anchorbutton"][href="#signout"]':'_signOutHandler',
        'click a[is="coral-anchorbutton"][href="#profile"]':'_onProfileLinkClick',
        'click coral-shell-orgswitcher-footer a[href="#manageorgs"]':'_onManageOrgClick',
        'coral-shell-orgswitcher:change':'_onOrgSwitch',
        'click coral-shell-menubar-item[menu="#menu_pulse"]': '_togglePulseView',
        'coral-shell-help:search': '_searchHelp',
        'click a[is="coral-shell-solution"]':'_onSolutionClick',
        'click button.learnMore':'_onLearnMoreClick',
        'click button.linkAccount':'_onLinkAccountClick'
      },

      properties: {
        'clientid': {
        },
        'accesstoken':{
          validate: function(value){
            return value !== null && typeof value === 'string' && value.length > 0;
          },
          sync: function(){
            var that = this;
          // Get User Profile & Solutions Data
          var fetchUserProfile = this.getUserProfile();
          // Get User Organizations
          var fetchUserOrganizations = that.getUserOrganizations();
          // Get JSON Config
          var fetchHostedConfig = this.getJSONConfig();
          $.when( fetchUserProfile, fetchUserOrganizations, fetchHostedConfig )
          .done( function( userProfile, orgData , hostedConfig){

            that.allclouds = hostedConfig[0].clouds;
            that.allservices = hostedConfig[0].services;

            var profileData = userProfile[0];
            that._userProfile = profileData;
            var userOrgs = orgData[0];
            that.populateUserDetails(profileData);
            that.projectedProductContext = profileData.projectedProductContext;

            // Get Active IMS Org
            var activeOrgId;
            that.getActiveOrgId()
            .done(function(data){
              if(!$.isEmptyObject(data)){
                if(data['session_data'] && data['session_data']['current_active_org']){
                  var activeOrgDetails = data['session_data']['current_active_org'];
                  activeOrgId = activeOrgDetails['org_id']+'@'+activeOrgDetails['org_auth_src'];
                }
                else{
                  activeOrgId = data; // Active Org returned from Request Param
                }
              }
              else{
                if(userOrgs.orgs){
                  // Get First Org as Active Org
                  var org = userOrgs.orgs[0];
                  activeOrgId = org.orgRef.ident + '@' + org.orgRef.authSrc;
                }
              }
              // Save the state for later use
              that._activeOrgId = activeOrgId;
              var activeTenantId = that._getTenantIdForOrg(activeOrgId);
              that._activeTenantId = activeTenantId;

              that.populateSolutionSwitcher();
              that.populateOrganizationDetails(userOrgs.orgs);

              // Initialize Pulse and Fetch User Notifications
              if(Coral.Pulse){

                Coral.Pulse.core.initialize({
                  'accessToken': that.accesstoken,
                  'imsUserId': profileData.userId,
                  'imsOrgId': that._activeOrgId,
                  'pulseEndpoint': that.pulseendpoint,
                  'avatarEndpoint': that.avatarendpoint,
                  'marketingCloudEndpoint': that.marketingcloudendpoint,
                  'pulseMenuHandle':'coral-shell-menubar-item[menu="#menu_pulse"]',
                  'apiKey': that.apiKey
                });
              }

            });
          })
          .fail(function(err){
            console.log('error in fetching user info ',err);
          });
        }
      },
      'organizationsendpoint':{
      },
      'profileendpoint':{
      },
      'jsonconfig':{
      },
      'logoutendpoint':{
      },
      'logoutredirecturl':{
      },
      'profileredirecturl':{
      },
      'manageorgurl':{
      },
      'avatarendpoint':{
      },
      'setactiveorgendpoint':{
      },
      'setactivepcendpoint':{
      },
      'imsuser':{
      },
      'imssessionurl':{
      },
      'pulseendpoint':{
      },
      'marketingcloudendpoint':{
      },
      'getlinkendpoint':{
      },
      'troubleLink':{
      },
      'loginendpoint':{
      },
      'linkendpoint':{
      },
      'apiKey':{
      }
    },

    _togglePulseView: function(event){
      // Removing Focus from Text Input
      this.querySelector('pulse-widget pulse-notifications-list').focus();
      // Initial Call to Get Notifications
      Coral.Pulse.core.getUserNotifications(true);
    },

    _searchHelp: function(event){

      // Get the search term from the event detail
      var searchTerm = event.detail.value;
      // Request results
      var xhr = $.ajax(this.getHelpAPIEndpoint(), {
        dataType: 'jsonp',
        timeout: 10000,
        data: {
          tmpl: 'help',
          q: searchTerm
        }
      });

      var help = this.querySelector('coral-shell-help');
      xhr.then(
        function(response) {
          var results = response.results;
          // Clear existing results
          help._elements.results.innerHTML = '';
          // Populate results
          var resultItems = results.map(function(result) {
            return {
              tags: result.t0.split(/,\s*/),
              title: result.title,
              href: result.href
            };
          });
          // Show total
          var total = parseInt(response.resultcount.total, 10);
          if (total === 0) {
            help.showNoResults();
          }
          else {
            var helpSiteURL = 'https://marketing.adobe.com/resources/help/en_US/home/';
            help.showResults(resultItems, total, helpSiteURL+'?q='+encodeURIComponent(searchTerm));
          }
        },
        function(jqXHR, textStatus) {
          help.showError();
        }
        );

    },

    // Search in Help
    // Get the API endpoint based on locale
    getHelpAPIEndpoint: function(locale){
      switch(locale) {
        case 'de_DE':
        return 'https://sp10050568.guided.ss-omtrdc.net/';
        case 'es_ES':
        return 'https://sp10050569.guided.ss-omtrdc.net/';
        case 'fr_FR':
        return 'https://sp1005056a.guided.ss-omtrdc.net/';
        case 'ja_JP':
        return 'https://sp1005056d.guided.ss-omtrdc.net/';
        case 'ko_KR':
        return 'https://sp1005056e.guided.ss-omtrdc.net/';
        case 'pt_BR':
        return 'https://sp1005056b.guided.ss-omtrdc.net/';
        case 'zh_CN':
        return 'https://sp1005056f.guided.ss-omtrdc.net/';
        case 'zh_TW':
        return 'https://sp1004f0bc.guided.ss-omtrdc.net/';
      default: // en_US
      return 'https://sp1004ced0.guided.ss-omtrdc.net/';
    }
  },

    /**
    * Get Active Org from Query Parameter
    * If not, then Get Active IMS Org for IMS Users
    * Else get the first org ?
    * Returns a Promise / Deferred Object which can be listened for resolving events
    **/
    getActiveOrgId: function(){
      var activeOrgId=null;
      var dfd = $.Deferred();

      activeOrgId = this.getRequestParameter('activeOrgId');
      if(activeOrgId!==null){
        dfd.resolve(activeOrgId);
      }
      // Get from IMS
      else if(this.imsuser){
        return this.getIMSSessionData();
      }
      dfd.resolve(null);

      return dfd;
    },

    /**
    * Get IMS Session Data
    **/
    getIMSSessionData: function(){
      var params = {
        'client_id': this.clientid,
        'bearer_token': this.accesstoken
      };
      return this._createJSONPRequest(this.imssessionurl, params);
    },

    /**
    * Read value of Request Parameter
    **/
    getRequestParameter: function(paramName){
      if(paramName=(new RegExp('[?&]'+encodeURIComponent(paramName)+'=([^&]*)')).exec(location.search)){
        return decodeURIComponent(paramName[1]);
      }
      return null;
    },

    /**
    Creates a JSONP Request
    Only GET is supported.
    Returns the promise
    **/
    _createJSONPRequest: function(url, params, contentType){
      contentType = contentType || 'application/x-www-form-urlencoded; charset=UTF-8';

      return $.ajax({
        method: 'GET',
        url: url,
        dataType: 'jsonp',
        data: params,
        contentType: contentType
      });
    },

    /***
    Creates a CORS request with the given parameters
    Returns a Promise which could be used to specify success or error handlers
    by the calling function
    */
    _makeCORSRequest: function(url, method, params, headers, dataType, contentType) {

      method = method.toUpperCase();
      if(method !== 'GET' && method !== 'POST'){
        return $.Deferred().reject('invalid method');
      }
      contentType = contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
      headers = headers || {};
      dataType = dataType || 'json';
      // Stringify params or convert params ?

      return $.ajax({
        type: method,
        method: method,
        url: url,
        headers: headers,
        contentType: contentType,
        data: params,
        xhrFields: {
          withCredentials: true
        }
      });
    },

    /** @ignore */
    setActivePC: function() {
      var setActivePCUrl = this.setactivepcendpoint;
      console.log(setActivePCUrl);
    },

    /** @ignore */
    getUserAvatarUrl: function(userID) {
      return this.avatarendpoint.replace('{userId}',userID);
    },

    /** @ignore */
    getUserProfile: function(){
      var params = {
        'bearer_token': this.accesstoken
      };
      return this._createJSONPRequest(this.profileendpoint, params);
    },

    /** @ignore */
    getJSONConfig: function(){
      return $.ajax({
        url: this.jsonconfig,
        method: 'GET'
      });
    },

    /** @ignore */
    getUserOrganizations: function() {
      var params = {
        'client_id' : this.clientid,
        'bearer_token': this.accesstoken
      };
      return this._createJSONPRequest(this.organizationsendpoint, params);
    },

    /** @ignore */
    _signOutHandler: function(event) {
      event.stopPropagation();
      if(!this._isEmptyString(this.logoutendpoint)){
        this.logoutendpoint += '?client_id='+this.clientid+'&access_token='+this.accesstoken;

        if(!this._isEmptyString(this.logoutredirecturl)){
          this.logoutendpoint += '&redirect_uri='+this.logoutredirecturl;
        }
        document.location = this.logoutendpoint;
      }
    },

    /** @ignore */
    _onProfileLinkClick: function(event) {
      event.stopPropagation();
      if(!this._isEmptyString(this.profileredirecturl)){
        document.location = this.profileredirecturl.replace('<tenantId>', this._activeTenantId);
      }
    },

    /** @ignore */
    _onManageOrgClick: function(event) {
      event.stopPropagation();
      if(!this._isEmptyString(this.manageorgurl)){
        document.location = this.manageorgurl.replace('<tenantId>', this._activeTenantId);
      }
    },

    //-----------------------------------------  UI Methods --------------------------------------------------

    /***
    * Populate the User PopOver
    */
    populateUserDetails: function(userProfile) {
      var user = this.querySelector('coral-shell-user');
      user.name.innerHTML= userProfile.displayName;
      user.avatar = this.getUserAvatarUrl(userProfile.userId);
    },

    /***
    * Populate the User Company in User PopOver
    * Refactored so that it can be called on Org Switching as well
    */
    updateUserCompany: function(companyName) {
      var user = this.querySelector('coral-shell-user');
      user.subheading.innerHTML= companyName;
    },


    /***
    * Populate the Organizations Data in Org Switcher
    */
    populateOrganizationDetails: function(orgData) {

      var orgSwitcher = this.querySelector('coral-shell-orgswitcher');
      if(orgSwitcher.hasAttribute('coral-shell-ims-orgswitcher')){
        var activeOrgName;
        var that = this;
        $(orgData).each(function(index, value) {

          var item = new Coral.Shell.Organization().set({
            'name':value.orgName
          });
          item.content = new Coral.List.Item.Content().set({
            innerHTML : value.orgName
          });
          item.setAttribute('data-org-id', value.orgRef.ident);
          item.setAttribute('data-org-auth-src', value.orgRef.authSrc);
          var imsOrgId = value.orgRef.ident+'@'+value.orgRef.authSrc;
          var tenantId = that._getTenantIdForOrg(imsOrgId);
          item.setAttribute('data-tenant-id', tenantId);

          if(that._activeOrgId === imsOrgId){
            // Mark the org as selected
            item.set({
              'selected': true
            });
            activeOrgName = value.orgName;
          }

          orgSwitcher.items.add(item);
        });
        this.setActiveOrg(this._activeOrgId, activeOrgName, this._activeTenantId);
      }
    },

    /**
    * Sets the Active Org Id in IMS using MAC exposed endpoit
    * Updates the UI to reflect the Active Org Name
    **/
    setActiveOrg: function(activeOrgId, activeOrgName, activeTenantId){

      // Update the UI
      this.setActiveOrgNameinMenu(activeOrgName);

      // Update the Active IMS Org using MAC Endpoint
      var setActiveOrgUrl = this.setactiveorgendpoint.replace('<tenantId>',activeTenantId);
      var headers = {'Authorization': 'Bearer '+this.accesstoken};
      var params = {
        'ims': 1,
        'orgId': activeOrgId
      };
      return this._makeCORSRequest(setActiveOrgUrl, 'POST', params, headers)
      .done(function(data){
        console.log('Active Org Set',data);
      })
      .fail(function(err){
        console.log('Error in Setting Active Org ',err);
      });
    },

    /***
    * Sets the Active Org Name in Coral-Shell-MenuBar in the top header
    * Refactored so that it can be called on Org Switching as well
    */
    setActiveOrgNameinMenu: function(activeOrgName) {
      this._activeOrgName = activeOrgName;
      var orgMenu = document.querySelector('coral-shell-menubar coral-shell-menubar-item[menu="#menu_organizations"]');
      if(orgMenu.hasAttribute('coral-shell-ims-menu-organizations')){
        //Coral.Button.Label is no longer a Coral component as of version 1.6.3, set() function does not exist for it!
        //orgMenu.label = new Coral.Button.Label().set({innerHTML: activeOrgName});
        var button = orgMenu.querySelector('button');
        button.set({label: {innerHTML: activeOrgName}});
        this.updateUserCompany(activeOrgName);
      }
    },

    /** @ignore */
    getIconForSolution: function(icon, hasAccess) {
      return hasAccess?icon+'Color':icon;
    },

    /** @ignore */
    _onLearnMoreClick: function(event) {
      window.open(event.currentTarget.getAttribute('data-learn-more-url'),'_blank');
      document.getElementById('prodInfo').remove();
    },

    /** @ignore */
    _onSolutionClick: function(event) {
      event.stopPropagation();
      event.preventDefault();

      var solutionLink = event.target;
      if(solutionLink.tagName!=='A') {
        solutionLink = solutionLink.parentElement;
      }
      var solution = solutionLink.getAttribute('data-servicecode');
      var hasAccess = solutionLink.getAttribute('data-has-access');
      var isCoreService = solutionLink.getAttribute('data-is-core-service');
      this._showWait(document.getElementById('menu_solutions'),'L');
      this._initLinkInfo(hasAccess,solution,isCoreService);
    },

    /** @ignore */
    _initLinkInfo : function(hasAccess, name, isCoreService) {
      var solutionData;
      if(isCoreService) {
        solutionData = this._getCoreService(name);
      } else {
        solutionData = this._getProduct(name);
      }
      var solname = solutionData['longname'];
      if(!solname) {
        solname = solutionData['name'];
      }
      var description = solutionData['description'];
      var learnMoreUrl = solutionData['learnmorelink'];
      var productId = solutionData['macid'];
      var solutionUrl = solutionData['href'];
      var direct = solutionData['direct'];
      var forPC = solutionData['forPC'];
      if(direct === 'true' && ((!(forPC) && isCoreService === 'true') || hasAccess === 'true')) {
        window.location = this._getLaunchURL(solutionUrl, solutionData['name'] );
        return;
      }

      if(hasAccess === 'true') {
        window.location = this._getLaunchURL(solutionUrl, solutionData['name']);
      } else {
        this._showLinkDialog(false,solname,description,learnMoreUrl,productId,name);
        this._removeWait(document.getElementById('menu_solutions'));
      }
    },

    /** @ignore */
    _showErrorDialog : function(message) {
      var errorDialog = new Coral.Dialog();
      errorDialog.className += ' onTop';
      errorDialog.variant = 'error';
      errorDialog.header.innerHTML = 'Error';
      errorDialog.content.innerHTML = message;
      var button = new Coral.Button();
      button.variant = 'primary';
      button.setAttribute('coral-close','');
      button.innerHTML = 'OK';
      errorDialog.footer.appendChild(button);
      errorDialog.show();
    },

    /** @ignore */
    _getCoreService : function(serviceName) {
      var serviceIndex;
      for(serviceIndex=0; serviceIndex<this.allservices.length; serviceIndex++) {
        if(this.allservices[serviceIndex].name === serviceName) {
          return this.allservices[serviceIndex];
        }
      }
      return null;
    },

    _getProduct: function(productName) {
     for (var i = 0; i < this.allclouds.length; i++) {
       for (var key in this.allclouds[i].solutions) {
         if (key === productName) {
           return this.allclouds[i].solutions[key];
         }
       }
     }
     return null;
   },

   /** @ignore */
   _showWait : function (parent,size){
    var waitDiv = document.createElement('div');
    waitDiv.className += 'waitDivContainer';
    var wait = new Coral.Wait();
    wait.size=size;
    wait.className += ' waitDiv';
    waitDiv.appendChild(wait);
    parent.appendChild(waitDiv);
  },

  /** @ignore */
  _removeWait : function (parent){
    var waitElement = parent.querySelector('.waitDivContainer');
    if(waitElement) {
      waitElement.remove();
    }
  },

  /** @ignore */
  _getGetLinkEndPoint : function(productId, companyName) {
    return this.getlinkendpoint.replace('{productId}',productId).replace('<tenantId>',this._activeTenantId).replace('{orgId}',this._activeOrgId).replace('{companyName}',companyName);
  },

  /** @ignore */
  _getLoginEndPoint : function(productId) {
    return this.loginendpoint.replace('<tenantId>',this._activeTenantId).replace('{productId}',productId);
  },

  /** @ignore */
  _getLinkEndPoint : function(productId) {
    return this.linkendpoint.replace('<tenantId>',this._activeTenantId).replace('{productId}',productId);
  },

  /** @ignore */
  _getLaunchURL: function(launchURL, service) {
    if (service === 'Analytics') {
      launchURL += '&company' + '=' + encodeURIComponent(this._getCompanyForPC('dma_analytics')) + '&';
      launchURL += 'current_org' + '=' + this._activeOrgId;
    }
    return launchURL.replace(new RegExp('<tenant>', 'g'), this._activeTenantId);
  },

  /** @ignore */
  _showDisAmbDialog : function(hasAccess,name,description,learnMoreUrl,productId,serviceCode,accounts) {
    var solutionLinkerDialog = Coral.templates.Shell.IMS.prodinfo.call(this._elements);
    var solutionLinker = Coral.templates.Shell.IMS.disambiguation.call(this._elements);
    var solutionData = this._getProduct(serviceCode);
    this._elements.disambData = solutionLinker;
    this._elements.disambData.description = solutionLinker.querySelector('.descriptionTextL1');
    this._elements.disambData.descriptionLinks = solutionLinker.querySelector('.descriptionTextL2');
    this._elements.disambData.linkWizard = solutionLinker.querySelector('.linkWizard');
    this._elements.disambData.wizard = solutionLinker.querySelector('.coral-wizard');

    this._elements.disambData.description.innerHTML = Coral.i18n.get('We found <strong>{0}</strong> {1} Account(s) with the Organization <strong> {2} </strong> based on your login information. Please link <strong> one </strong> and verify by logging in and continuing.', accounts.length, solutionData.longname, this._activeOrgName) +'<a href="https://marketing.adobe.com/resources/help/en_US/mcloud/?f=organizations" target="_blank" class="coral-Link"> '+ Coral.i18n.get('Why should I link my accounts?')+'</a>';

    this._elements.disambData.descriptionLinks.innerHTML = Coral.i18n.get('Don\'t see your {0} account?', solutionData.longname)+ '<a href="#" class="coral-Link manualLink" coral-close>'+Coral.i18n.get('Manually link an account &raquo;') + '</a><br>';

    this._elements.disambData.descriptionLinks.innerHTML += Coral.i18n.get('Don\'t have a {0} account to link? Simply continue to access ', solutionData.longname)+ '<a href="'+ solutionData.href + '" class="coral-Link manualLink">'+ solutionData.longname + '</a>';

    var that = this;
    var i;
    var step;
    var panel,linkButton;
    var needCompany = false;
    if(solutionData['companyProperty']) {
      needCompany = true;
    }

    var needRegion = false;
    if(solutionData['region']) {
      needRegion = true;
    }
    this._elements.disambData.linkWizard.querySelector('coral-steplist').size='S';
    this._elements.disambData.linkWizard.querySelector('coral-steplist').interaction='on';
    this._elements.disambData.linkWizard.appendChild(this._elements.disambData.linkWizard.querySelector('coral-steplist'));
    for(i=0;i<accounts.length;i++) {
      step = new Coral.Step();
      panel = new Coral.Panel();
      var form = document.createElement('form');
      linkButton = new Coral.Button();
      linkButton.label.innerHTML=Coral.i18n.get('Link & Continue');
      linkButton.variant='primary';
      linkButton.className += ' linkContinueButton';
      var companyField;
      var userNameField = this._getLinkFormField('username',Coral.i18n.get('Username'));
      userNameField.querySelector('input').setAttribute('readonly','readonly');
      userNameField.className += ' disabledField';
      userNameField.querySelector('input').value = accounts[i];
      var passwordField = this._getLinkFormField('password',Coral.i18n.get('Password'),'password');
      if(needCompany) {
        companyField = this._getLinkFormField('company',Coral.i18n.get('Company'));
        companyField.querySelector('input').setAttribute('readonly','readonly');
        companyField.className += ' disabledField';
        companyField.querySelector('input').value = this._getCompanyForPC(serviceCode);
        form.appendChild(companyField);
      }
      form.appendChild(userNameField);
      form.appendChild(passwordField);
      form.appendChild(linkButton);
      panel.content.appendChild(form);
      this._elements.disambData.linkWizard.querySelector('coral-panelstack').appendChild(panel);
      this._elements.disambData.linkWizard.querySelector('coral-steplist').appendChild(step);
    }

    this._elements.disambData.linkWizard.addEventListener('click', function(event){
      if(event.target.className.indexOf('linkContinueButton') > 0) {
        that._linkAccount(event,that,serviceCode,productId,solutionData.longname,event.target.parentElement,event.target);
      }
    });

    solutionLinkerDialog.header.innerHTML = 'Link ' + solutionData.longname;
    solutionLinkerDialog.id='disambDialog';
    solutionLinkerDialog.closable = 'on';

    solutionLinkerDialog.content.appendChild(solutionLinker);
    solutionLinkerDialog.addEventListener('coral-overlay:close', this._closeDialog);
    solutionLinkerDialog.center();
    solutionLinkerDialog.show();
  },

  /** @ignore */
  _showLinkDialog : function(hasAccess,name,description,learnMoreUrl,productId,serviceCode){
    var prodInfoDialog = Coral.templates.Shell.IMS.prodinfo();
    prodInfoDialog.closable='on';
    prodInfoDialog.header.innerHTML = name;

    var innerSpan = document.createElement('div');
    innerSpan.innerHTML = description;
    prodInfoDialog.content.appendChild(innerSpan);

    var learnMoreButton = new Coral.Button().set({variant:'primary'});
    learnMoreButton.className+=' learnMore';
    learnMoreButton.label.innerHTML=Coral.i18n.get('Learn More');
    var that = this;
    if(hasAccess) {
      var linkAccount = new Coral.Button().set({variant:'quiet'});
      linkAccount.className+=' linkAccount';
      linkAccount.label.innerHTML=Coral.i18n.get('Link Account');
      linkAccount.addEventListener('click',function(event){that._onLinkAccountClick(that,productId,name,prodInfoDialog,serviceCode);});
      prodInfoDialog.content.appendChild(linkAccount);
    }
    if(learnMoreUrl) {
      learnMoreButton.setAttribute('data-learn-more-url',learnMoreUrl);
      learnMoreButton.addEventListener('click',this._onLearnMoreClick);
      prodInfoDialog.content.appendChild(learnMoreButton);
    }
    prodInfoDialog.addEventListener('coral-overlay:close', this._closeDialog);
    prodInfoDialog.show();
  },

  /** @ignore */
  _closeDialog:function(event) {
    if(event.target.tagName === 'CORAL-DIALOG') {
      event.target.remove();
    }
  },

  /** @ignore */
  _getLinkFormField: function(name, label,fieldfor) {
    var fieldDiv = document.createElement('div');
    fieldDiv.className += 'formPart';
    var field = new Coral.Textfield();
    field.className += ' linkFormField';
    field.setAttribute('name',name);
    if(fieldfor) {
      field.setAttribute('type',fieldfor);
    }
    var labelSpan = document.createElement('span');
    labelSpan.className += ' linkFormLabel';
    labelSpan.innerHTML = label;
    fieldDiv.appendChild(labelSpan);
    fieldDiv.appendChild(field);
    return fieldDiv;
  },

  /** @ignore */
  _getLinkFormDropDown: function(name, label,values) {
    var fieldDiv = document.createElement('div');
    fieldDiv.className += 'formPart';
    var field = new Coral.Select();
    var fieldItem;
    var i;
    var items = values.split(',');
    for(i=0;i<items.length;i++) {
      fieldItem = new Coral.Select.Item().set({
        content: {
          innerHTML: items[i]
        },
        value: items[i]
      });
        //fieldItem.content.innerHTML = items[i];
        //fieldItem.value = items[i];
        field.items.add(fieldItem);
      }
      field.className += ' linkFormField';
      field.setAttribute('name',name);

      var labelSpan = document.createElement('span');
      labelSpan.className += ' linkFormLabel';
      labelSpan.innerHTML = label;
      fieldDiv.appendChild(labelSpan);
      fieldDiv.appendChild(field);
      return fieldDiv;
    },

    /** @ignore */
    _onLinkAccountClick: function (that,productId, solutionLongName,prodInfoDialog,serviceCode) {
      prodInfoDialog.remove();
      var solutionData = that._getProduct(serviceCode);

      var needCompany = false;
      if(solutionData && solutionData['companyProperty']) {
        needCompany = true;
      }

      var needRegion = false;
      if(solutionData && solutionData['region']) {
        needRegion = true;
      }

      var solutionLinkerDialog = Coral.templates.Shell.IMS.prodinfo.call(that._elements);
      var solutionLinker = Coral.templates.Shell.IMS.solutionlinker.call(that._elements);
      solutionLinkerDialog.header.innerHTML = Coral.i18n.get('Link ') + solutionLongName;
      solutionLinkerDialog.id='solutionLinker';
      that._elements.solutionLinker = solutionLinker;
      var innerLeft = that._elements.solutionLinker.innerLeft = solutionLinker.querySelector('.linkerDiv.leftLinkerDiv');
      that._elements.solutionLinker.formDiv = solutionLinker.querySelector('.formDiv');

      innerLeft.innerHTML = Coral.i18n.get('If you have an {0} account you can link it to your Adobe Id. This will allow you to access {1} and the rest of the Marketing Cloud with single login.', solutionLongName, solutionLongName);

      var companyField;
      var regionField;
      var userNameField = that._getLinkFormField('username',Coral.i18n.get('Username'));
      var passwordField = that._getLinkFormField('password',Coral.i18n.get('Password'),'password');
      if(needCompany) {
        companyField = that._getLinkFormField('company', Coral.i18n.get('Company'));
        that._elements.solutionLinker.formDiv.appendChild(companyField);
      }
      if(solutionData && needRegion) {
        regionField = that._getLinkFormDropDown('region',Coral.i18n.get('Region'), solutionData['region']);
        that._elements.solutionLinker.formDiv.appendChild(regionField);
      }

      var linkForm = solutionLinker.querySelector('form');
      linkForm.addEventListener('submit',function(event){that._linkAccount(event,that,serviceCode,productId,solutionLongName);});

      var troubleLink = solutionLinker.querySelector('.troubleLink');
      troubleLink.innerHTML = Coral.i18n.get('Having Trouble?');
      troubleLink.href=that.troubleLink;

      var linkButton = that._elements.solutionLinker.linkButton = solutionLinker.querySelector('.linkAccount');
      linkButton.label.innerHTML=Coral.i18n.get('Link');

      var cancelButton = solutionLinker.querySelector('.cancelButton');
      cancelButton.label.innerHTML=Coral.i18n.get('Cancel');

      that._elements.solutionLinker.formDiv.appendChild(userNameField);
      that._elements.solutionLinker.formDiv.appendChild(passwordField);
      that._elements.solutionLinker.formDiv.appendChild(troubleLink);

      solutionLinkerDialog.content.appendChild(solutionLinker);
      solutionLinkerDialog.addEventListener('coral-overlay:close', this._closeDialog);
      solutionLinkerDialog.show();

      solutionLinkerDialog.center();
    },

    /** @ignore */
    _linkAccount:function(event,that,serviceCode,productId,solutionLongName,form,linkButton) {
      event.preventDefault();
      that._serviceCode = serviceCode;
      if(!(form)){
        form = that._elements.solutionLinker.formDiv;
      }
      if(!(linkButton)){
        linkButton = that._elements.solutionLinker.linkButton;
      }
      var formFields = form.querySelectorAll('.formPart');
      var isValid = that._markFormFieldsValid(true,formFields);
      if(!isValid) {
        return;
      }
      linkButton.setAttribute('disabled','disabled');
      this._showFormFields(false,formFields);
      that._showWait(form,'L');
      var params;
      if(event.target.tagName === 'form') {
        params = $(event.target).serialize();
      } else {
        params = $(event.target).closest('form').serialize();
      }
      that._loginToSolution(productId,params,solutionLongName,form,linkButton);
    },

    /** @ignore */
    _loginToSolution : function (productId,params,solutionLongName,form,linkButton) {
      var headers = {'Authorization': 'Bearer '+this.accesstoken};
      var that = this;
      this._makeCORSRequest(that._getLoginEndPoint(productId), 'POST', params, headers)
      .done(function(data){
        if(!data.success) {
          that._removeWait(form);
          that._markForFailure(that,form,data.messages[0].content,linkButton);
        } else {
          params += '&loginResult=' + data.loginResult;
          that._linkSolution(productId,params,solutionLongName,form,linkButton);
        }
      })
      .error(function(jqXHR, textStatus, errorThrown) {
        that._removeWait(form);
        that._markForFailure(that,form,Coral.i18n.get('An error occurred while linking. Please try after some time.'),linkButton);
      });
    },

    /** @ignore */
    _linkSolution : function (productId,params,solutionLongName,form,linkButton) {
      var headers = {'Authorization': 'Bearer '+this.accesstoken};
      var that = this;
      this._makeCORSRequest(that._getLinkEndPoint(productId), 'POST', params, headers)
      .done(function(data){
        that._removeWait(form);
        if(!data.success) {
          that._markForFailure(that,form,data.messages[0].content,linkButton);
        } else {
          var product = that._getProduct(that._serviceCode);
          if(product){
            window.location = that._getLaunchURL(product.href, that._serviceCode);
          }
          else{
            var linkedService = that.allservices.filter(function(service){
              if(service.name === that._serviceCode){
                return service.href;
              }
            });
            if(linkedService){
              window.location = that._getLaunchURL(linkedService[0].href, that._serviceCode);
            }
          }
        }
      })
      .error(function(jqXHR, textStatus, errorThrown) {
        that._removeWait(form);
        that._markForFailure(that,form,Coral.i18n.get('An error occurred while linking. Please try after some time.'),linkButton);
      });
    },

    /** @ignore */
    _markForFailure: function(that,formDiv,message,linkButton) {
      var formElements = formDiv.querySelectorAll('.formPart');
      that._showFormFields(true,formElements);
      that._markFormFieldsValid(false,formElements,message);
      linkButton.removeAttribute('disabled');
    },

    /** @ignore */
    _showFormFields : function (show,formElements) {
      for (var i = 0; i < formElements.length; i++) {
        var formElement = formElements[i];
        if(show) {
          formElement.style.opacity=1;
        } else {
          formElement.style.opacity=0;
        }
      }
    },

    /** @ignore */
    _markFormFieldsValid : function (valid,formFields,message) {
      var isValid=true;
      var i;
      var formField;
      if(!valid) {
        for (i = 0; i < formFields.length; i++) {
          formField = formFields[i].querySelector('.linkFormField');
          if(!(formField)){
            continue;
          }
          formField.invalid=true;
          this.showAlertIcon(formFields[i],true,message);
          if(isValid) {
            isValid=false;
          }
        }
      } else {
        for (i = 0; i < formFields.length; i++) {
          formField = formFields[i].querySelector('.linkFormField');
          if(!(formField)){
            continue;
          }
          if(formField.value) {
            formField.invalid=false;
            this.showAlertIcon(formFields[i],false,message);
          } else {
            formField.invalid=true;
            this.showAlertIcon(formFields[i],true,Coral.i18n.get('Field can not be empty!'));
            if(isValid) {
              isValid=false;
            }
          }
        }
      }
      return isValid;
    },

    /** @ignore */
    showAlertIcon: function(formField, show,message) {
      var alertIcon;
      var tooltip;
      if(show) {
        alertIcon = new Coral.Icon();
        alertIcon.icon='alert';
        alertIcon.size='XS';
        alertIcon.className += ' fieldError';
        tooltip = new Coral.Tooltip().set({
          variant:'error',
          target:alertIcon
        });
        tooltip.content.innerHTML=message;
        var alertMsg = formField.querySelector('.fieldError');
        if(!(alertMsg)) {
          formField.appendChild(alertIcon);
        }
        formField.appendChild(tooltip);
      } else {
        alertIcon = formField.querySelector('coral-icon.fieldError');
        if(alertIcon) {
          alertIcon.remove();
        }
        tooltip = formField.querySelector('coral-tooltip');
        if(tooltip) {
          tooltip.remove();
        }
      }
    },

    /**
    * Creates a Solution for the Solutions Switcher
    **/
    createSolution: function(hasAccess, solutionObject, serviceCode) {
      var solution = new Coral.Shell.Solution().set({
        label: {innerHTML: solutionObject.name},
        icon: this.getIconForSolution(solutionObject.icon, hasAccess)
      });
      solution.setAttribute('data-serviceCode', serviceCode);
      solution.setAttribute('data-has-access', hasAccess);
      if(hasAccess){
        solution.setAttribute('linked', 'linked');
      }
      solution.href = solutionObject.href;
      return solution;
    },

    /**
    * Initializes sub cloud tags in the solution-switcher
    **/
    initializeSubClouds: function(subCloud, solutionName){
      this.removeAllChildren(subCloud);
        //Adds the <coral-shell-solutions-name> tag
        var solutionsName = new Coral.Shell.Solutions.Header();
        solutionsName.innerHTML = solutionName;
        subCloud.items.add(solutionsName);
      },

    /**
    * Creates a Core Service for the Solutions Switcher
    **/
    createCoreService: function(value,hasAccess) {
      var coreService = new Coral.Shell.Solution().set({
        label: {innerHTML: value.name},
        icon: value.icon,
        href: value.href
      });
      coreService.setAttribute('data-is-core-service', 'true');
      coreService.setAttribute('data-has-access', false);
      coreService.setAttribute('data-servicecode', value.name);
      if(!value.forPC||hasAccess){
        coreService.setAttribute('linked', 'linked');
        coreService.setAttribute('data-has-access', true);
      }
      return coreService;
    },

    /**
    * Org Switching Handler
    **/
    _onOrgSwitch: function(event){
      var that = this;
      var item = event.detail.selection;
      var orgName = item.name;

      var orgId = item.getAttribute('data-org-id');
      var authSrc = item.getAttribute('data-org-auth-src');
      var imsOrgId = orgId + '@' + authSrc;
      this._activeTenantId = item.getAttribute('data-tenant-id');

      // Update the state - activeOrgId
      this._activeOrgId = imsOrgId;
      this._activeOrgName = orgName;
      // Change the Solution Switcher
      this.populateSolutionSwitcher();

      //set Active SessionData in IMS & update UI
      this.setActiveOrg(this._activeOrgId, orgName, this._activeTenantId)
        .done(function() {
          that.trigger('coral-shell-orgswitcher:change:done');
        })
        .fail(function() {
          that.trigger('coral-shell-orgswitcher:change:fail');
        });

      // close the menu
      var orgMenu = document.querySelector('coral-shell-menu#menu_organizations');
      orgMenu.open = false;

      if(Coral.Pulse){
        Coral.Pulse.core.updateIMSOrgID(this._activeOrgId);
        //Coral.Pulse.core.resetListView('FEEDS');
        Coral.Pulse.core.resetListView('NOTIFICATIONS');
        //Coral.Pulse.core.resetTabView('NOTIFICATIONS');
      }
    },

    findlinkedsubcloud: function(subclouds, linkedServiceCode){
      var linkedSubCloud;
      $.each(subclouds, function(index, subcloud){
        $.each(subcloud.solutions, function (solutionServiceCode){
          if (solutionServiceCode === linkedServiceCode){
            linkedSubCloud = subcloud;
          }
        });
      });
      return linkedSubCloud;
    },

    findAndDeleteSolution: function(subCloud, solutionName, hasAccess){
      if($(subCloud).find('coral-shell-solution-label:contains(\"'+solutionName+'\")').length > 0) {
        if(hasAccess) {
          $(subCloud).find('coral-shell-solution-label:contains(\"'+solutionName+'\")').closest('a').remove();
        } else {
          return true;
        }
      }
    },

    /**
    * Populates the Solution Switcher which contains both Solutions Sub-clouds(Marketing, Advertising & Aanalytics)
    * and Platform services as per User's Projected Product Contexts and Active Org ID
    **/
    populateSolutionSwitcher: function(){

      if(document.querySelector('coral-shell-solutions[coral-shell-ims-marketing-cloud]') ||
        document.querySelector('coral-shell-solutions[coral-shell-ims-analytics-cloud]') || document.querySelector('coral-shell-solutions[coral-shell-ims-advertising-cloud]')){
        this.populateSubCloud();
    }
    if(document.querySelector('coral-shell-solutions[secondary][coral-shell-ims-services]')){
      this.populateCoreServices();
    }
  },

    /**
    * Populates the Solution Sub-clouds with their respective solutions.
    **/
    populateSubCloud: function(){
        //link to html tags for each subcloud.
        var tags = {
          'Marketing Cloud':  document.querySelector('coral-shell-solutions[coral-shell-ims-marketing-cloud]'),
          'Advertising Cloud':  document.querySelector('coral-shell-solutions[coral-shell-ims-advertising-cloud]'),
          'Analytics Cloud': document.querySelector('coral-shell-solutions[coral-shell-ims-analytics-cloud]')
        };

        var that = this;
        var subclouds = this.allclouds; //Access subclouds json data.

        //create sub cloud DOM and include the label
        $.each(tags, function(tagname, value){
          that.initializeSubClouds(tags[tagname], tagname);
        });


        //attach the individual solutions' tags to their respective sub-clouds
        $.each (subclouds, function(subcloudindex, subcloud){
         if (tags[subcloud.label]){
           that.populateSolutions(tags[subcloud.label], subcloud.solutions, tags, subclouds);
         }
       });

        //once all the elements are added into the subcloud, sort the elements in the sublouds
        //sorting done in order linked>unlinked, then alphabetical
        $.each (subclouds, function(subcloudindex, subcloud){
         that._sortElements($(tags[subcloud.label]));
       });

      },

      /** Add solutions to each subcloud */
      populateSolutions: function(subCloud, solutions, tags, subclouds){
      var solution, addedSolutions = []; //addedSolution keeps track of all solutions whose DOM has been created.
      var that = this;

      $.each(solutions, function(serviceCode, solutionObject){

        var hasAccess = that._userHasPC(serviceCode);
        solution = that.createSolution(hasAccess, solutionObject, serviceCode); //DOM for the solution

        //If an unlinked solution has been added where the user has PC, clear the unlinked solution to add a linked soln.
        if($(subCloud).find('coral-shell-solution-label:contains(\"'+solutionObject.name+'\")').length > 0) {
          if(hasAccess) {
            $(subCloud).find('coral-shell-solution-label:contains(\"'+solutionObject.name+'\")').closest('a').remove();
          } else {
            return true;
          }
        }

        //recheck if solution has already been added before adding it.
        if(addedSolutions.indexOf(serviceCode) === -1){
          addedSolutions.push(serviceCode);
          subCloud.items.add(solution);
        }

        // Get Linked Solutions if any
        if(solutionObject['linked_products']) {
          for(var i=0; i<solutionObject['linked_products'].length; i++) {
            var linkedServiceCode = solutionObject['linked_products'][i];
            if(addedSolutions.indexOf(linkedServiceCode) === -1){

              // The linked_products PC is assumed to be there with the user
              var linkedHasAccess = hasAccess;
              var linkedSolutionObject, linkedSubCloud;

              //Find the linked solution from the config
              linkedSubCloud = that.findlinkedsubcloud(subclouds, linkedServiceCode);
              linkedSolutionObject = linkedSubCloud.solutions[linkedServiceCode];
              that.findAndDeleteSolution(tags[linkedSubCloud.label], linkedSolutionObject.name , true);
              solution = that.createSolution(linkedHasAccess, linkedSolutionObject, linkedServiceCode);
              tags[linkedSubCloud.label].items.add(solution);
              addedSolutions.push(linkedServiceCode);

            }
          }
        }
      });
    },


    /** @ignore */
    _sortElements: function(parentElement) {
      parentElement.find('a.coral3-Shell-solution').sort(function(a, b) {
        if ($(a)[0].getAttribute('data-has-access') === $(b)[0].getAttribute('data-has-access')){
          return $(a).find('coral-shell-solution-label').text() > $(b).find('coral-shell-solution-label').text();
        }
        return $(a)[0].getAttribute('data-has-access') < $(b)[0].getAttribute('data-has-access');
      }).appendTo(parentElement);
    },

    /** @ignore */
    populateCoreServices: function(){
      // Add Core Services ( Secondary Solutions like Assets, Profiles & Audiences )
      var secondarySolutions = document.querySelector('coral-shell-solutions[secondary][coral-shell-ims-services]');
      this.initializeSubClouds(secondarySolutions, 'Platform');
      var coreService, services = this.allservices;
      var that = this;

      $(services).each(function(index, value){

        var service = value;
        if(service.default || that._userHasPC(value.forPC)){
          coreService = that.createCoreService(value,that._userHasPC(value.forPC));
          secondarySolutions.items.add(coreService);
        }
        if(service.roles && that._userProfile.roles) {
          var requiredRoles = service.roles;
          var userRoles = that._userProfile.roles;
          var i,j,foundRole;
          for(i=0;i<userRoles.length;i++) {
            var userRole = userRoles[i];
            if(userRole.organization === that._activeOrgId) {
              for(j=0;j<requiredRoles.length;j++) {
                if(userRole['named_role'] === requiredRoles[j]) {
                  coreService = that.createCoreService(value,null);
                  secondarySolutions.items.add(coreService);
                  foundRole = true;
                  break;
                }
              }
              if(foundRole) {
                break;
              }
            }
          }
        }
      });
      that._sortElements($(secondarySolutions));
    },
    /** @ignore */
    removeAllChildren: function(shellSolutions){
      while(shellSolutions.hasChildNodes()){
        shellSolutions.removeChild(shellSolutions.firstChild);
      }
    },

    //-----------------------------------------  Util Methods --------------------------------------------------

    /**
    * Returns true if for the active org the current user has the passed product context. Returns false otherwise.
    */
    _userHasPC: function(serviceCode){
      var hasPC = false;
      var that = this;
      if(!serviceCode) {
        return false;
      }
      var serviceCodes = serviceCode.split(',');
      $(serviceCodes).each(function(servIndex, servValue) {
        var capabilityName;
        if(servValue.indexOf(':') > -1) {
          capabilityName = servValue.split(':')[1];
          servValue = servValue.split(':')[0];
        }
        $(that.projectedProductContext).each(function(index, value){
          if(value.prodCtx.owningEntity && value.prodCtx.owningEntity === that._activeOrgId && servValue === value.prodCtx.serviceCode) {
            hasPC = true;
            return false; // to break loop
          }
        });
        if(hasPC && capabilityName) {
          hasPC = false;
          $(that.projectedProductContext).each(function(index, value){
            if(that._userHasSubService(that,capabilityName,value.prodCtx,servValue)){
              hasPC = true;
              return false; // to break loop
            }
          });
        }
        if(hasPC) {
          return false;
        }
      });
      return hasPC;
    },

    /**
    * Returns true if for the active org the current user has the passed product context and its sub service capability. Returns false otherwise.
    */
    _userHasSubService: function(that,capability, productContext,serviceCode) {
      var hasSubService = false;
      if(productContext.owningEntity && productContext.owningEntity === that._activeOrgId && serviceCode === productContext.serviceCode &&  productContext['enable_sub_service']) {
        var subServiceList = productContext['enable_sub_service'];
        var subServices  = subServiceList.split(',');
        $(subServices).each(function(index, value){
          if(capability === value) {
            hasSubService = true;
            return false;
          }
        });
      }
      return hasSubService;
    },

    /** @ignore */
    _getCompanyForPC: function(serviceCode){
      var loginCompany = '';
      var that = this;
      $(this.projectedProductContext).each(function(index, value){
        if(value.prodCtx.owningEntity && value.prodCtx.owningEntity === that._activeOrgId && serviceCode===value.prodCtx.serviceCode){
          loginCompany = value.prodCtx['login_company'];
          return false; // to break loop
        }
      });
      return loginCompany;
    },

    /** @ignore */
    _isEmptyString: function(str){
      return typeof str === 'string' && str.length===0;
    },

    /***
    * Get the Tenant ID for the Organization identifier
    */
    _getTenantIdForOrg: function(orgIdent) {
      var tenantId = null;
      $(this.projectedProductContext).each(function(index, value) {
        if(value.prodCtx['tenant_id'] && value.prodCtx.owningEntity === orgIdent && value.prodCtx.serviceCode === 'dma_tartan') {
          tenantId = value.prodCtx['tenant_id'];
          return false;
        }
      });
      return tenantId;
    }

  });

}(jQuery, window));
