// Use express
var express = require('express');

// Other Dependencies
var bodyParser  = require('body-parser');

// Initialize App
var app = express();

// Require our modules - we want these to be globally accessible
users = require("./config/users.js");  // Temporary until we have a database
config = require("./config/config.js");  
auth = require("./helpers/auth.js")(); 

// Require our routes
var authRoutes = require('./routes/auth'),
	leagueRoutes = require('./routes/leagues');

// App Configuration
app.disable('x-powered-by');

// Get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());

// TODO: Change this to return an error
app.get('/', function(req, res) {
	res.send('Hello World, this is the API running on Express');
});

// Authentication Routes
app.use('/auth', authRoutes);

// League Routes
app.use('/leagues', leagueRoutes);

// Start our app
app.listen(3000, function() {
	console.log('API listening on port 3000');
});
