var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('./config');

// load up the user model
//var User = require('../app/models/user');
//var config = require('../config/database'); // get db config file

module.exports = function(passport) {
    var opts = {};
    // TODO: Change this to be more secure
    opts.secretOrKey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        done(null, {user:{id: jwt_payload.id}});
        /*User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });*/
    }));
};