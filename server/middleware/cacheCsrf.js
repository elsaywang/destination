var cache = require('memory-cache');
var cheerio = require('cheerio');
var request = require('request');
require('../global');

function cacheCsrf(req, res, next) {
    var jsession = req.cookies['JSESSIONID'];
    if (jsession) {
        var csrf = cache.get(jsession);
        if (!csrf) {
            var options = {
                method: 'GET',
                uri: portalHost + portalCsrfPath,
                headers: { cookie: req.headers.cookie },
            };

            // get csrf token from old portal
            request(options, function(error, response, body) {
                if (!error && response && response.statusCode === 200) {
                    var html = cheerio.load(body);
                    var csrf = html('#' + portalCsrfTagId).attr('content');
                    if (csrf) cache.put(jsession, csrf);
                } else {
                    console.log('error:' + error + ', response:' + response);
                }
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = cacheCsrf;
