async function getSinglePost(postId){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getSinglePost/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)


    if (fetchedData.fetchedPost){
        location = "singleBlog.html"
        localStorage.setItem("postId", fetchedData.fetchedPost._id)
    }
}


const postId = localStorage.getItem("postId")

async function postDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getSinglePost/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const singlePost = fetchedData.fetchedPost;

    const singleBlogTitle = document.getElementById("singleBlogTitle")
    singleBlogTitle.innerHTML = singlePost.title

    const singleBlogContentParagraph = document.getElementById("singleBlogContentParagraph")
    singleBlogContentParagraph.innerHTML = singlePost.postBody

    const headerPictureSource = document.getElementById("headerPictureSource")
    headerPictureSource.src = singlePost.headerImage

    const authorNameSingleBlog = document.getElementById("authorNameSingleBlog")
    authorNameSingleBlog.innerHTML = singlePost.authorName

    const dateCreatedSingleBlog = document.getElementById("dateCreatedSingleBlog")
    dateCreatedSingleBlog.innerHTML = `/ ${singlePost.dateCreated} `

    const singleBlogImageTemplate = document.getElementById("singleBlogImageTemplate")

    const str = "http" || "https"
    const authorImage = singlePost.authorImage

        if(authorImage.includes(str)){
            singleBlogImageTemplate.innerHTML = 
           `<img src="${authorImage}" alt="" class="authorImageSingleBlog" id="authorImageSingleBlog">`
        }
             
        else{
            singleBlogImageTemplate.innerHTML = 
           ` <div class="authorImageCharts" id="authorImageCharts">
           ${authorImage}
           </div>`
        }

	const commentorAvatar = document.getElementById("commentorAvatar")
	const Token = JSON.parse(sessionStorage.getItem("token"))
	if (!Token){
		commentorAvatar.innerHTML = `<img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>`
	   }

	//LoggedIn user
    const userGetData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let userResponse = await fetch("http://localhost:5000/login/loggedInUser", userGetData)
    const userFetchedData = await userResponse.json()
    console.log(userFetchedData)

    if(userFetchedData.imageLink){
        const commentorPicture = `http://localhost:5000/images/${userFetchedData.imageLink}`
        commentorAvatar.innerHTML = 
           `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
    }

    else{
        commentorAvatar.innerHTML = 
        ` <div class="authorImageCharts" id="authorImageCharts">
        ${userFetchedData.firstName.charAt(0)+userFetchedData.lastName.charAt(0)}
        </div>`
    }

}

postDetails()


//Fetch all comments
async function getAllComments(){

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllComments/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const comments = fetchedData.fetchedComments;
    console.log(comments.length)
    
    const countComments = document.getElementById("countComments")
    countComments.innerHTML = `<span>(${comments.length})</span>`
    
    const PostId = localStorage.getItem("postId")

    for(let i=0; i<comments.length; i++){
        const commentsArray = comments[i];  

        const body = commentsArray.commentBody;
        const comment_id = commentsArray._id;
        const date = commentsArray.dateCommented
        const commentorName = commentsArray.commentorName
        const commentorImage = commentsArray.commentorImage 

        const str = "http" || "https"
        var commentorImageTemplate;
        if(commentorImage.includes(str)){
           commentorImageTemplate = 
           `<img src="${commentorImage}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }
             
        else{
            commentorImageTemplate = 
           ` <div class="authorImageCharts" id="authorImageCharts">
           ${commentorImage}
           </div>`
        }

        const commentList = document.getElementById("list_comment");
        
        const commentTemplate = `
            <li class="box_result row">
            <div class="comments">
                <div class="avatar_comment col-md-1">
                    ${commentorImageTemplate}
                </div>
                <div class="result_comment col-md-11">
                    <h4>${commentorName} <span> &nbsp &nbsp/ ${date}</span></h4>
                    <p>${body}</p>
                    <div class="tools_comment">
                        <a class="like">Like</a>
                        <span aria-hidden="true"> · </span>
                        <a class="replay" id="${comment_id}" onclick="getSingleComment('${PostId}','${comment_id}')">Reply</a>
                        <span aria-hidden="true"> · </span>
                        <i class="fa fa-thumbs-o-up"></i> <span class="count">0</span> 
                        <span aria-hidden="true"> · </span>
                        <span>26m</span>
                    </div>
                    <ul class="child_replay">
                    
                    </ul>
                </div>
                
            </div>
        </li>
        `

        commentList.innerHTML += commentTemplate
    }
}


getAllComments()


//Comments

function submit_comment(){
  var comment = $('.commentar').val();
  el = document.createElement('li');
  el.className = "box_result row";
  el.innerHTML =
		'<div class=\"avatar_comment col-md-1\">'+
		  '<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
		'</div>'+
		'<div class=\"result_comment col-md-11\">'+
		'<h4>Anonimous</h4>'+ '<p>/ September, 27 2020</p>'+
		'<p>'+ comment +'</p>'+
		'<div class=\"tools_comment\">'+
		'<a class=\"like\" >Like</a><span aria-hidden=\"true\"> · </span>'+
		'<i class=\"fa fa-thumbs-o-up\"></i> <span class=\"count\">0</span>'+
		'<span aria-hidden=\"true\"> · </span>'+
		'<a class=\"replay\" >Reply</a><span aria-hidden=\"true\"> · </span>'+
			'<span>1m</span>'+
		'</div>'+
		'<ul class="child_replay"></ul>'+
		'</div>';
	document.getElementById('list_comment').prepend(el);
	$('.commentar').val('');
}

$(document).ready(function() {
	$('#list_comment').on('click', '.like', function (e) {
		$current = $(this);
		var x = $current.closest('div').find('.like').text().trim();
		var y = parseInt($current.closest('div').find('.count').text().trim());
		
		if (x === "Like") {
			$current.closest('div').find('.like').text('Unlike');
			$current.closest('div').find('.count').text(y + 1);
		} else if (x === "Unlike"){
			$current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		} else {
			var replay = $current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		}
	});
	
	$('#list_comment').on('click', '.replay', async function (e) {

        //LoggedIn user
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
        }

        let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
        const fetchedData = await response.json()
        console.log(fetchedData)


        var commentorPicture
        var commentorImageTemplate;

        if(fetchedData.imageLink){
            commentorPicture = `http://localhost:5000/images/${fetchedData.imageLink}`
            commentorImageTemplate = 
            `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }

        else{
            commentorPicture = fetchedData.firstName.charAt(0)+fetchedData.lastName.charAt(0)
            commentorImageTemplate = 
            ` <div class="authorImageCharts" id="authorImageCharts">
            ${fetchedData.firstName.charAt(0)+fetchedData.lastName.charAt(0)}
            </div>`
        }

		cancel_reply();
		$current = $(this);
		el = document.createElement('li');
		el.className = "box_reply row";
		el.innerHTML =
        `
			<div class="col-md-12 reply_comment">
				<div class="row">
					<div class="avatar_comment col-md-1\">
					  ${commentorImageTemplate}
					</div>
					<div class="box_comment col-md-10">
					  <textarea class="comment_replay" placeholder="Add a comment..."></textarea>
					  <div class="box_post">
						<div class="pull-right">
						  <button class="cancel" onclick="cancel_reply()" type="button">Cancel</button>
						  <button onclick="commentReply()" type="button" value="1">Reply</button>
						</div>
					  </div>
					</div>
				</div>
			</div>
        `
		$current.closest('li').find('.child_replay').prepend(el);
	});
});

function submit_reply(){
  var comment_replay = $('.comment_replay').val();
  el = document.createElement('li');
  el.className = "box_reply row";
  el.innerHTML =
		'<div class=\"avatar_comment col-md-1\">'+
		  '<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
		'</div>'+
		'<div class=\"result_comment col-md-11\">'+
		'<h4>Anonimous</h4>'+ '<p>/ September, 27 2020</p>'+
		'<p>'+ comment_replay +'</p>'+
		'<div class=\"tools_comment\">'+
		'<a class=\"like\">Like</a><span aria-hidden=\"true\"> · </span>'+
		'<i class=\"fa fa-thumbs-o-up\"></i> <span class=\"count\">0</span>'+
		'<span aria-hidden=\"true\"> · </span>'+
		'<a class=\"replay\" >Reply</a><span aria-hidden=\"true\"> · </span>'+
			'<span>1m</span>'+
		'</div>'+
		'<ul class="child_replay"></ul>'+
		'</div>';
	$current.closest('li').find('.child_replay').prepend(el);
	$('.comment_replay').val('');
	cancel_reply();
}

function cancel_reply(){
	$('.reply_comment').remove();
}