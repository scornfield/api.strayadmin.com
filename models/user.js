// We modified the credential module due to deprecated method after upgrading Node
var credential = require('../helpers/credential2/credential.js');
var pw = credential();

var User = sequelize.define('user', 
	{
		// Fields
		username: { type: Sequelize.STRING },
		password: { type: Sequelize.STRING },
		email: { type: Sequelize.STRING }
	}, 
	{ 
		// Table Configuration
		tableName: 'user',
		timestamps: false
	}
);

// Helper function to hash the passwords on insert or update
function hashPassword (user, options) {
	if (!user.changed('password')) return;

	// Hash the password and update the user object
	return pw.hash(user.password).then(function (hash) {
		user.password = hash;
	});
}

// Set our hooks to hash the password appropriately
User.beforeUpdate(hashPassword);
User.beforeCreate(hashPassword);

// Extend the User model with a function to authenticate against the hashed credential
// Validates the user's credentials and returns a user object including permissions
// TODO: Add permission object onto the user object
User.authenticate = function(username, password) {
	return new Promise(function(resolve, reject) {
		User.findOne({ where: { 'username': username } }).then(function(user) {
			if(!user)
				return reject('User not found.')

			// Verify the password against our stored hash
			pw.verify(user.password, password, function (err, isValid) {
				if (err) { throw err; }
				
				if(isValid) 
					return resolve(user);
				return reject('Password does not match.')
			});
		});
	});
};

module.exports = User;