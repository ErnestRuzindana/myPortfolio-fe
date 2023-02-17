const postCategory = document.getElementById("postCategory");

//Get post categories
async function postCategoryFunction(){
    const getData = {
        method: "GET"
    }

    let response = await fetch("http://localhost:5000/getAllCategories", getData)
    const fetchedData = await response.json()
    const categories = fetchedData.allCategories;

    if(categories.length === 0){
        postCategory.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Services found!
            </div>
        
        `
    }

    else{

    for(let i=0; i<categories.length; i++){
        const categoryArray = categories[i];

        const category_id = categoryArray._id;
        const name = categoryArray.name;
        
        const categoryTemplate = `
        <option value="" id="${category_id}" >${name}</option>
        `
        
        postCategory.innerHTML += categoryTemplate
    }

}
}

postCategoryFunction()



// Creating a post
const submitPosts = document.getElementById("submitPost");
const postMessages = document.getElementById("postMessage");
const postImage = document.getElementById("postImage");
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("summernote");
postMessages.style.display = "none"

submitPosts.addEventListener("click", (event) =>{
    event.preventDefault();
    postMessages.style.display = "block"

    postMessages.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    createPost();
});


async function createPost(){

    if (!postImage.files[0]) {
        postMessages.style.color = "red"
        postMessages.innerHTML = "Please add a post image!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(postImage.files[0])
     reader.addEventListener("load",()=>{
    const finalPostImage = reader.result

    const data = {
        title: postTitle.value, 
        postBody: postBody.value,
        postImage: finalPostImage,
        category: postCategory.options[postCategory.selectedIndex].id,
    }
        

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
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

    else if (fetchedData.duplicationError){
        postMessages.style.color = "red"
        postMessages.innerHTML = fetchedData.duplicationError
    }

    else{
        postMessages.style.color = "red"
        postMessages.innerHTML = "Something went wrong! We were unable to peform this request!"
    }
})

    })
}