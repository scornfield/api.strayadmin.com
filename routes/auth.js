var express = require('express');
var jwt = require("jwt-simple");  

var router = express.Router(); 

router.post('/login', function(req, res) {
	if (!req.body.username || !req.body.password) {
		res.status(401).send({ success: false, message: 'Please enter a username and password.' });
	} else {
		var username = req.body.username;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.username === username && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id, username: user.username
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        } else {
			res.status(401).send({ success: false, message: 'Invalid username or password.' });
        }
	}
});

router.post('/register', function(req, res) {
	if (!req.body.email) {
		res.json({success: false, message: 'Please enter your email address.'});
	} else if (!req.body.username || !req.body.password) {
		res.json({success: false, message: 'Please enter your username and password.'});
	} else if (!req.body.password != !req.body.confirm_password) {
		res.json({success: false, message: 'Your password and confirmation do not match.'});
	} else {
		return res.json({success: true, message: 'Successfully created new user.'});
		/*
		var newUser = new User({
			name: req.body.name,
			password: req.body.password
		});

		// save the user
		newUser.save(function(err) {
			if (err) {
				return res.json({success: false, msg: 'Username already exists.'});
			}
			res.json({success: true, msg: 'Successful created new user.'});
		});*/
	}
});

module.exports = router;