
// All Posts with pagination

var posts = []
let pageSize = 5;
let currentPage = 1;
const searchTerm = document.getElementById("searchTerm")
const searchButton = document.getElementById("searchButton")
let keyword = ''


function hideBlogLoader(){
      blogLoader.classList.remove("show")
  }


async function renderPosts(page = 1){

    await getAllPosts(keyword)
    document.title = "Ernest Ruzindana"

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
    console.log(posts.length)

    if(posts.length == 0){
      paginatedPost = `
      <div class="noPostsDiv">
         No such post found
      </div>
`
   setTimeout(() => {history.go(0)}, 2500)
    }

    if(posts.length <= 5){
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    }

    posts.filter((row, index) => {
       let start = (currentPage - 1) * pageSize
       let end = currentPage * pageSize

       if(index >= start && index < end) return true;
    }).forEach(post => {
  
        const authorImage = post.authorImage 

        const str = "https" || "http"
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
                <h3> <a onclick="getSinglePost('${post._id}')" style="display: flex; align-items: center; cursor: pointer; font-family: poppins;">${post.title}</a> </h3>
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
                <a onclick="getSinglePost('${post._id}')" class="readmore" style="cursor: pointer; display: flex; align-items: center;">Read more &rarr;</a>
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
  document.title = "Loading..."
    if (currentPage > 1) {
      currentPage--;
      renderPosts(currentPage);
    }
  }
  
  function nextPage() {
    document.title = "Loading..."
    if ((currentPage * pageSize) < posts.length) {
      currentPage++;
      renderPosts(currentPage);
    }
  }

  function searchedPost() {
    document.title = "Loading..."
      keyword = searchTerm.value
      renderPosts(keyword);
    }
  

  function numPages() {
    return Math.ceil(posts.length / pageSize);
  }

  

  prevButton.addEventListener('click', previousPage, false);
  nextButton.addEventListener('click', nextPage, false);
  searchButton.addEventListener('click', searchedPost, false);
  

async function getAllPosts(searchKeyword){

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllPosts?keyword=" + searchKeyword, getData)
    const fetchedData = await response.json()
    hideBlogLoader()
    posts = fetchedData.allAvailablePosts;

    
}