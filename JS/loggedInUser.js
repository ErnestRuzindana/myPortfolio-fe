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
      width: 350px;
      height: 600px;
      border-radius: 10px;
      z-index: 3;
      top: 70px;
      right: 80px;
      text-align: center;
      padding-top: 20px;
      color: white;
  }
  
  a.ManageAccountLink{
      text-decoration: none;
      border: 2px solid white;
      padding: 7px;
      border-radius: 10px;
      color: white;
  }
      </style>
  </head>
  <body>
      <div class="profilePicture" id="profilePicture">
          <img src="../images/Ruzindana.jpg" alt="">
      </div>
          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn">
              <img src="../images/Ruzindana.jpg" alt="">
          </div>
          <h3>Ernest Ruzindana</h3>
          <p style="font-weight: 500;">ruzindana.ernest99@gmail.com</p>
          <a href="" class="ManageAccountLink">Manage your account</a>
          <br><br>
          <p style="font-weight: 500;">Switch an account</p>
          <p style="font-weight: 500;">ruzindana.ernest99@gmail.com</p>
          <p style="font-weight: 500;">ruzindana.ernest99@gmail.com</p>
          <br><br>
          <div class="preNavLogin">
              <h5><a href="login.html">Logout</a></h5>
          </div>
      </div>
      
      <script>
          const UserProfilePicture = document.getElementById("profilePicture");
          const UserProfile = document.getElementById("userProfile");
          const HideUserProfile = document.querySelectorAll("[id='hideUserProfile']");
          const myProfile = document.getElementById("myProfile");
          const myFooterCopyRight = document.getElementById ("myFooterCopyRight")
  
  
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
      </script>
  </body>
  </html>
  `
}

loggedInUser()