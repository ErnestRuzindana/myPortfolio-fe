const postIdDeletion = localStorage.getItem("postIdDeletion")
async function deletePost(){

    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("https://ernestruzindana-be.cyclic.app/deletePost/"+postIdDeletion, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.deletedPost){
      location = "viewAllPosts.html"   
    }
}



//popup
const popupBox = document.getElementById("popupBox")

function openPopup(post_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("postIdDeletion", post_id)
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}

