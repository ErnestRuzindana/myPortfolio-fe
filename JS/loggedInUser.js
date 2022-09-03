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
            background-color:rgb(88, 86, 86);
            border-radius: 10px;
            z-index: 3;
            top: 83px;
            right: 80px;
            text-align: center;
            padding-top: 20px;
            color: white;
            Height: auto;
            border: 1px solid white;
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
            width: 50px;
            height: 50px;
            border-radius: 50%;
            line-height: 50px;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;
            text-align: center;
        }

        div.profilePictureIn{
            background: #cba10a;
            color: black;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 137px;
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
            margin-top: -15px;
            margin-bottom: 50px;
        }

        div.switchAccount{
            border-top: 1px solid #cba10a;
            padding-top: 20px;
            margin-bottom: -30px;
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


      </style>
  </head>
  <body>
      <div class="profilePicture" id="profilePicture">
        ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
      </div>

          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn">
          ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
          </div>

          <h3>${fetchedData.firstName} ${fetchedData.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.email}</p>
          <a href="userProfile.html" class="ManageAccountLink">Edit profile</a>
          <br><br>

          <div class="switchAccount" style="font-weight: 500; padding: 20px;">
                <p class="switchAccountLink"> 
                <img style="width: 20px; margin-bottom: -5px;" src="../images/switch.png" alt="">
                    Switch an account
                </p>
          </div>

          <p style="font-weight: 500;">example@gmail.com</p>

          <div class="preNavLogin" style="border-top: 1px solid #cba10a;">
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
        const myFooterCopyRight = document.getElementById ("myFooterCopyRight")


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

        myProfile.addEventListener("click", ()=>{
        UserProfile.style.display = "none"
        })

        myFooterCopyRight.addEventListener("click", ()=>{
        UserProfile.style.display = "none"
        })


}

loggedInUser()