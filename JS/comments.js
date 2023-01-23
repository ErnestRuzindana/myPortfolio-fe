const submitComment = document.getElementById("submitComment");
const popupBoxComments = document.getElementById("popupBoxComments")
const popupBoxCommentsValidation = document.getElementById("popupBoxCommentsValidation")
const popupBoxCommentsReplies = document.getElementById("popupBoxCommentsReplies")
const popupBoxCommentsRepliesValidation = document.getElementById("popupBoxCommentsRepliesValidation")

submitComment.addEventListener("click", (event) =>{
    event.preventDefault(); 

    comment();
});

function goToLogin(){
    location = "login"
}

function closePopupComments(){
    popupBoxComments.classList.remove("open-popup")
}

function closePopupCommentsValidation(){
    popupBoxCommentsValidation.classList.remove("open-popup")
}

function closePopupCommentsReplies(){
    popupBoxCommentsReplies.classList.remove("open-popup")
}

function closePopupCommentsRepliesValidation(){
    popupBoxCommentsRepliesValidation.classList.remove("open-popup")
}

const post_id = localStorage.getItem("postId")
const checkToken = JSON.parse(sessionStorage.getItem("token"))

async function comment(){
    document.title = "Loading..."
	if (!checkToken){
		popupBoxComments.classList.add("open-popup")
	   }
    const commentBody = document.getElementById("commentBody");
    
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const commentorNames = fetchedData.firstName +" "+ fetchedData.lastName

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

    fetch("https://ernestruzindana-be.cyclic.app/createComment/"+post_id, sendData)
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
            <a class="" onclick="refreshPage()">Like</a>
            <span aria-hidden="true"> · </span>
            <i class="fa fa-thumbs-o-up"></i> <span class="count" id="count">0</span> 
            <span aria-hidden="true"> · </span>
            <a class="replay" onclick="refreshPage()">Reply</a>
        </div>
        <ul class="child_replay" style="display: flex; flex-direction: column-reverse;"></ul>
    </div>
  </div>
</li>
`
    if(comment == ""){
        popupBoxCommentsValidation.classList.add("open-popup")
        document.getElementById('list_comment').disabled = true
        document.title = "Ernest Ruzindana"
    }

    else{
        document.getElementById('list_comment').append(el);
        $('.commentar').val('');
        document.title = "Ernest Ruzindana"
    }

	
}

function refreshPage(){
    history.go(0)
}


let commentId;
// Get Single Comment
async function getSingleComment(postId, comment_Id){
    document.title = "Loading..."
    if (!checkToken){
		popupBoxCommentsReplies.classList.add("open-popup")
	   }

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch(`https://ernestruzindana-be.cyclic.app/getSingleComment/${postId}/${comment_Id}`, getData)
    const fetchedData = await response.json()

    if (fetchedData){
        localStorage.setItem("commentId", fetchedData.fetchedComment[0].comments[0]._id)
        commentId = localStorage.getItem("commentId")
    }
}


//Reply on comments

async function commentReply(){
    document.title = "Loading..."
    var comment_replay = $('.comment_replay').val();
    
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const commentorNames = fetchedData.firstName +" "+ fetchedData.lastName

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

    //Date Created
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[today.getMonth()]
    today = month + ' ' + dd + ', ' + yyyy;


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

    if(comment_replay == ""){
        popupBoxCommentsRepliesValidation.classList.add("open-popup")
        $current.closest('li').find('.child_replay').disabled = true
        document.title = "Ernest Ruzindana"
    }

    else{
        $current.closest('li').find('.child_replay').append(el);
        $('.comment_replay').val('');
        document.title = "Ernest Ruzindana"
        cancel_reply();
    }

        

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

    fetch(`https://ernestruzindana-be.cyclic.app/commentReply/${post_id}/${commentId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

})

    }



// show all replies

async function getAllReplies(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch(`https://ernestruzindana-be.cyclic.app/getSingleComment/${post_id}/${commentId}`, getData)
    const fetchedData = await response.json()

    const replies = fetchedData.fetchedComment[0].comments[0].commentReplies

    console.log(replies)
}

getAllReplies()

