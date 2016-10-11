var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../config/auth');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {

    if (!req.body.username || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.premium = false;
    user.admin = false;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            token: token
        });
    });

};

module.exports.login = function (req, res) {

    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                token: token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports.edit = function (req, res) {
    if (!req.body.email || !req.body.username) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    User.findOne({
        'email': req.body.email
    }, 'email', function (err, user) {
        if (!user || user._id == req.body._id) {
            User.findByIdAndUpdate(
                req.payload._id,
                {
                    $set: {
                        email: req.body.email,
                        username: req.body.username
                    }
                }, {
                    new: true
                }, function (err, user) {
                    res.status(200);

                    res.json({
                        "token": user.generateJwt()
                    });
                })
        } else {
            res.status(418);
            res.json({
                "message": "Email already registered"
            })
        }
    });
};

module.exports.toggleAdmin = function(req, res){
    User.findById(req.payload._id, function(err, user){
        if(!user.admin){
            sendJSONresponse(res, 401, {
                message: "Unauthorized"
            })
        }else{
            User.findById(req.body.id, function(err, usrAdmin){
                User.findByIdAndUpdate(usrAdmin.id, {
                    $set: {
                        admin: !usrAdmin.admin
                    }
                }, {
                    new: true
                }, function(err, user){
                    sendJSONresponse(res, 200, {
                        "message": "OK",
                        user: user
                    })
                })
            })
        }
    })
};

module.exports.togglePremium = function(req, res){
    User.findById(req.payload._id, function(err, user){
        if(!user.admin){
            sendJSONresponse(res, 401, {
                message: "Unauthorized"
            })
        }else{
            User.findById(req.body.id, function(err, usrAdmin){
                User.findByIdAndUpdate(usrAdmin.id, {
                    $set: {
                        premium: !usrAdmin.premium
                    }
                }, {
                    new: true
                }, function(err, user){
                    sendJSONresponse(res, 200, {
                        "message": "OK",
                        user: user
                    })
                })
            })
        }
    })
};

module.exports.updatePass = function (req, res) {
    if (!req.body.password || !req.body.currentPass) {
        sendJSONresponse(res, 400, {
            "message": "Password required"
        });

        return;
    }

    if (!req.payload._id) {
        res.status(401).json({
            message: "Unauthorized"
        });
    } else {
        User.findById(req.payload._id, function (err, user) {
            if (err) {
                handleError(err);
                console.log("Error");
            }

            if (user.checkPassword(req.body.currentPass) == true) {
                user.setPassword(req.body.password);
                user.save();

                res.status(200);

                res.json({
                    "message": "OK"
                });
            } else {
                res.status(401);
                res.json({
                    message: "Bad password"
                })
            }
        });
    }
};