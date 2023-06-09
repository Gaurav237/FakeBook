// added this ajax so that on posting page does not reloads (its traditional way)
{   
    // method to submit form  data for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                url: '/posts/create',
                type: 'post',
                data: newPostForm.serialize(),
                success: function(data){
                    // data => {data: {post}, message: "Post Created!"}
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list').prepend(newPost);

                    // add delete using AJAX
                    // looks for elements with the class "delete-post-button" within the DOM structure of the newPost element.
                    deletePost($(' .delete-post-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: 'Post Published !',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
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
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </p>

                <p><b>Content : </b> ${post.content} </p>
                <p><b>Created By : </b> ${post.user.name} </p>
                <p><b>Date : </b> ${new Date(post.createdAt).toISOString().substr(0,10)} </p>
                <p><b>Time : </b> ${new Date(post.updatedAt).toISOString().substr(11,5)} </p>
            </li>
            <div class="post-comments">
                    <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
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

    // method to delete a post from DOM
    let deletePost = function (deleteLink) {  // here passed on the <a> tag (class="delete-post-button") as deleteLink.
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    //The data object is received as a response from the server,
                    // and the post_id property is accessed from it.
                    $(`#post-${data.data.post_id}`).remove();
                    
                    new Noty({
                        theme: 'relax',
                        text: 'Post Deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }


    createPost();
}