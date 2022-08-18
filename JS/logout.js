function preNavLogoutUser(){
    sessionStorage.removeItem("token")
    location = "index.html"
}

