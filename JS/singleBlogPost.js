const postId = localStorage.getItem("postId")

function hideLoader(){
    loader.classList.remove("show")
}

async function postDetails(){  
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getSinglePost/"+postId, getData)
    const fetchedData = await response.json()
    hideLoader()
    document.title = "Ernest Ruzindana"
    
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

    const str = "https" || "http"
    const authorImage = singlePost.authorImage

        if(authorImage.includes(str)){
            singleBlogImageTemplate.innerHTML = 
           `<img src="${authorImage}" alt="" class="AuthorImage" id="authorImageSingleBlog">`
        }
             
        else{
            singleBlogImageTemplate.innerHTML = 
           ` <div class="authorImageChartsSingleBlog" id="authorImageCharts">
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

    let userResponse = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", userGetData)
    const userFetchedData = await userResponse.json()
    console.log(userFetchedData)

    if(userFetchedData.imageLink){
        const commentorPicture = userFetchedData.imageLink
        commentorAvatar.innerHTML = 
           `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
    }

    else{
        commentorAvatar.innerHTML = 
        ` <div class="authorImageChartsSingleBlog" id="authorImageCharts">
        ${userFetchedData.firstName.charAt(0)+userFetchedData.lastName.charAt(0)}
        </div>`
    }

}

postDetails()

async function getSinglePost(postId){
    document.title = "Loading..."
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getSinglePost/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)


    if (fetchedData.fetchedPost){
        location = "singleBlog.html"
        localStorage.setItem("postId", fetchedData.fetchedPost._id)
    }
}






//Fetch all comments
async function getAllComments(){

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getAllComments/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const comments = fetchedData.fetchedComments;
    // console.log(comments[0].commentReplies)
    
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
        const commentLikes = commentsArray.comment_likes.length;

     
        const str = "https" || "http"
        var commentorImageTemplate;
        if(commentorImage.includes(str)){
           commentorImageTemplate = 
           `<img src="${commentorImage}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }
             
        else{
            commentorImageTemplate = 
           ` <div class="authorImageChartsSingleBlog" id="authorImageCharts">
           ${commentorImage}
           </div>`
        }


        const replyTemplate = commentsArray.commentReplies.map(myFunction).join(' ');

        function myFunction(eachReply) {

            const string2 = "https" || "http"
            var replierImageTemplate;
            if(eachReply.replierImage.includes(string2)){
               replierImageTemplate = 
               `<img src="${eachReply.replierImage}" alt="" class="AuthorImage" id="authorProfilePicture">`
            }
                 
            else{
                replierImageTemplate = 
               ` <div class="authorImageChartsSingleBlog" id="authorImageCharts">
               ${eachReply.replierImage}
               </div>`
            }

        return `
		<li class="box_result row" id="">
            <div class="replies comments">
                <div class="avatar_comment col-md-1">
                  ${replierImageTemplate}
                </div>
                
                <div class="result_comment col-md-11">
                    <h4>${eachReply.replierName} <span> &nbsp &nbsp/ ${eachReply.dateReplied}</span></h4>
                    <p>${eachReply.replyBody}</p>
                </div>
                
            </div>
        </li>
        `
        }
        
        let likeText

        const likeToken = JSON.parse(sessionStorage.getItem("token"))
        
        if(likeToken){

        //LoggedIn user
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
        }

        

        let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
        
        
            const fetchedData = await response.json()
            console.log(fetchedData)
    
            const userLike = fetchedData._id

            if(commentsArray.comment_likes.includes(userLike)){
                likeText = "Unlike"
               }
    
               else{
                likeText = "Like"
               }
        }

        else{
            likeText = "Like"
        }
        
    

        const commentList = document.getElementById("list_comment");
        
        const commentTemplate = `
        <li class="box_result row" id="${comment_id}">
            <div class="comments">
                <div class="avatar_comment col-md-1">
                    ${commentorImageTemplate}
                </div>
                <div class="result_comment col-md-11">
                    <h4>${commentorName} <span> &nbsp &nbsp/ ${date}</span></h4>
                    <p>${body}</p>
                    
                    <div class="tools_comment">
                        <a class="like" onclick="likeComment('${comment_id}')">${likeText}</a>
                        <span aria-hidden="true"> · </span>
                        <i class="fa fa-thumbs-o-up"></i> <span class="count" id="count">${commentLikes}</span> 
                        <span aria-hidden="true"> · </span>
                        <a class="replay" id="${comment_id}" onclick="getSingleComment('${PostId}','${comment_id}')">Reply</a>
                    </div>
                    <ul class="child_replay" >
                      ${replyTemplate}
                    </ul>
                </div>
                
            </div>
        </li>
        `

        commentList.innerHTML += commentTemplate

    }
}


getAllComments()



$(document).ready(function() {
	$('#list_comment').on('click', '.like', function (e) {
		$current = $(this);
		var x = $current.closest('div').find('.like').text().trim();
		var y = parseInt($current.closest('div').find('.count').text().trim());
        const checkToken = JSON.parse(sessionStorage.getItem("token"))
        if (!checkToken){
            $current.prop('disabled', true);
           }
		else if (x === "Like") {
			$current.closest('div').find('.like').text('Unlike');
			$current.closest('div').find('.count').text(y + 1);
		} else if (x === "Unlike"){
			$current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1); 
		} 
        else {
			var replay = $current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		}
	});

    $('#listLikes').on('click', '.like', function (e) {
		$current = $(this);
		var x = $current.closest('div').find('.like').text().trim();
		var y = parseInt($current.closest('div').find('.count').text().trim());
        const checkToken = JSON.parse(sessionStorage.getItem("token"))
        if (!checkToken){
            $current.prop('disabled', true);
           }
		else if (x === "Like") {
			$current.closest('div').find('.like').text('Unlike');
			$current.closest('div').find('.count').text(y + 1);
		} else if (x === "Unlike"){
			$current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1); 
		} 
        else {
			var replay = $current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		}
	});

    $('#submitComment').on('click', '.postComments', function (e) {
		$current = $(this);
	
		var y = parseInt($current.closest('div').find('.countComments').text().trim());
        const checkToken = JSON.parse(sessionStorage.getItem("token"))
        if (!checkToken){
            $current.prop('disabled', true);
           }
		$current.closest('div').find('.countComments').text(y + 1);

	});

	
	$('#list_comment').on('click', '.replay', async function (e) {

        //LoggedIn user
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
        }

        let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
        const fetchedData = await response.json()
        console.log(fetchedData)


        var commentorPicture
        var commentorImageTemplate;

        if(fetchedData.imageLink){
            commentorPicture = fetchedData.imageLink
            commentorImageTemplate = 
            `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }

        else{
            commentorPicture = fetchedData.firstName.charAt(0)+fetchedData.lastName.charAt(0)
            commentorImageTemplate = 
            ` <div class="authorImageChartsSingleBlog" id="authorImageCharts">
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
		$current.closest('li').find('.child_replay').append(el);
        document.title = "Ernest Ruzindana"
	});

    //View Replies

    
});


function cancel_reply(){
	$('.reply_comment').remove();
}

function hideReplies(){
	$('.box_reply').hide();
}


