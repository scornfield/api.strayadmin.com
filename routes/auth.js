var express = require('express');
var jwt = require("jwt-simple");  

var router = express.Router(); 

router.post('/login', function(req, res) {
	// Check for errors
	if (!req.body.username || !req.body.password) {
		return res.status(401).send({ success: false, message: 'Please enter a username and password.' });
	}

	var username = req.body.username;
    var password = req.body.password;

    // Authenticate ourselves
	User.authenticate(username, password).then(function(user) {
		// If we make it here, then we found a user!  Generate a token and respond.
		var payload = auth.makeToken(user.id);
	    var token = jwt.encode(payload, config.jwtSecret);

	    return res.json({ token: token });
	}).catch(function(msg) {
		// If we didn't find a user, then send an appropriate 401 and be done with this call
		return res.status(401).send({ success: false, message: msg });
	});
});

router.post('/register', function(req, res) {
	// Check for errors
	if (!req.body.email) {
		return res.json({success: false, message: 'Please enter your email address.'});
	} else if (!req.body.username || !req.body.password) {
		return res.json({success: false, message: 'Please enter your username and password.'});
	}

	// We are going to use Credential to encrypt the passwords
	var credential = require('credential');
	var pw = credential();
	var newPassword = req.body.password;

	// Generate a password hash
	pw.hash(newPassword, function (err, hash) {
		if (err) { throw err; }

		// Try to save the new user
		User.create({ email: req.body.email, username: req.body.username, password: hash }).then(function() {
			return res.json({success: true, message: 'Your account has been created. Sign in now!'});
		}).catch(function (err) {
	        console.log('Error occured: ', err);
	        return res.json({ success: false, message: 'A database error occurred.' });
		});
	});
});

module.exports = router;