
// All Posts with pagination

var posts = []
let pageSize = 1;
let currentPage = 1;

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

        paginatedPost += `
        <div class="blogBoxes blogBox1" id="postBox">

            <div class="blogImage">
                <img src="${post.postImage}" alt="" >
            </div>
            <div class="blogContent">
                <h3> <a id="${post._id}" onclick="getSinglePost('${post._id}')" style="cursor: pointer; font-family: poppins;">${post.title}</a> </h3>
                <hr>
                <div class="blogAuthor">

                    ${authorImageTemplate}

                    <small><a href="" class="AuthorName">${post.authorName}</a></small>
                    <small> / ${post.dateCreated}</small>
                </div>
                <p class="ContentSection" style="font-family: calibri;">
                    ${post.postBody.slice(0, 600)+"..."}
                </p>
                <p class="blogLikesComments">15 Likes . &nbsp;  &nbsp; 8 Comments</p>
                <a id="${post._id}" onclick="getSinglePost('${post._id}')" class="readmore" style="cursor: pointer;">Read more &rarr; </a>
            </div>
        </div>
`
    })

    const blogPost = document.getElementById("blogPost");
    blogPost.innerHTML = paginatedPost;
}
renderPosts()

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

  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.addEventListener('click', previousPage, false);
  nextButton.addEventListener('click', nextPage, false);

async function getAllPosts(){

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllPosts", getData)
    const fetchedData = await response.json()

    posts = fetchedData.allAvailablePosts;
    
}



