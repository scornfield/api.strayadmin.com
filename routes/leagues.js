var express = require('express');

var router = express.Router(); 

router.get('/', auth.authenticate(), function(req, res) {
	var user = users[req.user.id];

	if (!user) {
		return res.status(403).send({success: false, message: 'Authentication failed. User not found.'});
	} else {
		res.json({success: true, message: 'Welcome to the member area ' + user.username + '! ' });
	}
});

module.exports = router;