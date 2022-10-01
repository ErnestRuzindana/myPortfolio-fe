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
        localStorage.setItem("postBody", fetchedData.fetchedPost.postBody)
        location = "updatePost.html"
    }
}



// Getting a post

const post_id = localStorage.getItem("post_id")

async function getPostDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("http://localhost:5000/getSinglePost/"+post_id, getData)
    console.log(response)
    const fetchedData = await response.json()
    console.log(fetchedData)


    const singlePost = fetchedData.fetchedPost

    const updatePostImage = document.getElementById("updatePostImage")
    updatePostImage.src = singlePost.postImage
    
    const updateHeaderImage = document.getElementById("updateHeaderImage")
    updateHeaderImage.src = singlePost.headerImage

    const postTitleDetails = document.getElementById("postTitleDetails")
    postTitleDetails.value = singlePost.title
}
getPostDetails()

const getBody = localStorage.getItem("postBody");
const postBodyDetails = document.getElementById("summernote")
    postBodyDetails.innerHTML = getBody




// Updating Post
const submitBlog = document.getElementById("submitBlog");
const blogMessage = document.getElementById("blogMessage");

blogMessage.style.display = "none"

submitBlog.addEventListener("click", (event) =>{
    event.preventDefault();
    blogMessage.style.display = "block"

    blogMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    UpdatePost();
});


function UpdatePost(){
    const postImage = document.getElementById("postImage");
    const headerImage = document.getElementById("headerImage");
    const postTitleDetails = document.getElementById("postTitleDetails");
    const summernote = document.getElementById("summernote");


    const formData = new FormData();
        formData.append("postImage", postImage.files[0]);
        formData.append("headerImage", headerImage.files[0]);
        formData.append("title", postTitleDetails.value);
        // formData.append("postBody", summernote.innerHTML);
        const data = {
            postBody: summernote.innerHTML
        }


    const sendData = {
        method: "PUT",
        body: JSON.stringify(data), formData, 
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token"))})
    }

fetch("http://localhost:5000/updatePost/"+post_id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.postUpdateSuccess){
        blogMessage.style.color = "green"
        blogMessage.innerHTML = fetchedData.postUpdateSuccess

        const updatePostImage = document.getElementById("updatePostImage");
        updatePostImage.src = fetchedData.updatedPost.postImage


        const updateHeaderImage = document.getElementById("updateHeaderImage");
        updateHeaderImage.src = fetchedData.updatedPost.headerImage

        setTimeout(()=>{location = "blog.html"}, 2000)
    }

    else if(fetchedData.postUpdateError){
        blogMessage.style.color = "red"
        blogMessage.innerHTML = fetchedData.postUpdateError
    }

    else{
        blogMessage.style.color = "red"
        blogMessage.innerHTML = fetchedData.message 
    }
})
}




