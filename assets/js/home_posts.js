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
                    console.log(data);
                }, 
                error : function (xhr, status, err) {
                    console.log(err);
                }
            });
        });
    }


    // method to create a post in DOM


    createPost();
}