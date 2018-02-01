function logRequest(req, res, next) {
    console.log(req.url);
    next();
}

module.exports = logRequest;
