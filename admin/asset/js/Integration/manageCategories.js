

let manageCategories = document.getElementById("manageCategories");

async function getAllCategories(){
  
    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllCategories`)    
    const allPosts = await response.json(); 
    let categories = allPosts.allCategories;
    console.log(categories) 
     
    if(categories.length === 0){
        manageCategories.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Category added!
            </div>
        
        `
    }

    else{

      const categoriesTemplate = categories.map(myFunction).join(' ');

      function myFunction(eachCategory) {

      return `
        <div class="blogBox1" style="padding: 40px; border-bottom: 1px solid black;">
            <div class="blogContent">
                <h3> <a style="cursor: pointer; font-family: poppins;">${eachCategory.name}</a> </h3>
                <hr>   
                
                <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${eachCategory._id}')">Remove Category</button>
            </div>
        </div>
      `
      }

      manageCategories.innerHTML = categoriesTemplate;

}


}

getAllCategories()



//popup
const popupBox = document.getElementById("popupBox")
let categoryIdDeletion;

function openPopup(category_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("categoryIdDeletion", category_id)
    categoryIdDeletion = localStorage.getItem("categoryIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}


 
async function deleteCategory(){
    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch("https://ernestruzindana-api.herokuapp.com/deleteCategory/"+categoryIdDeletion, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.successMessage){
      location = "manageCategories.html"   
    }

}


