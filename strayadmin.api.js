// Use express
var express = require('express');

// Initialize App
var app = express();

app.disable('x-powered-by');

// Other Dependencies
var bodyParser  = require('body-parser');
var jwt = require("jwt-simple");  
var auth = require("./auth.js")();  
var users = require("./config/users.js");  
var config = require("./config/config.js");  

// Get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());

// TODO: Change this to return an error
app.get('/', function(req, res) {
	res.send('Hello World, this is the API running on Express');
});

app.get('/leagues', auth.authenticate(), function(req, res) {
	var user = users[req.user.id];

	if (!user) {
		return res.status(403).send({success: false, message: 'Authentication failed. User not found.'});
	} else {
		res.json({success: true, message: 'Welcome to the member area ' + user.username + '! ' });
	}
});

app.post('/auth/login', function(req, res) {
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

app.post('/auth/register', function(req, res) {
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

app.listen(3000, function() {
	console.log('API listening on port 3000');
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
