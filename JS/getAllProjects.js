// Get all projects

let pageCount;
let projectsContainer = document.getElementById("projectsContainer");

async function getAllProjects(){

    const url = new URL(window.location.href);
    const getPageNumber = url.searchParams.get('page');
    getPageNumber ? pageCount = parseInt(getPageNumber) : pageCount = 1;

    let query = `?page=${pageCount}`;
  
    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllProjects`+query)    
    const allProjects = await response.json(); 
    let projects = allProjects.allAvailableProjects;
    console.log(projects) 

    if(projects.length === 0){
        projectsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Project added!
            </div>
        
        `
    }

    else{

      const projectsTemplate = projects.map(myFunction).join(' ');

      function myFunction(eachProject) {

      return `
        <div class="myWorkGridBox">
            <h4>${eachProject.projectTitle}</h4>
            <a href="${eachProject.projectLink}" target="_blank">
                <img src="${eachProject.projectImage}" alt="My Work Image">
            </a>
        </div>
      `
      }


            projectsContainer.innerHTML += projectsTemplate;
            
        
        }



//projects pagination

let projectsPagination = document.getElementById("projectsPagination");
let totalPages = allProjects.paginationDetails.totalPages;
let currentPage = allProjects.paginationDetails.currentPage;

function pagination(totalPages, currentPage){
    let paginationDetail = ''
    let beforePages = currentPage - 1;
    let afterPages = currentPage + 1;
    let liActive;

    if(currentPage > 1){
        paginationDetail += `<li class="prev" onclick="updateState(${pageCount-1})"><a><span class="fa fa-angle-left"></span> </a></li>`
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){

        if(pageLength > totalPages){
            continue;
        }
        if(pageLength == 0){
            pageLength = pageLength + 1;
        }

        if(currentPage == pageLength){
            liActive = 'activeProjects';
        }else{
            liActive = '';
        }

        paginationDetail += `<li class="${liActive}" onclick="updateState(${pageLength})" ><a>${pageLength}</a></li>`
    }

    if(currentPage < totalPages){
        paginationDetail += `<li onclick="updateState(${pageCount+1})" class="next"><a><span class="fa fa-angle-right"></span> </a></li>`
    }

    projectsPagination.innerHTML = paginationDetail
}

pagination(totalPages, currentPage)

}

getAllProjects();


function updateState(pageNumber){
    getAllProjects(pageCount = pageNumber)
    history.pushState(null, null, `?page=${pageNumber}`)
    location.reload();
    scrollToWork()
}


function scrollToWork() {
    const workSection = document.getElementById("work")
    var sectionPosition = workSection.offsetTop;
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  }


