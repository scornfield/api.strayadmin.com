var User = sequelize.define('user', 
	{
		username: { type: Sequelize.STRING },
		password: { type: Sequelize.STRING },
		email: { type: Sequelize.STRING }
	}, { 
		tableName: 'users',
		timestamps: false
	}
);

User.authenticate = function(username, password) {
	return new Promise(function(resolve, reject) {
		User.findOne({ where: { 'username': username } }).then(function(user) {
			if(!user)
				return reject('User not found.')

			var credential = require('credential');
			var pw = credential();

			pw.verify(user.password, password, function (err, isValid) {
				if (err) { throw err; }
				
				
				if(isValid) {
					return resolve(user);
				} else {
					return reject('Password does not match.')
				}
			});
		});
	});
};

module.exports = User;