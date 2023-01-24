const userProfile_preloader = document.getElementById("userProfile_preloader")
function showUserProfileLoader(){
  document.title = "Loading..."
  userProfile_preloader.classList.add("show")
}
showUserProfileLoader()