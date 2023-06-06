const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    });
};

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'FakeBook | Sign Up'
    });
};

//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'FakeBook | Sign In'
    });
};

// to get the sign up data for the user
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                .then( newUser => {
                    console.log('New User Created : ', newUser);
                    return res.redirect('/users/sign-in');
                })
                .catch(err => {
                    console.log('error in creating the user while signing up : ', err);
                });

            }else{
                console.log('User with same email id already exists!');
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log('error in finding the user in signing up : ', err);
        })
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}