async function users(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
// Registered Users
  let response = await fetch("http://localhost:5000/register/getRegisteredUsers", getData)
  const fetchedData = await response.json()
   
    const users = fetchedData.RegisteredUsers;
    
    const countUsers = document.getElementById("countUsers")
    countUsers.innerHTML = users.length;

// Number of posts
let postsResponse = await fetch("http://localhost:5000/getAllPosts", getData)
    const postsFetchedData = await postsResponse.json()

    const posts = postsFetchedData.allAvailablePosts;

    const countPosts = document.getElementById("countPosts")
    countPosts.innerHTML = posts.length;


    // Visits
var counterContainer = document.querySelector("#website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

// Adding onClick event listener
resetButton.addEventListener("click", () => {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
  counterContainer.innerHTML = visitCount;
});


// Web Traffic
const totalTraffic = users.length + posts.length + visitCount
const countTraffic = document.getElementById("countTraffic")

countTraffic.innerHTML = totalTraffic;
}



users()