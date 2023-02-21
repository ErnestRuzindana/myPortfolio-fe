

let updateDeletePost = document.getElementById("updateDeletePost");

async function getAllPosts(){
  
    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllPosts?perPage=1000000000`)    
    const allPosts = await response.json(); 
    let posts = allPosts.allAvailablePosts;
    console.log(posts) 
     
    if(posts.length === 0){
        updateDeletePost.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Post found!
            </div>
        
        `
    }

    else{

      const postsTemplate = posts.map(myFunction).join(' ');

      function myFunction(eachPost) {

      let authorTemplate;
      if(eachPost.postCreator.imageLink){
        authorTemplate = `<img src="${eachPost.postCreator.imageLink}" class="AuthorImage" id="authorProfilePicture" alt="">`
      }
      else{
        authorTemplate = `<div class="authorImageCharts" id="authorImageCharts">
        ${eachPost.postCreator.firstName.charAt(0) + eachPost.postCreator.lastName.charAt(0)}
        </div>`         
      }

      return `
        <div class="blogBoxes blogBox1">
            <div class="blogImage">
                <img src="${eachPost.postImage}" alt="" >
            </div>
            <div class="blogContent">
                <h3> <a href="updatePost.html?slug=${eachPost.slug}" style="cursor: pointer; font-family: poppins;">${eachPost.title}</a> </h3>
                <hr>
                <div class="blogAuthor">
                    ${authorTemplate}
                    <small><a href="" class="AuthorName">${eachPost.postCreator.firstName +' '+ eachPost.postCreator.lastName}</a></small>
                    <small> /${eachPost.createdAt}</small>
                </div>
                <p class="ContentSection" style="font-family: calibri; color: #cba10a; font-weight: bold; padding: 15px 0px 10px; font-size: 17px;">
                 ${eachPost.categoryDetails.name}
                </p>

                
                
                <button style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;"><a style="color: white;" href="updatePost.html?slug=${eachPost.slug}">Update post</a></button> &nbsp;
                <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${eachPost._id}')">Delete post</button>
            </div>
        </div>
      `
      }

      updateDeletePost.innerHTML = postsTemplate;

}


}

getAllPosts()
