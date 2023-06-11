const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'fakebook'  // used to encrypt & decrypt
}

passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id)
        .then(user => {
            if(user){
                console.log(jwtPayload);
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
        .catch(err => {
            console.log('error in finding user from JWT');
            return;
        })
}));

module.exports = passport;