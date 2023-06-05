const User = require('../models/user');

module.exports.profile = function (req, res) {
    // user sign in, then only redirect to profile page
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
            .then(user => {
                // if user found
                if(user){
                    return res.render('user_profile', {
                        title: "User Profile",
                        user: user
                    })
                }else{ 
                // if user not found
                    return res.redirect('/users/sign-in');
                }
            });
    }else{
        // else dont 
        return res.redirect('/users/sign-in');
    }
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
    /* STEPS TO AUTHENTICATE */
    // find the user
    User.findOne({email: req.body.email})
        .then(user => {
            // handle if user found    
            if(user){
                // handle if password doesn't match
                if(user.password != req.body.password){
                    console.log('Wrong Password !');
                    return res.redirect('back');
                }

                // handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');

            }else{
                // handle if user not found
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log('error in finding the user in signing in : ', err);
        });
};