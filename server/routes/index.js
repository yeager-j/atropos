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
var feedback = require('../controllers/post');

router.post('/register', ctrlAuth.register);
router.post('/edit', ctrlAuth.edit);
router.post('/login', ctrlAuth.login);
router.post('/password', ctrlAuth.updatePass);

router.post('/feedback', feedback.submit);
router.get('/feedback', auth, feedback.getFeedback);

router.get('/profile', auth, userAuth.userCP);
router.get('/profile/:id', auth, userAuth.getUser);

module.exports = router;
