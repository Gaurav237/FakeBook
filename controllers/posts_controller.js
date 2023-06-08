const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        console.log('Post created successfully : ', post);
        return res.redirect('back');

    } catch(err) {
        console.log('Error : ', err);
        return;
    }
}

// `delete post & all its comments` controller
module.exports.destroy = async function(req, res) {

    try {
        let post = await Post.findById(req.params.id);

        // * .id is string converted from ObjectId(._id)
        // * post.user by default contains user id in string format only (if not populated)
        if(post.user == req.user.id){   
            
            post.deleteOne();
            console.log('post deleted');
            
            // delete all comments of that post
            let comments = await Comment.deleteMany({post: req.params.id});
            console.log(`${comments.deletedCount} comments deleted.`);

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    } catch(err) {
        console.log('Error : ', err);
        return;
    }
}