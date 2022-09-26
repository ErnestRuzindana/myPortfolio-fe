async function getSinglePost(post_id){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("http://localhost:5000/getSinglePost/"+post_id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.fetchedPost){
        localStorage.setItem("post_id", fetchedData.fetchedPost._id)
        location = "updatePost.html"
    }
}




const post_id = localStorage.getItem("post_id")

async function getPostDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("http://localhost:5000/getSinglePost/"+post_id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)


    const singlePost = fetchedData.fetchedPost

    const updatePostImage = document.getElementById("updatePostImage")
    updatePostImage.src = singlePost.postImage
    
    const updateHeaderImage = document.getElementById("updateHeaderImage")
    updateHeaderImage.src = singlePost.headerImage

    const postTitleDetails = document.getElementById("postTitleDetails")
    postTitleDetails.value = singlePost.title

    const postBodyDetails = document.getElementById("summernote")
    postBodyDetails.innerHTML = singlePost.postBody
    console.log(postBodyDetails.value)
}

getPostDetails()