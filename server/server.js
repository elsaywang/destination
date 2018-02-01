var express = require('express');
var app = express();
var path = require('path');
var middleware = require('./middleware');
var routes = require('./routes');
require('./global.js');

// middleware
app.use(...middleware);

// use static assets in client/build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// routes
app.use('/', routes);

//--- start server ---
app.listen(port, function() {
    console.log('server started at http://localhost:' + port);
});
