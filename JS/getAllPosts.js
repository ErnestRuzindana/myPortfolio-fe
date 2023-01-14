
// All Posts with pagination

var posts = []
let pageSize = 5;
let currentPage = 1;
const blogLoader = document.getElementById("blog_preloader")
  function showBlogLoader(){
      blogLoader.classList.add("show")
  }
  showBlogLoader()
  function hideBlogLoader(){
      blogLoader.classList.remove("show")
  }


async function renderPosts(page = 1){
    await getAllPosts()


    if (page == 1) {
        prevButton.style.display = "none";
      } else {
        prevButton.style.display = "block";
      }

    if (page == numPages()) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "block";
      }


    var paginatedPost = ""
    console.log(posts)

    posts.filter((row, index) => {
       let start = (currentPage - 1) * pageSize
       let end = currentPage * pageSize

       if(index >= start && index < end) return true;
    }).forEach(post => {
        
        const authorImage = post.authorImage 

        const str = "data:image" || "base64"
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

         console.log(post.postImage)
        paginatedPost += `
        <div class="blogBoxes blogBox1" id="postBox">

            <div class="blogImage">
                <img src="${post.postImage}" alt="" >
            </div>
            <div class="blogContent">
                <h3> <a onclick="getSinglePostTitle('${post._id}', '${post.title}')" style="display: flex; align-items: center; cursor: pointer; font-family: poppins;">${post.title} <span id="${post.title}" class="loadingDotsPostTitle"><img src="../images/loading.gif" alt="" width="45px" style="margin-left: 10px;"></span></a> </h3>
                <hr>
                <div class="blogAuthor">

                    ${authorImageTemplate}
                    <div>
                      <small><a href="" class="AuthorName">${post.authorName}</a></small>
                      <small> / ${post.dateCreated}</small>
                    </div>
                    
                </div>
                <p class="ContentSection" style="font-family: calibri;">
                    ${post.postBody.slice(0, 600)+"..."}
                </p>
                <a onclick="getSinglePost('${post._id}')" class="readmore" style="cursor: pointer; display: flex; align-items: center;">Read more &rarr; &nbsp;<span id="${post._id}" class="loadingDotsReadmore" style="margin-top: -3px;"><img src="../images/loading.gif" alt="" width="40px"></span></a>
            </div>
        </div>
`
    })

    const blogPost = document.getElementById("blogPost");
    blogPost.innerHTML = paginatedPost;

}
renderPosts()
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      renderPosts(currentPage);
    }
  }
  
  function nextPage() {
    if ((currentPage * pageSize) < posts.length) {
      currentPage++;
      renderPosts(currentPage);
    }
  }

  function numPages() {
    return Math.ceil(posts.length / pageSize);
  }

  

  prevButton.addEventListener('click', previousPage, false);
  nextButton.addEventListener('click', nextPage, false);

 
async function getAllPosts(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getAllPosts", getData)
    const fetchedData = await response.json()
    hideBlogLoader()
    posts = fetchedData.allAvailablePosts;
    
}


 

{/* <p class="blogLikesComments"><span>15</span> Likes . &nbsp;  &nbsp; <span>8</span> Comments</p> */}