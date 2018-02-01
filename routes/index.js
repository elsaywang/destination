var express = require('express');
var router = express.Router();
var root = require('./root');

router.get('/', root);

module.exports = router;
