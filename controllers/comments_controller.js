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


// for deleting comments
module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id)
        .then(comment => {
            if(comment.user == req.user.id){
                // we need to delete this comment && also from comments array in Post

                let postId = comment.post;

                // delete the post
                comment.deleteOne()
                    .then( (result) => {
                        // delete this comment id from Post comments array

                        // this pulls out the comment id from array matching with comment id
                        Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
                            .then( () => res.redirect('back') )
                            .catch( err => res.redirect('back') );
                    })
                    .catch( (err) => {
                        console.log('error in deleting the comment : ', err);
                        return res.redirect('back');
                    })
            }else{
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log('cant find the comment : ', err);
            return res.redirect('back');
        })
}