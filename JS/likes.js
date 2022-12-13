// Post Likes
const postLike = document.getElementById("postLike");

postLike.addEventListener("click", (event) =>{
    event.preventDefault(); 

    like();
});

const post__id = localStorage.getItem("postId")
const likesMessage = document.getElementById("likesMessage")
likesMessage.style.display = "none";
async function like(){
    const checkToken = JSON.parse(sessionStorage.getItem("token"))
	if (!checkToken){
		likesMessage.style.display = "block";
        likesMessage.innerHTML = `Please Login to Like a Post!`
	   }
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://myportfolio-be.netlify.app/login/loggedInUser", getData)
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

    fetch("https://myportfolio-be.netlify.app/likePost/"+post__id, sendData)
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

    let response = await fetch("https://myportfolio-be.netlify.app/getAllLikes/"+post__id, getData)
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

    let response = await fetch("https://myportfolio-be.netlify.app/login/loggedInUser", getData)
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

// function commentLikes(commentLikesButton){
//     commentLikesButton.addEventListener("click", (event) =>{
//         event.preventDefault(); 
    
//         likeComment();
//     });
// }

// const likesMessage = document.getElementById("likesMessage")
// likesMessage.style.display = "none";
async function likeComment(){
    // const checkToken = JSON.parse(sessionStorage.getItem("token"))
	// if (!checkToken){
	// 	likesMessage.style.display = "block";
    //     likesMessage.innerHTML = `Please <a href="login.html" style=" color: rgb(212, 19, 19); font-weight: bold;">Login</a> to Like a Post!`
	//    }
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://myportfolio-be.netlify.app/login/loggedInUser", getData)
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

    fetch("https://myportfolio-be.netlify.app/likeComment/"+post__id, sendData)
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

    let response = await fetch("https://myportfolio-be.netlify.app/getAllCommentLikes/"+post__id, getData)
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

    let response = await fetch("https://myportfolio-be.netlify.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const postLike = document.getElementById("postLike")
    if(likedUser == fetchedData._id){
        postLike.innerHTML = "Unlike"
    }

        
    }
}

getAllCommentLikes()