var express = require('express');

var router = express.Router(); 

router.get('/', auth.authenticate(), function(req, res) {
	return res.json({success: true, message: 'Welcome to the member area ' + req.user.username + '!' });	
});

module.exports = router;