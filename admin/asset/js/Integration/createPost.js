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

    if (!postImage.files[0]) {
        postMessages.style.color = "red"
        postMessages.innerHTML = "Please add a post image!"
        return;
      }

      if (!headerImage.files[0]) {
        postMessages.style.color = "red"
        postMessages.innerHTML = "Please add a header image!"
        return;
    }
    
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const authorNames = fetchedData.firstName +" "+ fetchedData.lastName

    var authorPicture
    if(fetchedData.imageLink){
        authorPicture = fetchedData.imageLink
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

    
    const reader =  new FileReader();
     reader.readAsDataURL(postImage.files[0])
     reader.addEventListener("load",()=>{
    const finalPostImage = reader.result

    const reader2 =  new FileReader();
     reader2.readAsDataURL(headerImage.files[0])
     reader2.addEventListener("load",()=>{
        const finalHeaderImage = reader2.result

    const data = {
        title: postTitle.value, 
        postBody: postBody.value,
        authorName: authorNames,
        authorImage: authorPicture,
        postImage: finalPostImage,
        headerImage: finalHeaderImage,
        dateCreated: today
    }
        

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-be.cyclic.app/createPost", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        postMessages.style.color = "green"
        postMessages.innerHTML = fetchedData.successMessage
        location = "viewAllPosts"
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

     })
    })
}