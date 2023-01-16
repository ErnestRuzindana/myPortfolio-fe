const blogLoader = document.getElementById("blog_preloader")
  function showBlogLoader(){
    document.title = "Loading..."
    blogLoader.classList.add("show")
  }
showBlogLoader();