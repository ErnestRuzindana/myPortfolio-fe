async function users(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
// Registered Users
  let response = await fetch("https://ernestruzindana-be.cyclic.app/register/getRegisteredUsers", getData)
  const fetchedData = await response.json()
   
    const users = fetchedData.RegisteredUsers;
    
    const countUsers = document.getElementById("countUsers")
    countUsers.innerHTML = users.length;

// Number of posts
let postsResponse = await fetch("https://ernestruzindana-be.cyclic.app/getAllPosts", getData)
    const postsFetchedData = await postsResponse.json()

    const posts = postsFetchedData.allAvailablePosts;

    const countPosts = document.getElementById("countPosts")
    countPosts.innerHTML = posts.length;


    // Subscribers
var counterContainer = document.querySelector("#website-counter");
let subscriptionResponse = await fetch("https://ernestruzindana-be.cyclic.app/getAllSubscriptions")
    
    const allResults = await subscriptionResponse.json(); 
    const results = allResults.subscribers;

counterContainer.innerHTML = results.length


// Web Traffic
const totalTraffic = users.length + posts.length + results.length
const countTraffic = document.getElementById("countTraffic")

countTraffic.innerHTML = totalTraffic;
}



users()