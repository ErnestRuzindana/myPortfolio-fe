const url = new URL(window.location.href);
const projectId = url.searchParams.get('projectId'); 

function removeupdatePostLoader(){
    updatePost_preloader.classList.remove("show")
    document.title = "Ernest Ruzindana"
}

async function getProjectDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getSingleProject?projectId=${projectId}`, getData)
    console.log(response)
    const fetchedData = await response.json() 
    // removeupdatePostLoader()
    const singleProject = fetchedData.fetchedProject

    const updateProjectImage = document.getElementById("updateProjectImage")
    updateProjectImage.src = singleProject.projectImage

    const projectTitle = document.getElementById("projectTitle")
    projectTitle.value = singleProject.projectTitle

    const projectLink = document.getElementById("projectLink")
    projectLink.value = singleProject.projectLink

    
}

getProjectDetails()



// Updating Post
const submitProject = document.getElementById("submitProject");
const projectMessage = document.getElementById("projectMessage");

projectMessage.style.display = "none"

submitProject.addEventListener("click", (event) =>{
    event.preventDefault();
    submitProject.style.marginTop = "0px";

    projectMessage.style.display = "block"
    projectMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    UpdateProject();
});


function UpdateProject(){
    const projectImage = document.getElementById("projectImage");
    const projectTitle = document.getElementById("projectTitle");
    const projectLink = document.getElementById("projectLink");
    

    if (projectImage.files.length && !projectImage.files[0]) {
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Please add a new project image or confirm the previous one to be able to edit a project!"
        return;
      }

    const data = {
      projectTitle: projectTitle.value, 
      projectLink: projectLink.value,
    }

    if (projectImage.files[0]){

    const reader =  new FileReader();
     reader.readAsDataURL(projectImage.files[0])
     reader.addEventListener("load",()=>{
      const finalPostImage = reader.result
      data.projectImage = finalPostImage;

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`https://ernestruzindana-api.herokuapp.com/updateProject?projectId=${projectId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.projectUpdateSuccess){
        projectMessage.style.color = "green"
        projectMessage.innerHTML = fetchedData.projectUpdateSuccess

        setTimeout(()=>{location = "manageProjects.html"}, 2000)
    }

    else if(fetchedData.ProjectUpdateError){
        projectMessage.style.color = "red"
        projectMessage.innerHTML = fetchedData.ProjectUpdateError
    }

    else{
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Something went wrong, we were unable to update this project!"
    }
  
      })

  })
} else{
    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`https://ernestruzindana-api.herokuapp.com/updateProject?projectId=${projectId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.projectUpdateSuccess){
        projectMessage.style.color = "green"
        projectMessage.innerHTML = fetchedData.projectUpdateSuccess

        const updateProjectImage = document.getElementById("updateProjectImage");
        updateProjectImage.src = fetchedData.projectImage

        setTimeout(()=>{location = "manageProjects.html"}, 2000)
    }

    else if(fetchedData.ProjectUpdateError){
        projectMessage.style.color = "red"
        projectMessage.innerHTML = fetchedData.ProjectUpdateError
    }

    else{
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Something went wrong, we were unable to update this project!"
    }
  
      })
}
}



    




