// Creating a post
const submitCategory = document.getElementById("submitCategory");
const categoryMessage = document.getElementById("categoryMessage");
const categoryName = document.getElementById("categoryName");
categoryMessage.style.display = "none"

submitCategory.addEventListener("click", (event) =>{
    event.preventDefault();
    categoryMessage.style.display = "block"
    submitCategory.style.marginTop = "0px";
    categoryMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    addCategory();
});


async function addCategory(){

    const data = {
        name: categoryName.value, 
    }
        

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-api.herokuapp.com/addCategory", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        categoryMessage.style.color = "green"
        categoryMessage.innerHTML = fetchedData.successMessage
        location = "manageCategories.html"
    }

    else if (fetchedData.validationError){
        categoryMessage.style.color = "red"
        categoryMessage.innerHTML = fetchedData.validationError
    }

    else if (fetchedData.duplicationError){
        categoryMessage.style.color = "red"
        categoryMessage.innerHTML = fetchedData.duplicationError
    }

    else{
        categoryMessage.style.color = "red"
        categoryMessage.innerHTML = "Something went wrong! We were unable to peform this request!"
    }


    })
}