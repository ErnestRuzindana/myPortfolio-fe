const submitComment = document.getElementById("submitComment");
const disableComment = document.getElementById("disableComment")
disableComment.style.display = "none";

submitComment.addEventListener("click", (event) =>{
    event.preventDefault(); 

    comment();
});

const post_id = localStorage.getItem("postId")
async function comment(){
    const checkToken = JSON.parse(sessionStorage.getItem("token"))
	if (!checkToken){
		disableComment.style.display = "block";
        disableComment.innerHTML = "Please Login to Comment!"
	   }
    const commentBody = document.getElementById("commentBody");
    
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const commentorNames = fetchedData.firstName +" "+ fetchedData.lastName

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

    //Date Created
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[today.getMonth()]
    today = month + ' ' + dd + ', ' + yyyy;


    //picture template

    const data = {
        commentBody: commentBody.value, 
        commentorName: commentorNames,
        commentorImage: commentorPicture,
        dateCommented: today
    }

    const sendData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("http://localhost:5000/createComment/"+post_id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    
})


// Highlight Comment

var comment = $('.commentar').val();
  el = document.createElement('li');
  el.className = "box_result row";
  el.innerHTML =
  `
  <li class="box_result row">
  <div class="comments">
    <div class="avatar_comment col-md-1">
        ${commentorImageTemplate}
    </div>
    <div class="result_comment col-md-11">
        <h4>${commentorNames} <span> &nbsp &nbsp/ ${today}</span></h4>
        <p>${comment}</p>
        <div class="tools_comment">
            <a class="like">Like</a>
            <span aria-hidden="true"> · </span>
            <a class="replay">Reply</a>
            <span aria-hidden="true"> · </span>
            <i class="fa fa-thumbs-o-up"></i> <span class="count">0</span> 
            <span aria-hidden="true"> · </span>
            <span>26m</span>
        </div>
        <ul class="child_replay"></ul>
    </div>
  </div>
</li>
`
	document.getElementById('list_comment').append(el);
	$('.commentar').val('');
}


// Get Single Comment
async function getSingleComment(postId, commentId){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch(`http://localhost:5000/getSingleComment/${postId}/${commentId}`, getData)
    const fetchedData = await response.json()

    if (fetchedData){
        localStorage.setItem("commentId", fetchedData.fetchedComment[0].comments[0]._id)
    }
}




//Reply on comments
const commentId = localStorage.getItem("commentId")
async function commentReply(){
    // const checkToken = JSON.parse(sessionStorage.getItem("token"))
	// if (!checkToken){
	// 	disableComment.style.display = "block";
    //     disableComment.innerHTML = "Please Login to Comment!"
	//    }
    var comment_replay = $('.comment_replay').val();
    
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const commentorNames = fetchedData.firstName +" "+ fetchedData.lastName

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

    //Date Created
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[today.getMonth()]
    today = month + ' ' + dd + ', ' + yyyy;


    //picture template

    const data = {
        replyBody: comment_replay, 
        replierName: commentorNames,
        replierImage: commentorPicture,
        dateReplied: today
    }

    const sendData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch(`http://localhost:5000/commentReply/${post_id}/${commentId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    // if(fetchedData){
    //     setTimeout(()=>{ history.go(0) }, 1000)
    // }
})


// Highlight Comment

  el = document.createElement('li');
  el.className = "box_reply row";
  el.innerHTML =
  `
  <li class="box_reply row">
  <div class="commentReplies">
    <div class="avatar_comment col-md-1">
        ${commentorImageTemplate}
    </div>
    <div class="result_comment col-md-11">
        <h4>${commentorNames} <span> &nbsp &nbsp/ ${today}</span></h4>
        <p>${comment_replay}</p>
    </div>
  </div>
</li>
`
    $current.closest('li').find('.child_replay').prepend(el);
    $('.comment_replay').val('');
    cancel_reply();
}



//show all replies

// async function getSingleComment(){
//     const getData = {
//         method: "GET",
//         headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
//     }

//     let response = await fetch(`http://localhost:5000/getSingleComment/${post_id}/${commentId}`, getData)
//     const fetchedData = await response.json()

//     const replies = fetchedData.fetchedComment[0].comments[0]
//     console.log(replies)
// }

// getSingleComment()

