
async function loggedInUser(){
    const preNavLogin = document.getElementById("preNavLogin");
    const preNavToken = sessionStorage.getItem("token")
    if(preNavToken){
        preNavLogin.innerHTML = `<img src="../images/Spinner.gif" alt="" width="40px">`
    }
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

  let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)
 
  preNavLogin.style.display = "none"
  
  const addProfile = document.getElementById("addProfile");
  addProfile.innerHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <title>Document</title>

  </head>
  <body>
      <div class="profilePicture" id="profilePicture">
        ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
      </div>
      <img src="${fetchedData.imageLink}" class="topProfileImage" id="topProfileImage" alt="">

          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn" id="profilePictureIn">
          ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
          </div>
          <img src="${fetchedData.imageLink}" class="inProfileImage" id="inProfileImage" alt="">

          <h3>${fetchedData.firstName} ${fetchedData.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.email}</p>
          <a href="userProfile.html" class="ManageAccountLink"><i class="far fa-edit"></i> </nbsp>Edit profile</a>
          <br><br>

          <div class="switchAccount" style="font-weight: 500; padding: 20px;" id="adminPanel">
                <p class="switchAccountLink" id="dashboard">
                <i class="fas fa-chalkboard-teacher"></i> </nbsp> Admin Panel
                </p>
                <p class="switchAccountLink" id="contactUs">
                <i class="far fa-envelope-open"></i> </nbsp> Contact Me
                </p>
          </div>

          <div class="preNavLogout" style="border-top: 1px solid #cba10a;">
              <h5><a onClick="preNavLogoutUser()"><i class="fa fa-sign-out"></i> </nbsp>Logout</a></h5>
          </div>
      </div>
      

  </body>
  </html>
  `

        const UserProfilePicture = document.getElementById("profilePicture");
        const UserProfile = document.getElementById("userProfile");
        const HideUserProfile = document.querySelectorAll("[id='hideUserProfile']");
        const myProfile = document.getElementById("myProfile");
        const myFooterCopyRight = document.getElementById ("myFooterCopyRight");
        const profilePictureIn = document.getElementById("profilePictureIn");
        const adminPanel = document.getElementById("adminPanel");
        const dashboard = document.getElementById("dashboard");
        const contactUs = document.getElementById("contactUs");
        

        //show or hide admin panel
        if(fetchedData.role == "user"){
            dashboard.style.display = "none"
        }
        else{
            contactUs.style.display = "none"
        }
    
        //Go to admin panel
        dashboard.addEventListener("click", ()=>{
            location = "../admin/dashboard.html"
        })
        contactUs.addEventListener("click", ()=>{
            location = "../index.html#contact"
            UserProfile.style.display = "none"
        })

        const topProfileImage = document.getElementById("topProfileImage");
        topProfileImage.addEventListener("click", ()=>{
            if(UserProfile.style.display !== "none"){
                UserProfile.style.display = "none"
            }
    
            else {
                UserProfile.style.display = "block"
            }
            })

        // hidding and showing the image profile in the top right corner
        const inProfileImage = document.getElementById("inProfileImage");

        if (fetchedData.imageLink) {
            UserProfilePicture.style.display = "none"
            profilePictureIn.style.display = "none"
        }

        
        else{
            topProfileImage.style.display = "none"
            inProfileImage.style.display = "none"
        }


        UserProfile.style.display = "none";

        UserProfilePicture.addEventListener("click", ()=>{
        if(UserProfile.style.display !== "none"){
            UserProfile.style.display = "none"
        }

        else {
            UserProfile.style.display = "block"
        }
        })


        for(var i = 0; i < HideUserProfile.length; i++) 
        HideUserProfile[i].addEventListener("click", ()=>{
        UserProfile.style.display = "none"
        })

        myProfile.addEventListener("click", ()=>{
        UserProfile.style.display = "none"
        })

        myFooterCopyRight.addEventListener("click", ()=>{
        UserProfile.style.display = "none"
        })



}

loggedInUser()