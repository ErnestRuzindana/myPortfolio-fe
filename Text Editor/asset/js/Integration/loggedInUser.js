async function loggedInUser(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

  let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)


   




  const addProfile = document.getElementById("addProfile");
  addProfile.innerHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <title>Document</title>



      <style>
          
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
            background-color: #414A4C;
            border-radius: 10px;
            z-index: 3;
            top: 65px;
            right: 95px;
            width: 300px;
            text-align: center;
            text-align: center;
            padding-top: 20px;
            color: white;
            Height: 500px;
        }
        
        a.ManageAccountLink{
            text-decoration: none;
            padding: 7px 15px;
            border-radius: 5px;
            color: black;
            background: white;
        }

        a.ManageAccountLink:hover{
            background: white;
            color: black;
            border: 2px solid black;
        }

        div.profilePicture{
            background: black;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            line-height: 50px;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;
            text-align: center;
        }

        img.topProfileImage{
            background: none;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            cursor: pointer;
            text-align: center;
           
        }

        div.profilePictureIn{
            background: white;
            color: black;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 115px;
            margin-bottom: 20px;
            line-height: 80px;
            font-weight: bold;
            font-size: 30px;
            cursor: pointer;
        }

        img.inProfileImage{
            background: none;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-left: 100px;
            margin-bottom: 20px;
            cursor: pointer;
        }

        

        div.profilePictureIn:hover{
            background: black;
            color: white;
        }

        p.userFetchedEmail{
            margin-top: 5px;
            margin-bottom: 50px;
            color: white;
        }

        div.switchAccount{
            border-top: 1px solid white;
            padding-top: 20px;
            margin-bottom: -30px;
        }

        p.switchAccountLink{
            border: 1px solid white; 
            padding: 5px; 
            border-radius: 5px; 
            cursor: pointer; 
            background: white;
            color: black;
        }

        p.switchAccountLink:hover{
            background: white;
            color: black;
        }
        a.switchAccountLink{
            border: 1px solid white; 
            padding: 7px 40px 7px 40px; 
            border-radius: 5px; 
            cursor: pointer; 
            background: white;
            color: black;
        }

        a.switchAccountLink:hover{
            background: white;
            color: black;
        }
        div.preNavLogin {
           padding-top: 50px;
        }

        div.preNavLogin h5 a{
            text-decoration: none;
            border: 2px solid white;
            padding: 7px 15px;
            border-radius: 5px;
            
            background: black;
        }
        
        div.preNavLogin h5 a:hover{
            border: 2px solid black;
        }


      </style>
  </head>
  <body>
      <div class="profilePicture" id="profilePicture">
        ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
      </div>
      <img src="http://localhost:5000/images/${fetchedData.imageLink}" class="topProfileImage" id="topProfileImage" alt="">
          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn" id="profilePictureIn">
          ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
          </div>
          <img src="http://localhost:5000/images/${fetchedData.imageLink}" class="inProfileImage" id="inProfileImage" alt="">

          <h3 style="display: table; margin-left: 43px;">${fetchedData.firstName} ${fetchedData.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.email}</p>
          <a href="userProfile.html" class="ManageAccountLink" id="ManageAccountLink">Edit profile</a>
          <br><br>

          <div class="switchAccount" style=" padding: 30px 50px 58px 50px;">
                <p class="switchAccountLink" id="switchAccountLink"> 
                <img src="images/menu-icon/flag.png" title="" alt="">
                Find Profiles
                </p>
                <a href="../admin/dashboard.html" class="switchAccountLink" id="adminPanel"> 
                Admin Panel
                </a>
          </div>

          <div class="preNavLogin" style="border-top: 1px solid white;">
              <h5><a onClick="preNavLogoutUser()">Logout</a></h5>
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

  const switchAccountLink = document.getElementById("switchAccountLink");
  if(fetchedData.role == "admin"){
    switchAccountLink.style.display = "none";
  }

  const adminPanel = document.getElementById("adminPanel");
  if(fetchedData.role == "user"){
    adminPanel.style.display = "none";
  }



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



  const preNavLogin = document.getElementById("preNavLogin");
  preNavLogin.style.display = "none"

  

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
    location = "index.html"
  }

const token = sessionStorage.getItem("token")
if(!token){
const topRightLogin = document.getElementById("addProfile")
    topRightLogin.style.display = "none"
}