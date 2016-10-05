'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: '&98e987gwerhgu25g0w7erhgwe',
    userProperty: 'payload'
});

var ctrlAuth = require('../controllers/auth');
var userAuth = require('../controllers/user_cp');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/profile', auth, userAuth.userCP);

module.exports = router;
