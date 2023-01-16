
const countUsers = document.getElementById("countUsers")
const countPosts = document.getElementById("countPosts")
var counterContainer = document.querySelector("#website-counter");
const countTraffic = document.getElementById("countTraffic")

async function users(){
    document.title = "Loading..."
    countUsers.innerHTML = `<img src="../../../images/spinner.gif" alt="" width="40px">`
    countPosts.innerHTML = `<img src="../../../images/spinner.gif" alt="" width="40px">`
    counterContainer.innerHTML = `<img src="../../../images/spinner.gif" alt="" width="40px">`
    countTraffic.innerHTML = `<img src="../../../images/spinner.gif" alt="" width="40px">`
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
// Registered Users
  let response = await fetch("https://ernestruzindana-be.cyclic.app/register/getRegisteredUsers", getData)
  const fetchedData = await response.json()
   
    const users = fetchedData.RegisteredUsers;

    countUsers.innerHTML = users.length;

// Number of posts
let postsResponse = await fetch("https://ernestruzindana-be.cyclic.app/getAllPosts", getData)
    const postsFetchedData = await postsResponse.json()

    const posts = postsFetchedData.allAvailablePosts;

    
    countPosts.innerHTML = posts.length;


    // Subscribers

let subscriptionResponse = await fetch("https://ernestruzindana-be.cyclic.app/getAllSubscriptions")
    
    const allResults = await subscriptionResponse.json(); 
    const results = allResults.subscribers;
counterContainer.innerHTML = results.length


// Client Messages
    let responseMessages = await fetch("https://ernestruzindana-be.cyclic.app/contact/getAllMessages")
    
    const allResultsMessages = await responseMessages.json(); 
    document.title = "Ernest Ruzindana | Dashboard"
    const resultsMessages = allResultsMessages.clientMessages.length;
    
    countTraffic.innerHTML = resultsMessages;
    
}



users()