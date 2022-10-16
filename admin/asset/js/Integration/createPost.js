// Creating a post

const submitPosts = document.getElementById("submitPost");
const postMessages = document.getElementById("postMessage");

postMessages.style.display = "none"

submitPosts.addEventListener("click", (event) =>{
    event.preventDefault();
    postMessages.style.display = "block"

    postMessages.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    createPost();
});


async function createPost(){
    const postImage = document.getElementById("postImage");
    const headerImage = document.getElementById("headerImage");
    const postTitle = document.getElementById("postTitle");
    const postBody = document.getElementById("summernote");

    console.log(postBody)
    
    // //date
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();

    // today = mm + '/' + dd + '/' + yyyy;


    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const authorNames = fetchedData.firstName +" "+ fetchedData.lastName

    var authorPicture
    if(fetchedData.imageLink){
        authorPicture = `http://localhost:5000/images/${fetchedData.imageLink}`
    }

    else{
        authorPicture = fetchedData.firstName.charAt(0)+fetchedData.lastName.charAt(0)
    }
    

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[today.getMonth()]


    today = month + ' ' + dd + ', ' + yyyy;

    
    const formData = new FormData();
        formData.append("postImage", postImage.files[0]);
        formData.append("headerImage", headerImage.files[0]);
        formData.append("title", postTitle.value);
        formData.append("postBody", postBody.value);
        formData.append("authorName", authorNames)
        formData.append("authorImage", authorPicture)
        formData.append("dateCreated", today)
        


    const sendData = {
        method: "POST",
        body: formData,
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token"))})
    }

fetch("http://localhost:5000/createPost", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        postMessages.style.color = "green"
        postMessages.innerHTML = fetchedData.successMessage
        location = "viewAllPosts.html"
    }

    else if (fetchedData.validationError){
        postMessages.style.color = "red"
        postMessages.innerHTML = fetchedData.validationError
    }

    else{
        postMessages.style.color = "red"
        postMessages.innerHTML = fetchedData.message
    }
})
}