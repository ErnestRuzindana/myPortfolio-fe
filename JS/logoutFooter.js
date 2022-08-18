function footerLogoutUser(){
    sessionStorage.removeItem("token")
    location = "index.html"
 }