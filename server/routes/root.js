var cache = require('memory-cache');

var root = function(req, res) {
    var jsession = req.cookies['JSESSIONID'];
    var csrf;
    if (jsession) {
        csrf = cache.get(jsession);
        console.log(jsession + ' --> ' + csrf);
    }

    res.render('index.html', { _csrf: csrf });
};

module.exports = root;
