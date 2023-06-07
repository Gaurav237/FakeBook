const Post  = require('../models/post');

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
            return res.render('home', {
                title: 'Home',
                posts: posts
            });
        })
        .catch(err => {
            console.log('error in fetching posts from db');
        });
}
