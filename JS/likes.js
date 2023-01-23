// Post Likes
const postLike = document.getElementById("postLike");
const popupBoxLikes = document.getElementById("popupBoxLikes")
const popupBoxCommentLikes = document.getElementById("popupBoxCommentLikes")

postLike.addEventListener("click", (event) =>{
    event.preventDefault(); 

    like();
});

function closePopupSingleBlog(){
    popupBoxLikes.classList.remove("open-popup")
}

function closePopupCommentLikes(){
    popupBoxCommentLikes.classList.remove("open-popup")
}

function goToLogin(){
    location = "login"
}

const post__id = localStorage.getItem("postId")
const checkTokenLikes = JSON.parse(sessionStorage.getItem("token"))

async function like(){
    
	if (!checkTokenLikes){
        popupBoxLikes.classList.add("open-popup")
	   }
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const userLike = fetchedData._id

    const data = {
        blog_id: post__id,
        user_id: userLike 
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("https://ernestruzindana-be.cyclic.app/likePost/"+post__id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

   
})

}

//Fetch all likes
async function getAllLikes(){

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getAllLikes/"+post__id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const likes = fetchedData.fetchedLikes;
    console.log(likes)
    const countLikes = document.getElementById("countLikes")
    countLikes.innerHTML = `<span>${likes.length}</span>`


    for(let i=0; i<=likes.length; i++){
        const likedUser = likes[i]
        
        //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const postLike = document.getElementById("postLike")
    if(likedUser == fetchedData._id){
        postLike.innerHTML = "Unlike"
    }

        
    }
}

getAllLikes()




// Comment Likes

async function likeComment(comment__id){

    if (!checkTokenLikes){
        popupBoxCommentLikes.classList.add("open-popup")
	   }
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const userLike = fetchedData._id

    const data = {
        user_id: userLike,
        comment_id: comment__id  
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch(`https://ernestruzindana-be.cyclic.app/likeComment/${post__id}/${comment__id}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

   
})

}


//Fetch all likes
async function getAllCommentLikes(){

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getAllCommentLikes/"+post__id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const likes = fetchedData.fetchedLikes;
    console.log(likes)
    const countLikes = document.getElementById("count")
    countLikes.innerHTML = `<span>${likes.length}</span>`


    for(let i=0; i<=likes.length; i++){
        const likedUser = likes[i]
        
        //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const postLike = document.getElementById("postLike")
    if(likedUser == fetchedData._id){
        postLike.innerHTML = "Unlike"
    }

        
    }
}

getAllCommentLikes()

