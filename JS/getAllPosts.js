
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
        const body = postArray.postBody;
        const image = postArray.postImage;
        const postId = postArray._id;


        const blogPost = document.getElementById("blogPost");
        
        const postTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent">
                        <h3> <a href="singleBlog.html">${title}</a> </h3>
                        <hr>
                        <div class="blogAuthor">
                            <img src="../images/Ruzindana.jpg" alt="" class="AuthorImage">
                            <small><a href="" class="AuthorName">Ernest Ruzindana</a></small>
                            <small> /July 07, 2022</small>
                        </div>
                        <p class="ContentSection">
                            ${body}
                        </p>
                        <p class="blogLikesComments">15 Likes . &nbsp;  &nbsp; 8 Comments</p>
                        <a href="singleBlog.html" class="readmore">Read more &rarr; </a>
                    </div>
                </div>
        `
        
        blogPost.innerHTML += postTemplate
    }
}

getAllPosts()
