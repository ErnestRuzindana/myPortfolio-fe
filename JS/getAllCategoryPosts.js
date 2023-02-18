// Get related posts

let sameCategoryPostsContainer = document.getElementById("sameCategoryPostsContainer");
async function getRelatedPosts(){

    let response = await fetch(`http://localhost:5000/getAllPosts?perPage=10000000000&category=${category}`)    
    const allPosts = await response.json();
    let relatedPosts = allPosts.allAvailablePosts; 
    let posts = relatedPosts.filter(post => post.slug !== slug);
    console.log(posts)

    if(posts.length === 0){
        sameCategoryPostsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Post found!
            </div>
        
        `
    }

    else{
        const postTemplate = posts.map(myFunction).join(' ');

        function myFunction(eachPost) {

        return `
        <div class="widget-posts">
            <div class="post-thumb">
                <img src="${eachPost.postImage}" alt=".....">
            </div>
            <div class="post-title">
                <div class="widget-cats">
                    <a href="categoryPosts.html?category=${eachPost.categoryDetails.slug}">${eachPost.categoryDetails.name}</a>
                </div>
                <h4><a href="blogDetails.html?slug=${eachPost.slug}&category=${eachPost.categoryDetails.slug}">${eachPost.title}</a></h4>
            </div>
        </div>
        `
        }

        sameCategoryPostsContainer.innerHTML = postTemplate;
            
        
        }

}