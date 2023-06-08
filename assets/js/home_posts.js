// added this ajax so that on posting page does not reloads (its traditional way)
{   
    // method to submit form  data for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();
            var form = $(this)
            $.ajax({
                url: '/posts/create',
                type: 'post',
                data: newPostForm.serialize(),
                success: function(data){
                    // data => {data: {post}, message: "Post Created!"}
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list').prepend(newPost);

                    // Clear the form
                    // newPostForm[0].reset();
                }, 
                error : function (xhr, status, err) {
                    console.log(err);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDOM = function(post) {
        return $(`
            <li id="post-${post._id}">
                    <p>
                        <a class="delete-post-button" href="/posts/destroy/${post.id}">
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </p>

                <p><b>Content : </b> ${post.content} </p>
                <p><b>Created By : </b> ${post.user.name} </p>
                <p><b>Date : </b> ${post.createdAt.toISOString().substr(0,10)} </p>
                <p><b>Time : </b> ${post.updatedAt.toISOString().substr(11,5)} </p>
            </li>
            <div class="post-comments">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="post_content" placeholder="Type here to add comment ..." required>
                        <input type="hidden" name="post_id" value="${post._id}">
                        <input type="submit" value="comment">
                    </form> 
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
            </div>
        `);
    }

    createPost();
}