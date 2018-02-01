var proxy = require('http-proxy-middleware');
require('../global');

var proxyAPI = proxy('/api', {
    target: portalHost,
    changeOrigin: true,
});

module.exports = proxyAPI;
