const Post  = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
        
    Post.find({})
        .populate('user', 'name')  // only name & _id will be populated

        // NESTED population =>   to populate the comments field of a document.
        // Along with populating the comments field, the user field of each comment is also populated.
        .populate({  
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        .then(posts => {

            // fetch all users
            User.find({})
                .then(users => {
                    return res.render('home', {
                        title: 'Home',
                        posts: posts,
                        all_users: users
                    });
                })
                .catch(err => {
                    console.log('error in fetching Users from db');
                });
        })
        .catch(err => {
            console.log('error in fetching posts from db');
        });
}
