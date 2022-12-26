const viewAllPosts_preloader = document.getElementById("viewAllPosts_preloader")
function showviewAllPostsLoader(){
    viewAllPosts_preloader.classList.add("show")
}
function hideviewAllPostsLoader(){
    viewAllPosts_preloader.classList.remove("show")
}
showviewAllPostsLoader()
async function update_delete_post(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getAllPosts", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)
    hideviewAllPostsLoader()
    const posts = fetchedData.allAvailablePosts;

    for(let i=0; i<posts.length; i++){
        const postArray = posts[i];

        const title = postArray.title;
        const body = postArray.postBody.slice(0, 600)+"...";
        const image = postArray.postImage;
        const post_id = postArray._id;
        const date = postArray.dateCreated
        const authorName = postArray.authorName
        const authorImage = postArray.authorImage 

        const str = "http" || "https"
        var authorImageTemplate;
        if(authorImage.includes(str)){
           authorImageTemplate = 
           `<img src="${authorImage}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }
             
        else{
            authorImageTemplate = 
           ` <div class="authorImageCharts" id="authorImageCharts">
           ${authorImage}
           </div>`
        }



        const updateDeletePost = document.getElementById("updateDeletePost");
        
        const postTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent">
                        <h3> <a id="${post_id}" onclick="getSinglePost('${post_id}')" style="cursor: pointer; font-family: poppins;">${title}</a> </h3>
                        <hr>
                        <div class="blogAuthor">
                            ${authorImageTemplate}
                            <small><a href="" class="AuthorName">${authorName}</a></small>
                            <small> /${date}</small>
                        </div>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${body}
                        </p>

                        
                        
                        <button id="${post_id}" onclick="getSinglePost('${post_id}')" style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;">Update post</button> &nbsp;
                        <button  style="background: #ff6b6b; border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${post_id}')">Delete post</button>
                    </div>
                </div>
        `
        
        updateDeletePost.innerHTML += postTemplate
    }
}


update_delete_post()





