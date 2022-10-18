const postLike = document.getElementById("postLike");

postLike.addEventListener("click", (event) =>{
    event.preventDefault(); 

    like();
});

const post__id = localStorage.getItem("postId")
async function like(){
    
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const userLike = fetchedData._id

    const data = {
        likingUser: userLike, 
    }

    const sendData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("http://localhost:5000/likePost/"+post__id, sendData)
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

    let response = await fetch("http://localhost:5000/getAllLikes/"+post__id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const likes = fetchedData.fetchedLikes;
    console.log(likes.length)
    
    const countLikes = document.getElementById("countLikes")
    countLikes.innerHTML = `<span>(${likes.length})</span>`

}

getAllLikes()