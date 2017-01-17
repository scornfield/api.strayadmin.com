// This key should get replaced, but save it anyway just so it's not blank
var secretKey = 'My$3cr3tK3y!';

// Generate a more secure
secretKey = require('crypto').randomBytes(128).toString('hex');

module.exports = {  
	// JSON Web Token Configuration
    jwtSecret: secretKey,
    jwtSession: {
        session: false
    },

    // Database Configuration
    dbHost: "localhost",
    dbName: "strayadmin",
    dbUser: "api_user"
};

