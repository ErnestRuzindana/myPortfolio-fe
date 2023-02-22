// Get posts by category
const url = new URL(window.location.href);
const userId = url.searchParams.get('userId');
const firstName = url.searchParams.get('name');

let authorPostsContainer = document.getElementById("authorPostsContainer");
async function getAuthorPosts(){

    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllPosts?perPage=10000000000&userId=${userId}`)    
    const allPosts = await response.json();
    let posts = allPosts.allAvailablePosts; 
    console.log(posts)

    const authorPostsTitleName = document.getElementById("authorPostsTitleName")
    authorPostsTitleName.innerHTML = `All ${firstName}'s Posts`

    if(posts.length === 0){
        authorPostsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Post found!
            </div>
        
        `
    }

    else{
        const postTemplate = posts.map(myFunction).join(' ');

        function myFunction(eachPost) {

        return `
        <div class="col-md-4 col-sm-12" style="margin-bottom: 30px">
            <div class="blog-post_wrapper image-wrapper">
                <div class="blog-post-image categoryImage">
                    <img src="${eachPost.postImage}" alt="image" class="img-responsive center-block post_img" />
                </div>
                <div class="post-content">
                    <div class="post-category">
                        <ul>
                            <li class="cat-yellow"><a href="categoryPosts?category=${eachPost.categoryDetails.slug}&name=${eachPost.categoryDetails.name}" class="white">${eachPost.categoryDetails.name}</a></li>
                        </ul>
                    </div>
                    <div class="post-date">
                        <p><a href="#">${eachPost.createdAt}</a></p>
                    </div>
                    <h2 class="entry-title">
                        <a href="blogDetails?slug=${eachPost.slug}&category=${eachPost.categoryDetails.slug}" class="white">${eachPost.title}</a>
                    </h2>
                    <div class="item-meta white">
                        <span>by</span>
                        <a class="author-name white" href="authorPosts?userId=${eachPost.postCreator._id}&name=${eachPost.postCreator.firstName}">${eachPost.postCreator.firstName +' '+ eachPost.postCreator.lastName}</a>
                    </div>

                </div>
            </div>
        </div>
        `
        }

        authorPostsContainer.innerHTML = postTemplate;
 
        
        }

}


getAuthorPosts()
getOtherPosts()

// Render other posts

let otherAuthorPostsContainer = document.getElementById("otherAuthorPostsContainer");
async function getOtherPosts(){

    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllPosts?perPage=10000000000`)    
    const allPosts = await response.json();
    let otherPosts = allPosts.allAvailablePosts; 
    let posts = otherPosts.filter(post => post.postCreator._id !== userId);
    console.log(posts)

    const authorPostsTitleName = document.getElementById("authorPostsTitleName")
    authorPostsTitleName.innerHTML = `All ${firstName}'s Posts`

    if(posts.length === 0){
        otherAuthorPostsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Post found!
            </div>
        
        `
    }

    else{
        const postTemplate = posts.map(myFunction).join(' ');

        function myFunction(eachPost) {

        return `
        <div class="col-md-4 col-sm-12">
            <article class="post-list-main mar-bottom-20">
                <div class="entry-thumb">
                    <figure class="thumb-wrap">
                        <a href="blog-details">
                            <img src="${eachPost.postImage}" alt="post">
                        </a>
                    </figure>
                </div>
                <div class="content-entry-wrap">
                    <div class="entry-content">
                        <h4 class="entry-title mar-bottom-5">
                            <a href="blogDetails?slug=${eachPost.slug}&category=${eachPost.categoryDetails.slug}" style="color: #cba10a;">${eachPost.title}</a>
                        </h4>
                    </div>
                    <div class="entry-meta-content">
                        <div class="item-meta">
                            <span>by</span>
                            <a class="author-name" href="authorPosts?userId=${eachPost.postCreator._id}&name=${eachPost.postCreator.firstName}">${eachPost.postCreator.firstName +' '+ eachPost.postCreator.lastName}</a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        `
        }

        otherAuthorPostsContainer.innerHTML = postTemplate;
 
        
        }

}

