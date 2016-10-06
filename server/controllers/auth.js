var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

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

    console.log(req.body.username);
    console.log(req.body.email);

    user.username = req.body.username;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);

        console.log(err);
        res.json({
            "token": token
        });
    });

};

module.exports.edit = function (req, res) {
    if (!req.body.data.email || !req.body.data.username) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    if (!req.body.data._id) {
        res.status(401).json({
            message: "Unauthorized"
        })
    } else {
        var unique = true;

        User.findOne({
            'email': req.body.data.email
        }, 'email', function(err, user){
            console.log("User: ");
            console.log(user);

            if(user == null){
                User.findByIdAndUpdate(
                    req.body.data._id,
                    {
                        $set: {
                            email: req.body.data.email,
                            username: req.body.data.username
                        }
                    }, {
                        new: true
                    }, function (err, user) {
                        res.status(200);

                        res.json({
                            "token": user.generateJwt()
                        });

                        console.log("Worked!");
                    })
            }else{
                console.log("Non unique email");
                res.status(418);
                res.json({
                    "message": "Email already registered"
                })
            }
        });
    }
};

module.exports.updatePass = function (req, res) {
    console.log("Received request");
    console.log(req.body.data);

    if(!req.body.data.password || !req.body.data.currentPass){
        sendJSONresponse(res, 400, {
            "message": "Password required"
        });

        return;
    }

    console.log("validated");

    if(!req.body.data._id){
        res.status(401).json({
            message: "Unauthorized"
        });
    }else{
        User.findById(req.body.data._id, function(err, user){
            if(err){
                handleError(err);
                console.log("Error");
            }

            console.log("No error");
            console.log(user.email);
            console.log(user.checkPassword(req.body.data.currentPass));

            if(user.checkPassword(req.body.data.currentPass) == true){
                console.log("good pass");
                user.setPassword(req.body.data.password);
                user.save();

                res.status(200);

                res.json({
                    "message": "OK"
                });

                console.log("Worked");
            }else{
                res.status(401);
                res.json({
                    message: "Bad password"
                })
            }
        });
    }
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