
const url = new URL(window.location.href);
const slug = url.searchParams.get('slug');
const category = url.searchParams.get('category');
let totalPosts;

async function postDetails(){ 

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`http://localhost:5000/getSinglePost?slug=${slug}`, getData)
    const fetchedData = await response.json() 
    const singlePost = fetchedData.fetchedPost;

    localStorage.setItem("postId", singlePost._id)

    const postTopContainer = document.getElementById("postTopContainer")
    let authorImageTemplate
    if(singlePost.postCreator.imageLink){
        authorImageTemplate = `<img src="${singlePost.postCreator.imageLink}" alt="">`
        }
    else{
        authorImageTemplate = `<div class="authorImageTemplate">
        ${singlePost.postCreator.firstName.charAt(0) + singlePost.postCreator.lastName.charAt(0)}
        </div>`         
        }
    postTopContainer.innerHTML =  `
    <div class="swiper-slide">
      <div class="slide-inner" style="background-image:url(${singlePost.postImage})"></div>
        <div class="banner_caption_text">
              <div class="post-category">
                  <ul>
                      <li class="cat-yellow"><a href="categoryPosts.html?category=${singlePost.categoryDetails.slug}" class="white">${singlePost.categoryDetails.name}</a></li>
                  </ul>
              </div>
              <h1><a href="blogDetails.html?slug=${singlePost.slug}&category=${singlePost.categoryDetails.slug}">${singlePost.title}</a></h1>
              <div class="item-meta">
                  <div class="blogAuthor blogAuthorAdvert">

                      ${authorImageTemplate}
                      <div>
                        <small><a href="authorPosts.html?userId=${singlePost.postCreator._id}" class="AuthorName">${singlePost.postCreator.firstName +' '+ singlePost.postCreator.lastName}</a></small>
                        <small> / ${singlePost.createdAt}</small>
                      </div>
                      
                  </div>
              </div>
          </div>
      `

    const singleBlogContentParagraph = document.getElementById("singleBlogContentParagraph")
    singleBlogContentParagraph.innerHTML = singlePost.postBody

    // const countLikes = document.getElementById("countLikes")
    // countLikes.innerHTML = `${singlePost.likes_count} `

    // Change like text
    // const postLike = document.getElementById("postLike")
    // if(fetchedData.fetchedPostDetails.liked_by_current_user == true){
    //     postLike.innerHTML = "Unlike"
    // }

    // Change the picture above the comment body

    // const commentorAvatar = document.getElementById("commentorAvatar")
	// const Token = JSON.parse(localStorage.getItem("token"))
	// if (!Token){
	// 	commentorAvatar.innerHTML = `<img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>`
	//    }
    // else{

    //     const userGetData = {
    //         method: "GET",
    //         headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    //     }

    //     let userResponse = await fetch("https://rockassociates-api.herokuapp.com/loggedInUser", userGetData)
    //     const userFetchedData = await userResponse.json()
    //     console.log(userFetchedData)

    //     if(userFetchedData.successMessage){
    //         if(userFetchedData.loggedInUser.imageLink){
    //             const commentorPicture = userFetchedData.loggedInUser.imageLink
    //             commentorAvatar.innerHTML = 
    //             `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
    //         }
    
    //         else{
    //             commentorAvatar.innerHTML = 
    //             ` <div class="authorImageCharts" id="authorImageCharts">
    //             ${userFetchedData.loggedInUser.firstName.charAt(0)+userFetchedData.loggedInUser.lastName.charAt(0)}
    //             </div>`
    //         }
    //     }
    // }


    return {"postInfo": singlePost, "otherPostDetails": fetchedData.fetchedPostDetails};
}

postDetails()
getRelatedPosts();
getRecommendedPosts();

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
// Get recommended posts

let recommendedPostsContainer = document.getElementById("recommendedPostsContainer");
async function getRecommendedPosts(){

    let response = await fetch(`http://localhost:5000/getAllPosts?perPage=10000000000`)    
    const allPosts = await response.json();
    let recommendedPosts = allPosts.allAvailablePosts; 
    let posts = recommendedPosts.filter(post => post.slug !== slug && post.categoryDetails.slug !== category);
    console.log(posts)

    if(posts.length === 0){
        recommendedPostsContainer.innerHTML = `
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

        recommendedPostsContainer.innerHTML = postTemplate;
            
        
        }

}


// Render related categories

const relatedCategoriesContainer = document.getElementById("relatedCategoriesContainer")
async function getAllRelatedCategories(){
  
    let response = await fetch("http://localhost:5000/getAllCategories")    
    const allCategories = await response.json(); 
    let relatedCategories = allCategories.allCategories;
    let categories = relatedCategories.filter(relatedCategory => relatedCategory.slug !== category);
     
    if(categories.length === 0){
        relatedCategoriesContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Categories added!
            </div>
        
        `
    }

    else{

      const categoriesTemplate = categories.map(myFunction).join(' ');

      function myFunction(eachCategory) {

      return `
      <a href="categoryPosts.html?category=${eachCategory.slug}" class="" >${eachCategory.name}</a>
      `
      }

      relatedCategoriesContainer.innerHTML = categoriesTemplate;

}


}

getAllRelatedCategories()

    




