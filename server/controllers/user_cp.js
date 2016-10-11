/**
 * Created by Jackson on 9/30/16.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../config/auth');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.userCP = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            message: "Unauthorized"
        })
    } else {
        User.findById(req.payload._id)
            .exec(function (err, user) {
                res.status(200).json(user);
            });
    }
};

module.exports.getAllUsers = function (req, res) {
    User.findById(req.payload._id, function (err, user) {
        if (!user.admin) {
            sendJSONresponse(res, 401, {
                'message': "Unauthorized"
            });
        } else {
            User.find(function (err, users) {
                sendJSONresponse(res, 200, users);
            })
        }
    });
};

module.exports.getUser = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            message: "Unauthorized"
        })
    } else {
        User.findById(req.payload._id)
            .exec(function (err, user) {
                User.findById(req.params.id)
                    .exec(function (err, user) {
                        if(err){
                            console.log(err);
                        }

                        res.status(200).json({
                            username: user.username,
                            premium: user.premium,
                            admin: user.admin
                        });
                    })
            })
    }
};