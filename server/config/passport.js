/**
 * Created by Jackson on 9/29/16.
 */
require('../models/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (username, password, done) {
    User.findOne({
        email: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            console.log("No user");
            return done(null, false, {
                message: "User not found"
            });
        }

        if (!user.checkPassword(password)) {
            console.log("Wrong password");
            return done(null, false, {
                message: "Incorrect password"
            });
        }

        return done(null, user);
    });
}));
