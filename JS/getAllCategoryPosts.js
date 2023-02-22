// Get posts by category
const url = new URL(window.location.href);
const category = url.searchParams.get('category');
const categoryName = url.searchParams.get('name');

let categoryPostsContainer = document.getElementById("categoryPostsContainer");
async function getCategoryPosts(){

    let response = await fetch(`https://ernestruzindana-api.herokuapp.com/getAllPosts?perPage=10000000000&category=${category}`)    
    const allPosts = await response.json();
    let posts = allPosts.allAvailablePosts; 
    console.log(posts)

    const categoryTitleName = document.getElementById("categoryTitleName")
    categoryTitleName.innerHTML = `${categoryName} Posts`

    if(posts.length === 0){
        categoryPostsContainer.innerHTML = `
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
            <div class="blog-post_wrapper image-wrapper">
                <div class="blog-post-image categoryImage">
                    <img src="${eachPost.postImage}" alt="image" class="img-responsive center-block post_img" />
                </div>
                <div class="post-content">
                    <div class="post-category">
                        <ul>
                            <li class="cat-red"><a href="categoryPosts?category=${eachPost.categoryDetails.slug}&name=${eachPost.categoryDetails.name}" class="white">${eachPost.categoryDetails.name}</a></li>
                        </ul>
                    </div>
                    <h3 class="entry-title mar-0">
                        <a href="blogDetails?slug=${eachPost.slug}&category=${eachPost.categoryDetails.slug}" class="white">${eachPost.title}</a>
                    </h3>

                </div>
            </div>
        </div>
        `
        }

        categoryPostsContainer.innerHTML = postTemplate;

          // Animate categories

          $('.slider-foods').slick({
            infinite: true,
            autoplay: true,
            arrows: false,
            dots: false,
            speed:3000,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                breakpoint: 991,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  }
                },  
                {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
              }
            ]
          });
            
        
        }

}


getCategoryPosts()
getAllRelatedCategories()

// Render related categories

const relatedCategoriesContainer = document.getElementById("relatedCategoriesContainer")
async function getAllRelatedCategories(){
  
    let response = await fetch("https://ernestruzindana-api.herokuapp.com/getAllCategories")    
    const allCategories = await response.json(); 
    let relatedCategories = allCategories.allCategories;
    let categories = relatedCategories.filter(relatedCategory => relatedCategory.slug !== category);
     
    if(categories.length === 0){
        relatedCategoriesContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Categories!
            </div>
        
        `
    }

    else{

      const categoriesTemplate = categories.map(myFunction).join(' ');

      function myFunction(eachCategory) {

      return `
      <a href="categoryPosts?category=${eachCategory.slug}&name=${eachCategory.name}" class="" >${eachCategory.name}</a>
      `
      }

      relatedCategoriesContainer.innerHTML = categoriesTemplate;

}


}

