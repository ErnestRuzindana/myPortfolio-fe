const loader = document.getElementById("preloader")
function showLoader(){
    document.title = "Loading..."
    loader.classList.add("show")
}
showLoader()