const Post  = require('../models/post');

module.exports.home = function(req, res){
        
    Post.find({})
        .populate('user', 'name')  // only name & _id will be populated
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
