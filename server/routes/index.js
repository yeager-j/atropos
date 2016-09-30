'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: '&98e987gwerhgu25g0w7erhgwe',
    userProperty: 'payload'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
