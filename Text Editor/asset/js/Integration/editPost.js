const myKey = localStorage.getItem("myKey")

async function getPost(){
const getOptions = {
    
    method: 'GET',
    headers: {
    
     'auth-token': JSON.parse(sessionStorage.getItem('token'))
 
   },
}



let response = await fetch('http://localhost:5000/getSinglePost/'+myKey, getOptions)
const fetchedPost = await response.json();
console.log(fetchedPost)

const singlePost = fetchedPost.fetchedPost;

const postTitle = document.getElementById("postTitle")
postTitle.value = singlePost.title;

const postCategory = document.getElementById("postCategory")
postCategory.value = singlePost.category

const postImage = document.getElementById("postImage")
postImage.src = singlePost.imgLink;
postImage.style.display = "block"

const postBody = document.getElementById("postBody")
postBody.value = singlePost.body;

const postAuthorName = document.getElementById("postAuthorName")
postAuthorName.value = singlePost.authorName;

const authorImage = document.getElementById("authorImage")
authorImage.src = singlePost.authorImage;
authorImage.style.display = "block"

}

getPost()




// update a post


const postSubmitData = document.getElementById("postSubmitData");

const postMessage = document.getElementById("postMessage");
postMessage.style.display = "none";

postSubmitData.addEventListener("click", (event) =>{
    event.preventDefault();
    postMessage.style.display = "block";   
    postMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    updatePost();
});


function updatePost() {

    const postTitle = document.getElementById("postTitle");
    const postBody = document.getElementById("postBody");
    const postAuthorName = document.getElementById("postAuthorName");
    const postPostPicture = document.getElementById("postPicture")
    const postAuthorPicture = document.getElementById("postAuthorPicture")
    const postCategory = document.getElementById("postCategory")

    const formData = new FormData();
    formData.append("title", postTitle.value);
    formData.append("body", postBody.value);
    formData.append("authorName", postAuthorName.value);
    formData.append("category", postCategory.options[postCategory.selectedIndex].text);
    formData.append("author", postAuthorPicture.files[0]);
    formData.append("post", postPostPicture.files[0]);

    

    const UserRequestOptions = {
        method: 'PUT',
        body: formData,
        headers: {'auth-token': JSON.parse(sessionStorage.getItem('token'))},
     };
     
fetch('http://localhost:5000/updatePost/'+myKey, UserRequestOptions,)
.then(response => response.json())
.then((postFetchedData)=>{
    console.log(postFetchedData)

    if (postFetchedData.postUpdatedSuccess){
        postMessage.style.color = "green"
        postMessage.innerHTML = postFetchedData.postUpdatedSuccess

        const postImage = document.getElementById("postImage")
        postImage.src = postFetchedData.postContent.imgLink;

        const authorImage = document.getElementById("authorImage")
        authorImage.src = postFetchedData.postContent.authorImage;
    }

    else if (postFetchedData.postUpdatedError){
        postMessage.style.color = "red"
        postMessage.innerHTML = postFetchedData.postUpdatedError
    }

    else {
        postMessage.style.color = "red"
        postMessage.innerHTML = postFetchedData.message
    }
})
        
}