var cacheCsrf = require('./cacheCsrf');
var logRequest = require('./logRequest');
var proxyAPI = require('./proxyAPI');
var cookieParser = require('cookie-parser')();

module.exports = [logRequest, cookieParser, cacheCsrf, proxyAPI];
