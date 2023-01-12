async function loggedInUser(){
    const preNavLogin = document.getElementById("preNavLogin");
    const preNavToken = sessionStorage.getItem("token")
    if(preNavToken){
        preNavLogin.innerHTML = `<img src="../../../images/spinner.gif" alt="" width="40px">`
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
      <img src="https://ernestruzindana-be.cyclic.app/images/${fetchedData.imageLink}" class="topProfileImage" id="topProfileImage" alt="">

          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn" id="profilePictureIn">
          ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
          </div>
          <img src="https://ernestruzindana-be.cyclic.app/images/${fetchedData.imageLink}" class="inProfileImage" id="inProfileImage" alt="">

          <h3 class="adminNames">${fetchedData.firstName} ${fetchedData.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.email}</p>
          <a href="../HTML/userProfile.html" class="ManageAccountLink"><i class="far fa-edit"></i> </nbsp>Edit profile</a>
          <br><br>

          <div class="switchAccount" style="font-weight: 500; padding: 35px 20px 20px; " id="adminPanel">
                <p class="switchAccountLink"> 
                <i class="fas fa-chalkboard-teacher"></i> </nbsp>Admin Panel
                </p>
          </div>

          <div class="preNavLogout" style="border-top: 1px solid #cba10a; padding: 30px 20px 20px;">
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
  if(fetchedData.role == "user"){
    adminPanel.style.display = "none";
  }

  //Go to admin panel
  adminPanel.addEventListener("click", ()=>{
    location = "dashboard.html"
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

  

//   myProfile.addEventListener("click", ()=>{
//   UserProfile.style.display = "none"
//   })

//   myFooterCopyRight.addEventListener("click", ()=>{
//   UserProfile.style.display = "none"
//   })


}

loggedInUser()


function preNavLogoutUser(){
    sessionStorage.removeItem("token")
    location = "../index.html"
  }

const token = sessionStorage.getItem("token")
if(!token){
const topRightLogin = document.getElementById("addProfile")
    topRightLogin.style.display = "none"
}




{/* <style>
          
div.profilePicture img{
    width: 50px; 
    border-radius: 50%; 
    cursor: pointer; 
}

div.profilePictureIn img{
    width: 100px; 
    border-radius: 50%; 
    cursor: pointer; 
}

div.userProfile{
    position: fixed;
    background-color:rgb(88, 86, 86);
    border-radius: 10px;
    z-index: 3;
    top: 50px;
    right: 80px;
    text-align: center;
    padding-top: 20px;
    color: white;
    Height: auto;
    border: 1px solid white;
    width: 280px;
}

a.ManageAccountLink{
    text-decoration: none;
    border: 2px solid white;
    padding: 7px;
    border-radius: 10px;
    color: white;
    background: black;
}

a.ManageAccountLink:hover{
    background: #cba10a;
}

div.profilePicture{
    background: black;
    color: #cba10a;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    line-height: 40px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    margin: 5px 25px 20px 20px;
}

img.topProfileImage{
    border: 1px solid black;
    width: 35px;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    margin: 8px 25px 20px 20px;
}

img.inProfileImage{
    border: 1px solid black;
    width: 70px;
    border-radius: 50%;
    cursor: pointer;
    text-align: center; 
}

div.profilePictureIn{
    background: #cba10a;
    color: black;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-left: 100px;
    line-height: 80px;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
}

div.profilePictureIn:hover{
    background: black;
    color: #cba10a;
}

p.userFetchedEmail{
    margin-top: -5px;
    margin-bottom: 50px;
}

div.switchAccount{
    border-top: 1px solid #cba10a;
    border-bottom: 1px solid #cba10a;
    padding-top: 20px;
}

p.switchAccountLink{
    border: 1px solid white; 
    padding: 5px; 
    border-radius: 5px; 
    cursor: pointer; 
    background: grey;
}

p.switchAccountLink:hover{
    background: white;
    color: black;
}

div.preNavLogin{
    margin: 20px;
}

div.preNavLogin h5 a{

    font-size: 1vw;
    color: white;
    text-decoration: none;
    background-color: #cba10a;
    padding: 5px 20px 5px 20px;  
    border: 2px solid white;
    border-radius: 20px;
    
  }
  
  div.preNavLogin h5 a:hover{
    text-decoration: none;
    color: #cba10a;
    cursor: pointer;
    padding: 5px 20px 5px 20px;  
    border: 2px solid white;
    border-radius: 20px;
  }


</style> */}