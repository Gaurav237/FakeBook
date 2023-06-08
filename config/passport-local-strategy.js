const passport = require('passport');

// method of authentication
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    // here '_username' & '_password' are entered by user
    function(req, _email, _password, done){
        // find a user and establish its identity
        User.findOne({email: _email})
            .then(user => {
                // user not found OR password is wrong
                if(!user || user.password != _password){
                    req.flash('error', 'Invalid Username / Password');
                    return done(null, false);
                }

                // user found with correct password
                return done(null, user);
            })
            .catch(err => {
                req.flash('error', err);
                return done(err);
            });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('error in finding the user => Passport');
            return done(err);
        });
});


// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in, then pass on the request to next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user not signed in
    return res.redirect('/users/sign-in');
}

// sending user data to locals for views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user, fromthe session cookie,
        // and we are just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}

// export
module.exports = passport;