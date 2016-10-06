/**
 * Created by Jackson on 9/30/16.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

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

module.exports.getUser = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            message: "Unauthorized"
        })
    } else {
        User.findById(req.payload._id)
            .exec(function (err, user) {
                if (user.admin) {
                    User.findById(req.params.id)
                        .exec(function (err, user) {
                            console.log(user);
                            res.status(200).json(user);
                        })
                } else {
                    res.status(401);
                }
            });
    }
};