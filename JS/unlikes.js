// const postUnlike = document.getElementById("postUnlike");

// postUnlike.addEventListener("click", (event) =>{
//     event.preventDefault(); 

//     unlike();
// });

// const post___id = localStorage.getItem("postId")
// async function unlike(){
    
//     //LoggedIn user
//     const getData = {
//         method: "GET",
//         headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
//     }

//     let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
//     const fetchedData = await response.json()
//     console.log(fetchedData)

//     const userUnlike = fetchedData._id

//     const data = {
//         unlikingUser: userUnlike, 
//     }

//     const sendData = {
//         method: "PUT",
//         body: JSON.stringify(data),
//         headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
//     }

//     fetch("http://localhost:5000/unlikePost/"+post___id, sendData)
// .then(response => response.json())
// .then((fetchedData)=>{
//     console.log(fetchedData)

    
// })

// }

// //Fetch all unlikes
// async function getAllUnlikes(){

//     const getData = {
//         method: "GET",
//         headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
//     }

//     let response = await fetch("http://localhost:5000/getAllUnlikes/"+post___id, getData)
//     const fetchedData = await response.json()
//     console.log(fetchedData)

//     const unlikes = fetchedData.fetchedUnlikes;
//     console.log(unlikes.length)
    
//     const countUnlikes = document.getElementById("countUnlikes")
//     countUnlikes.innerHTML = `<span>(${unlikes.length})</span>`

// }

// getAllUnlikes()