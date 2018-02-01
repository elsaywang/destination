var config = require('config');

global.port = config.has('server.port') ? config.get('server.port') : 8081;
global.portalHost = config.get('portal.host');
global.portalCsrfPath = config.get('portal.csrfPath');
global.portalCsrfTagId = config.get('portal.csrfTagId');

module.exports = global;
