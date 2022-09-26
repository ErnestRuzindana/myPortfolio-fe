
async function getAllPosts(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllPosts", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const posts = fetchedData.allAvailablePosts;

    for(let i=0; i<posts.length; i++){
        const postArray = posts[i];

        const title = postArray.title;
        const body = postArray.postBody.slice(0, 600)+"...";
        const image = postArray.postImage;
        const post_id = postArray._id;
        const date = postArray.dateCreated



        const blogPost = document.getElementById("blogPost");
        
        const postTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent">
                        <h3> <a id="${post_id}" onclick="getSinglePost('${post_id}')" style="cursor: pointer; font-family: poppins;">${title}</a> </h3>
                        <hr>
                        <div class="blogAuthor">
                            <img src="../images/Ruzindana.jpg" alt="" class="AuthorImage">
                            <small><a href="" class="AuthorName">Ernest Ruzindana</a></small>
                            <small> /${date}</small>
                        </div>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${body}
                        </p>
                        <p class="blogLikesComments">15 Likes . &nbsp;  &nbsp; 8 Comments</p>
                        <a id="${post_id}" onclick="getSinglePost('${post_id}')" class="readmore" style="cursor: pointer;">Read more &rarr; </a>
                    </div>
                </div>
        `
        
        blogPost.innerHTML += postTemplate
    }
}


getAllPosts()