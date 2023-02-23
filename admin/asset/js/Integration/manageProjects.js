
let manageProjects = document.getElementById("manageProjects");

async function getAllProjects(){
  
    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllProjects?perPage=1000000000`)    
    const allProjects = await response.json(); 
    let projects = allProjects.allAvailableProjects;
    console.log(projects) 
     
    if(projects.length === 0){
        manageProjects.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Project found!
            </div>
        
        `
    }

    else{

      const projectsTemplate = projects.map(myFunction).join(' ');

      function myFunction(eachProject) {

      return `
        <div class="blogBoxes blogBox1">
            <div class="blogImage">
                <img src="${eachProject.projectImage}" alt="" >
            </div>
            <div class="blogContent">
                <h3> <a href="updateProject.html?projectId=${eachProject._id}" style="cursor: pointer; font-family: poppins;">${eachProject.projectTitle}</a> </h3>
                <hr>

                <p class="ContentSection" style="font-family: calibri; color: #cba10a; font-weight: bold; padding: 15px 0px 10px; font-size: 16px;">
                 <a href="${eachProject.projectLink}" target="__blank" style="cursor: pointer; font-family: poppins;">${eachProject.projectLink}</a>
                </p>

                
                
                <button style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;"><a style="color: white;" href="updateProject.html?projectId=${eachProject._id}">Update Project</a></button> &nbsp;
                <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${eachProject._id}')">Delete Project</button>
            </div>
        </div>
      `
      }

      manageProjects.innerHTML = projectsTemplate;

}


}

getAllProjects()




//popup
const popupBox = document.getElementById("popupBox")
let projectIdDeletion;

function openPopup(project_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("projectIdDeletion", project_id)
    projectIdDeletion = localStorage.getItem("projectIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}


 
async function deleteProject(){
    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch("https://ernestruzindana-api.herokuapp.com/deleteProject/"+projectIdDeletion, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.deletedProject){
      location = "manageProjects.html"   
    }

}


