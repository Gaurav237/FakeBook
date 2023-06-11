const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

// sign in and create a session for the user
//* Find the user and generate web token for the user 
module.exports.createSession = async function(req, res) {
    try{
        let user = await User.findOne({email: req.body.email});
        
        // user email not found || password dont match
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Invalid Username/Password'
            });
        }

        return res.status(200).json({
            message: 'Signed In Successfully, your token is also generated.',
            data: {
                token: jwt.sign(user.toJSON(), 'fakebook', {expiresIn: '1000000'})
            }
        });
    }catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }

}