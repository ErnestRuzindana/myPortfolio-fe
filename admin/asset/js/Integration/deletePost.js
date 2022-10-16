async function deletePost(post_id){
    const deletePostMessage = document.getElementById("deletePostMessage");
    deletePostMessage.style.display = "none"

    deletePostMessage.style.display = "block"

    deletePostMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`


    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("http://localhost:5000/deletePost/"+post_id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.deletedPost){

        deletePostMessage.style.color = "green"
        
        deletePostMessage.innerHTML = fetchedData.deletedPost

        setTimeout(()=>{location = "viewAllPosts.html"}, 3000)

        
    }
}

