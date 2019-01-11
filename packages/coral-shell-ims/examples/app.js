(function($, window, undefined){

	var projectedProductContexts, sessionURL;

	// This variable 'adobeid' needs to be attached to window, so that IMS can callback the onReady method
	window.adobeid = {
		client_id: "MarketingCloud11_qa",
		locale: "en_US",
		uses_redirect_mode: true,
		scope : "openid,read_organizations,session,additional_info.projectedProductContext,additional_info.roles",
		onReady: function () {
			profile= adobeIMS.getUserProfile();
			if(profile) {
				sessionURL=profile.session;
				projectedProductContexts = profile.projectedProductContext;
				$("#backgrounds").hide();
				$(".login-box").hide();
				$(".shellContainer").show();

				// Set Access Token 
				var shell = document.querySelector("coral-shell-ims");
				if(!shell.accesstoken){
					shell.accesstoken = adobeIMS.getAccessToken();
				}
				if(!shell.imssessionurl){
					shell.imssessionurl = sessionURL;
				}

			} else {
				$("#backgrounds").show();
				$(".login-box").show();
				$(".sign-in-adobeid .sign-in").show();
			}
		}
	};

}(jQuery, window));