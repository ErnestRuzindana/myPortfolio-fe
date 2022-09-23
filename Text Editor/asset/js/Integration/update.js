


// Delete Post

let deletePost= async(myKey) => {
    const updateMessage = document.getElementById("updateMessage");
    updateMessage.style.display = "none";

    updateMessage.style.display = "block";   
    updateMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }



    let response = await fetch('http://localhost:5000/deletePost/'+myKey, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.deletedPost){ 
            updateMessage.style.color = "green";
            updateMessage.innerHTML = fetchDeletedPost.deletedPost
            setTimeout(()=>{location="updatePosts.html"}, 3000)
  
        }
        else{
            updateMessage.style.color = "red";
            updateMessage.innerHTML = fetchDeletedPost.message
        }
    
}


// Get Single Post

let getSinglePost= async(myKey) => {
    const updateMessage = document.getElementById("updateMessage");
    updateMessage.style.display = "none";

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }



    let response = await fetch('http://localhost:5000/getSinglePost/'+myKey, getOptions)
    const fetchSinglePost = await response.json();
    console.log(fetchSinglePost)

        if(fetchSinglePost.fetchedPost){ 
           location="editPost.html"
           localStorage.setItem("myKey", fetchSinglePost.fetchedPost._id)
        }

        else if(fetchSinglePost.postFetchedError){
            updateMessage.style.color = "red";
            updateMessage.innerHTML = fetchDeletedPost.postFetchedError
        }

        else{
            updateMessage.style.color = "red";
            updateMessage.innerHTML = fetchDeletedPost.message
        }
    
}





