var express = require('express');
var app = express();
var cache = require('memory-cache');
var path = require('path');
var request = require('request');
var cookieParser = require('cookie-parser')();
var cheerio = require('cheerio');
var proxy = require('http-proxy-middleware');
require('./global.js');

//--- app middlewares ---
function logRequest(req, res, next) {
    console.log(req.url);
    next();
}

app.use(express.static(path.join(__dirname, 'client', 'build')));

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

var proxyAPI = proxy('/api', {
    target: portalHost,
    changeOrigin: true,
});

app.use(logRequest, cookieParser, cacheCsrf, proxyAPI);

//--- app routes ---
app.get('*', function(req, res) {
    var jsession = req.cookies['JSESSIONID'];
    var csrf;
    if (jsession) {
        csrf = cache.get(jsession);
        console.log(jsession + ' --> ' + csrf);
    }
    res.render('index.html', { _csrf: csrf });
});

//--- start server ---
app.listen(port, function() {
    console.log('server started at http://localhost:' + port);
});
