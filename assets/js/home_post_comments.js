
class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postItem = $(`#post-${postId}`);
        this.commentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
        
        
        // call for all the existing comments
        let self = this;
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let postCommentsSelf = this; // postCommentsSelf is to create a reference to the current instance of the PostComments class.

        this.commentForm.submit(function(e) {
            e.preventDefault();
            let self = this;  //   reference to the current HTML form element being submitted.

            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: $(self).serialize(),  // It traverses all form elements within the self context (the form element targeted by $(self)) and collects their values. 
                success: function(data) {
                    console.log(data);
                    let newComment = postCommentsSelf.newCommentDOM(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    
                    // add delete function usign AJAX
                    postCommentsSelf.deleteComment($(' .delete-comment-button', newComment));
                    
                    new Noty({
                        theme: 'metroui',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1200,
                        
                    }).show();
                }, 
                error: function(error){
                    console.log(error.responseText);
                }        
            });
        });
    }


    newCommentDOM(comment){
        return $(`
            <li id="comment-${ comment._id }">

                <p>
                    ${ comment.content }
                    <br>
                    <small>
                        ${ comment.user.name }
                    </small>
                    
                    <!-- Delete Comment Button  -->
                        <p>
                            <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">
                                <i class="fa fa-trash-o"></i>
                            </a>
                        </p>
                </p>
            
            </li>
        `);
    }

    deleteComment(deleteLink) {  // <a> tag
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'metroui',
                        text: 'Comment Deleted !',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1200,
                        animation: {
                            open: 'animated bounceInRight', // Animate.css class names
                            close: 'animated bounceOutRight' // Animate.css class names
                        }
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}