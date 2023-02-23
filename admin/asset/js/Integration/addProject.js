// Add a project

const submitProject = document.getElementById("submitProject");
const projectMessage = document.getElementById("projectMessage");

projectMessage.style.display = "none"

submitProject.addEventListener("click", (event) =>{
    event.preventDefault();
    projectMessage.style.display = "block"
    submitProject.style.marginTop = "0px";
    projectMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    createProject();
});


async function createProject(){
    const projectImage = document.getElementById("projectImage");
    const projectTitle = document.getElementById("projectTitle");
    const projectLink = document.getElementById("projectLink");

    if (!projectImage.files[0]) {
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Please add a project image!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(projectImage.files[0])
     reader.addEventListener("load",()=>{
    const finalProjectImage = reader.result

    const data = {
        projectTitle: projectTitle.value, 
        projectLink: projectLink.value, 
        projectImage: finalProjectImage,
    }
        

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-api.herokuapp.com/createProject", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        projectMessage.style.color = "green"
        projectMessage.innerHTML = fetchedData.successMessage
        location = "manageProjects.html"
    }

    else if (fetchedData.validationError){
        projectMessage.style.color = "red"
        projectMessage.innerHTML = fetchedData.validationError
    }

    else{
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Something went wrong, we were unable to process this request!"
    }
})

    })
}