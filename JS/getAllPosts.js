// Get all post members
let postAdvertContainer = document.getElementById("postAdvertContainer");

async function postsAdvertisment(){
        
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllPosts?perPage=1000000000", getData)
    
    const allPosts = await response.json(); 
    const results = allPosts.allAvailablePosts;

    if(results.length === 0){
       postAdvertContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Post found!
            </div>
        
        `
    }

    else{
        

        const postTemplate = results.map(myFunction).join(' ');

        function myFunction(eachPost) {

        let authorTemplate;
        if(eachPost.postCreator.imageLink){
          authorTemplate = `<img src="${eachPost.postCreator.imageLink}" alt="">`
        }
        else{
          authorTemplate = `<div class="authorImageTemplate">
          ${eachPost.postCreator.firstName.charAt(0) + eachPost.postCreator.lastName.charAt(0)}
          </div>`         
        }

        return `
        <div class="swiper-slide">
          <div class="slide-inner" style="background-image:url(${eachPost.postImage})"></div>
            <div class="banner_caption_text">
                  <div class="post-category">
                      <ul>
                          <li class="cat-yellow"><a href="categoryPosts.html?category=${eachPost.categoryDetails.slug}&name=${eachPost.categoryDetails.name}" class="white">${eachPost.categoryDetails.name}</a></li>
                      </ul>
                  </div>
                  <h1><a href="blogDetails.html?slug=${eachPost.slug}&category=${eachPost.categoryDetails.slug}">${eachPost.title}</a></h1>
                  <div class="item-meta">
                      <div class="blogAuthor blogAuthorAdvert">

                          ${authorTemplate}
                          <div>
                            <small><a href="authorPosts.html?userId=${eachPost.postCreator._id}&name=${eachPost.postCreator.firstName}" class="AuthorName">${eachPost.postCreator.firstName +' '+ eachPost.postCreator.lastName}</a></small>
                            <small class="postDate"> / ${eachPost.createdAt}</small>
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>
        `
        }

        postAdvertContainer.innerHTML = postTemplate;
    
      /*======= Main Slider Init =========*/

	var interleaveOffset = 0.5;
	var swiperOptions = {
  		loop: true,
  		speed: 3000,
  		grabCursor: true,
  		watchSlidesProgress: true,
  		mousewheelControl: true,
  		keyboardControl: true,
  		autoplay: true,
  		navigation: {
    		nextEl: ".swiper-button-next",
    		prevEl: ".swiper-button-prev"
  		},
  		autoplay: {
   	 		delay: 3000,
  		},
  		fadeEffect: {
    		crossFade: true
  		},
  		on: {
    		progress: function() {
      			var swiper = this;
      			for (var i = 0; i < swiper.slides.length; i++) {
        			var slideProgress = swiper.slides[i].progress;
        			var innerOffset = swiper.width * interleaveOffset;
        			var innerTranslate = slideProgress * innerOffset;
        			swiper.slides[i].querySelector(".slide-inner").style.transform =
        			"translate3d(" + innerTranslate + "px, 0, 0)";
      			}
    		},
    		touchStart: function() {
      			var swiper = this;
      			for (var i = 0; i < swiper.slides.length; i++) {
        			swiper.slides[i].style.transition = "";
      			}
    		},
    		setTransition: function(speed) {
      			var swiper = this;
      			for (var i = 0; i < swiper.slides.length; i++) {
        			swiper.slides[i].style.transition = speed + "ms";
        			swiper.slides[i].querySelector(".slide-inner").style.transition =
        			speed + "ms";
      			}
    		}
  		}
	};

	var swiperOptions1 = {
  		loop: true,
  		speed: 3000,
  		grabCursor: true,
  		watchSlidesProgress: true,
  		mousewheelControl: true,
  		keyboardControl: true,
  		navigation: {
    		nextEl: ".swiper-button-next",
    		prevEl: ".swiper-button-prev"
  		},
  		autoplay: {
    		delay: 300000,
  		},
  		fadeEffect: {
    		crossFade: true
  		},
  		on: {
    		progress: function() {
      			var swiper = this;
      			for (var i = 0; i < swiper.slides.length; i++) {
        			var slideProgress = swiper.slides[i].progress;
        			var innerOffset = swiper.width * interleaveOffset;
        			var innerTranslate = slideProgress * innerOffset;
        			swiper.slides[i].querySelector(".slide-inner").style.transform =
        			"translate3d(" + innerTranslate + "px, 0, 0)";
      			}
    		},
    		touchStart: function() {
      			var swiper = this;
      			for (var i = 0; i < swiper.slides.length; i++) {
        			swiper.slides[i].style.transition = "";
      			}
    		},
    		setTransition: function(speed) {
      			var swiper = this;
      			for (var i = 0; i < swiper.slides.length; i++) {
        			swiper.slides[i].style.transition = speed + "ms";
       	 			swiper.slides[i].querySelector(".slide-inner").style.transition =
        			speed + "ms";
      			}
    		}
  		}
	};

	var swiper = new Swiper(".swiper-container-1", swiperOptions1);
	var swiper = new Swiper(".swiper-container", swiperOptions);
    
    }

        }
        

postsAdvertisment();


// Get all posts

let pageCount;
let searchKeyword;
let postsContainer = document.getElementById("postsContainer");
async function getAllPosts(){

    const url = new URL(window.location.href);
    const getPageNumber = url.searchParams.get('page');
    getPageNumber ? pageCount = parseInt(getPageNumber) : pageCount = 1;
    searchKeyword = url.searchParams.get('keyword');
    let sortBy = url.searchParams.get('sortBy')
    let sortOrder = url.searchParams.get('sortOrder')

    let query = `?page=${pageCount}`;
    if (searchKeyword) {
        query += `&keyword=${searchKeyword}`;
    }

    if(sortBy){
        query += `&sortBy=${sortBy}`;
    }

    if(sortOrder){
        query += `&sortOrder=${sortOrder}`;
    }
  
    let response = await fetch(`http://localhost:5000/getAllPosts`+query)   
    window.scrollTo(0, 0); 
    const allPosts = await response.json(); 
    let posts = allPosts.allAvailablePosts;
    console.log(posts) 
     
    if(posts.length === 0){
        postsContainer.innerHTML = `
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
        authorTemplate = `<img src="${eachPost.postCreator.imageLink}" alt="">`
      }
      else{
        authorTemplate = `<div class="authorImageTemplate">
        ${eachPost.postCreator.firstName.charAt(0) + eachPost.postCreator.lastName.charAt(0)}
        </div>`         
      }

      return `
      <div class="blog-post_wrapper">
          <div class="blog-post-image">
              <img src="${eachPost.postImage}" class="img-responsive center-block post_img" />
          </div>
          <div class="post-content">
              <div class="post-category">
                  <ul>
                      <li class="cat-yellow"><a href="categoryPosts.html?category=${eachPost.categoryDetails.slug}&name=${eachPost.categoryDetails.name}" class="white">${eachPost.categoryDetails.name}</a></li>
                  </ul>
              </div>
              <div class="post-date">
                  <p><span>${eachPost.likes_count}</span> <i class="fa fa-thumbs-up"></i></p>
                  <p><span>${eachPost.comments_count}</span> <i class="fa fa-comments"></i></p>
              </div>
              <h2 class="entry-title">
                  <a href="blogDetails.html?slug=${eachPost.slug}&category=${eachPost.categoryDetails.slug}" class="">${eachPost.title}</a>
              </h2>
              <div class="item-meta">
                  <div class="blogAuthor">

                      ${authorTemplate}
                      <div>
                        <small><a href="authorPosts.html?userId=${eachPost.postCreator._id}&name=${eachPost.postCreator.firstName}" class="AuthorName">${eachPost.postCreator.firstName +' '+ eachPost.postCreator.lastName}</a></small>
                        <small class="postDate"> / ${eachPost.createdAt}</small>
                      </div>
                      
                  </div>
              </div>

          </div>
      </div>
      `
      }

      postsContainer.innerHTML = postsTemplate;

}

//posts pagination

let blogPagination = document.getElementById("blogPagination");

let totalPages = allPosts.paginationDetails.totalPages;
let currentPage = allPosts.paginationDetails.currentPage;

function pagination(totalPages, currentPage){
    let paginationDetail = ''
    let beforePages = currentPage - 1;
    let afterPages = currentPage + 1;
    let liActive;

    if(currentPage > 1){
        paginationDetail += `<li onclick="updateState(${pageCount-1})"><button class="prev" title="previous page">&#10094;</button></li>`
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){

        if(pageLength > totalPages){
            continue;
        }
        if(pageLength == 0){
            pageLength = pageLength + 1;
        }

        if(currentPage == pageLength){
            liActive = 'active';
        }else{
            liActive = '';
        }

        paginationDetail += `<li onclick="updateState(${pageLength})"><button class="${liActive}" title="current page">${pageLength}</button></li>`
    }

    if(currentPage < totalPages){
        paginationDetail += `<li onclick="updateState(${pageCount+1})"><button class="next" title="previous page">&#10095;</button></li>`
    }

    blogPagination.innerHTML = paginationDetail
}

pagination(totalPages, currentPage)

    }

getAllPosts();


// Search for a post

const searchField = document.getElementById("searchField");
const submitSearchRequest = document.getElementById("submitSearchRequest");

submitSearchRequest.addEventListener("click", (event) =>{
    event.preventDefault();

    updateSearchKeyword(searchField.value);
})


function updateState(pageNumber){
    getAllPosts(pageCount = pageNumber)

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('sortBy') && urlParams.has('sortOrder') || urlParams.has('page')) {
    urlParams.set('page', pageNumber);
    } else {
    urlParams.append('page', pageNumber);
    }

    history.pushState(null, null, `?${urlParams.toString()}`);

    location.reload();
}

function updateSearchKeyword(searchKeyword){
    getAllPosts(keyword = searchKeyword)
    // history.pushState(null, null, `?keyword=${searchKeyword}`)
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('sortBy') && urlParams.has('sortOrder')) {
    urlParams.set('keyword', searchKeyword);
    } else {
    urlParams.append('keyword', searchKeyword);
    }

    history.pushState(null, null, `?${urlParams.toString()}`);
    location.reload();
}

// delete search keyword on page refresh
window.addEventListener('load', function() {
    const pageUrl = new URL(window.location.href);
    const param = pageUrl.searchParams.get('keyword');
    if (param) {
      pageUrl.searchParams.delete('keyword');
      window.history.replaceState({}, '', pageUrl.toString());
    }
});


// Render post categories
const categoriesContainer = document.getElementById("categoriesContainer")
async function getAllCategories(){
  
    let response = await fetch("http://localhost:5000/getAllCategories")    
    const allCategories = await response.json(); 
    let categories = allCategories.allCategories;
     
    if(categories.length === 0){
        postsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Categories added!
            </div>
        
        `
    }

    else{

      const categoriesTemplate = categories.map(myFunction).join(' ');

      function myFunction(eachCategory) {

      return `
      <li><a href="categoryPosts.html?category=${eachCategory.slug}&name=${eachCategory.name}">${eachCategory.name}</a></li>
      `
      }

      categoriesContainer.innerHTML = categoriesTemplate;

}


}

getAllCategories()