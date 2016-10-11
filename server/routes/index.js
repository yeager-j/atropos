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
router.post('/login', ctrlAuth.login);

router.post('/edit', auth, ctrlAuth.edit);
router.post('/password', auth, ctrlAuth.updatePass);
router.post('/admin', auth, ctrlAuth.toggleAdmin);
router.post('/premium', auth, ctrlAuth.togglePremium);

router.post('/feedback', auth, feedback.submit);
router.get('/feedback/:id', auth, feedback.deleteFeedback);
router.get('/feedback', auth, feedback.getFeedback);

router.get('/profile', auth, userAuth.userCP);
router.get('/profile/:id', auth, userAuth.getUser);
router.get('/all_users', auth, userAuth.getAllUsers);

module.exports = router;
