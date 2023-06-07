const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(post => {
        console.log('post created successfully : ', post);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in creating the post');
    });
}

// `delete post & all its comments` controller
module.exports.destroy = function(req, res) {
    Post.findById(req.params.id)
        .then(post => {
            // .id is string converted from ObjectId(._id)
            // post.user by default contains user id in string format only (if not populated)
            if(post.user == req.user.id){   
                post.deleteOne()
                    .then( () => {
                        // delete all comments of that post
                        Comment.deleteMany({post: req.params.id})
                        .then(result => {
                            console.log(`${result.deletedCount} comments deleted.`);
                            return res.redirect('back');
                        })
                        .catch(err => {
                            console.log('error in deleting comments');
                            return res.redirect('back');
                        });

                    })
                    .catch( (err) => {
                        console.log('error deleting post : ', err);
                        return res.redirect('back');
                    });

            }else{
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log('error in finding the post : ', err);
            return res.redirect('back');
        });
}