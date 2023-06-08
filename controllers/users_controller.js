const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.params.id)
        .then(user => {
            return res.render('user_profile', {
                title: 'User Profile',
                profile_user: user
            });
        })
        .catch(err => {
            req.flash('error', err);
            return res.redirect('back');
        })
};

//render the sign up page
module.exports.signUp = function(req, res){
    // restricting page access
    // once signed up, then we cant again go to sign-up OR sign-in page using url 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'FakeBook | Sign Up'
    });
};

//render the sign in page
module.exports.signIn = function(req, res){
    // restricting page access 
    // once signed in, then we cant again go to sign-up OR sign-in page using url 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'FakeBook | Sign In'
    });
};

// to get the sign up data for the user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Password & Confirm Password did not match !');
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({email: req.body.email});
        
        if(!existingUser) {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            req.flash('success' ,'Congratulations! You have successfully signed up. Welcome to our community! ');
            return res.redirect('/users/sign-in');

        }else{
            req.flash('error', 'User with same email id already exists!');
            return res.redirect('back');
        }

    } catch(err) {
        req.flash('error', err);
        return;
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged-In Successfully!');

    return res.redirect('/');
}

// sign out action
module.exports.destroySession = function(req, res, next){

    req.logout(err => {
        if(err){
            req.flash('error', err);
            return next(err);
        }
    });  

    req.session.save(() => {
        req.flash('success', 'You have been successfully logged out. Come back soon!');
        return res.redirect('/');
    });
}

// update action
module.exports.update = function(req, res){
    const userId = req.params.id;
    
    if(req.user.id == userId){

        User.findByIdAndUpdate(userId, {
            email: req.body.email,
            name: req.body.name,
        })
        .then( () => {
            req.flash('success', 'User information updated!');
            return res.redirect('back');
        })
        .catch( (err) => {
            req.flash('error', err);
            return res.redirect('back');
        });

    }else{
        return res.status(401).send('Unauthorized');
    }
}