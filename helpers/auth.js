var passport = require("passport");  
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        User.findById(payload.id).then(function(user) {
            if (!user) {
                return done(null, false, { message: 'Authentication failed. User not found.' });
            }

            return done(null, user);
        }).catch(function(err) {
            return done(new Error("User not found"), null);
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        },
        makeToken: function(userId) {
            return { id: userId }
        }
    };
};