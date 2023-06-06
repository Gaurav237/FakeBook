const passport = require('passport');

// method of authentication
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    // here '_username' & '_password' are entered by user
    function(_email, _password, done){
        // find a user and establish its identity
        User.findOne({email: _email}, function(err, user){
            if(err){
                console.log('error in finding the user => Passport');
                return done(err);
            }

            // user not found OR password is wrong
            if(!user || user.password != _password){
                console.log('Invalid Username / Password');
                return done(null, false);
            }

            // user found with correct password
            return done(null, user);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding the user => Passport');
            return done(err);
        }
        return done(null, user);
    });
});

// export
module.exports = passport;