const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post_id)
        .then(post => {
            // if post present then add the comment on that post
            if(post){
                Comment.create({
                    content: req.body.post_content,
                    post: req.body.post_id,
                    user: req.user._id
                })
                .then(comment => {
                    // add this comment to that post
                    post.comments.push(comment);
                    post.save();  //  save the changes made to the post object back to the database
                
                    return res.redirect('/');
                })
                .catch(err => {
                    console.log('error in creating the comment');
                    return res.redirect('/');
                });
            }
        })
        .catch(err => {
            if(err){
                console.log('error in finding the post on which comment is done');
            }
        });
}