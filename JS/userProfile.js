async function UserProfile(){
      const getData = {
          method: "GET",
          headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
      }

    let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
    const profileFetchedData = await response.json()



  const userProfileNames = document.getElementById("userProfileNames");
  userProfileNames.innerHTML = profileFetchedData.firstName +"  "+ profileFetchedData.lastName

  const userProfileEmail = document.getElementById("userProfileEmail");
  userProfileEmail.innerHTML = profileFetchedData.email

  const ImageDiv = document.getElementById("ImageDiv");
  const profileImageLinkLeft = document.getElementById("profileImageLinkLeft")
  ImageDiv.innerHTML = profileFetchedData.firstName.charAt(0) +""+ profileFetchedData.lastName.charAt(0)

  if (profileFetchedData.imageLink) {
    profileImageLinkLeft.src = `http://localhost:5000/images/${profileFetchedData.imageLink}`
    ImageDiv.style.display = "none"
  }

  else{
    profileImageLinkLeft.style.display = "none"
  }




  const userProfileBio = document.getElementById("userProfileBio");
  if (profileFetchedData.bio){
    userProfileBio.innerHTML = profileFetchedData.bio
  }

  else{
    userProfileBio.innerHTML = "Your biography goes here!"
  }


  const profileFacebook = document.getElementById("profileFacebook");
  if(profileFetchedData.profileFacebook){
    profileFacebook.innerHTML = `<img src="../images/facebook_black.png" alt=""> &nbsp; ${profileFetchedData.profileFacebook}`
  }

  else{
    profileFacebook.innerHTML = ""
  }


  const profileTwitter = document.getElementById("profileTwitter");
  if(profileFetchedData.profileTwitter){
    profileTwitter.innerHTML = `<img src="../images/twitter_black.png" alt=""> &nbsp; ${profileFetchedData.profileTwitter}`
  }

  else{
    profileTwitter.innerHTML = ""
  }

  const profileLinkedin = document.getElementById("profileLinkedin");
  if(profileFetchedData.profileLinkedin){
    profileLinkedin.innerHTML = `<img src="../images/linkedin_black.png" alt=""> &nbsp; ${profileFetchedData.profileLinkedin}`
  }

  else{
    profileLinkedin.innerHTML = ""
  }


  const profileInstagram = document.getElementById("profileInstagram");
  if(profileFetchedData.profileInstagram){
    profileInstagram.innerHTML = `<img src="../images/instagram_black.png" alt=""> &nbsp; ${profileFetchedData.profileInstagram}`
  }

  else{
    profileInstagram.innerHTML = ""
  }





  // edit profile section
  const profilePicRight = document.getElementById("profilePicRight");
  const profileImageLink = document.getElementById("profileImageLink")
  profilePicRight.innerHTML = profileFetchedData.firstName.charAt(0) +""+ profileFetchedData.lastName.charAt(0)

  if (profileFetchedData.imageLink) {
    profileImageLink.src = `http://localhost:5000/images/${profileFetchedData.imageLink}`
    profilePicRight.style.display = "none"
  }

  else{
    profileImageLink.style.display = "none"
  }




  const profileFirstName = document.getElementById("profileFirstName");
  profileFirstName.value = profileFetchedData.firstName


  const profileLastName = document.getElementById("profileLastName");
  profileLastName.value = profileFetchedData.lastName

  const profileEmail = document.getElementById("profileEmail");
  profileEmail.value = profileFetchedData.email

  const profileBio = document.getElementById("profileBio");
  if (profileFetchedData.bio){
    profileBio.value = profileFetchedData.bio
  }

  else{
    profileBio.placeholder = "Add your biography here"
  }


  const UserProfileFacebook = document.getElementById("UserProfileFacebook");
  if(profileFetchedData.profileFacebook){
    UserProfileFacebook.value = profileFetchedData.profileFacebook
  }

  else if(profileFetchedData.profileFacebook = ""){
    UserProfileFacebook.value = ""
  }

  else{
    UserProfileFacebook.placeholder = "Add your facebook username here"
  }

  const UserProfileTwitter = document.getElementById("UserProfileTwitter");
  if(profileFetchedData.profileTwitter){
    UserProfileTwitter.value = profileFetchedData.profileTwitter
  }

  else{
    UserProfileTwitter.placeholder = "Add your twitter username here"
  }


  const UserProfileLinkedin = document.getElementById("UserProfileLinkedin");
  if(profileFetchedData.profileLinkedin){
    UserProfileLinkedin.value = profileFetchedData.profileLinkedin
  }

  else{
    UserProfileLinkedin.placeholder = "Add your linkedin username here"
  }

  const UserProfileInstagram = document.getElementById("UserProfileInstagram");
  if(profileFetchedData.profileInstagram){
    UserProfileInstagram.value = profileFetchedData.profileInstagram
  }

  else{
    UserProfileInstagram.placeholder = "Add your instagram username here"
  }


}

UserProfile()



// Updating user profile

const updateChanges = document.getElementById("updateChanges");
const profileMessage = document.getElementById("profileMessage");

profileMessage.style.display = "none"

updateChanges.addEventListener("click", (event) =>{
    event.preventDefault();
    profileMessage.style.display = "block"

    profileMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    UpdateUserProfile();
});


function UpdateUserProfile(){
    const profileFirstName = document.getElementById("profileFirstName");
    const profileLastName = document.getElementById("profileLastName");
    const profileEmail = document.getElementById("profileEmail");
    const UserProfileFacebook = document.getElementById("UserProfileFacebook");
    const UserProfileTwitter = document.getElementById("UserProfileTwitter");
    const UserProfileLinkedin = document.getElementById("UserProfileLinkedin");
    const UserProfileInstagram = document.getElementById("UserProfileInstagram");
    const profileBio = document.getElementById("profileBio");
    const file = document.getElementById("file");


    const formData = new FormData();
        formData.append("firstName", profileFirstName.value);
        formData.append("lastName", profileLastName.value);
        formData.append("email", profileEmail.value);
        formData.append("profileFacebook", UserProfileFacebook.value);
        formData.append("profileTwitter", UserProfileTwitter.value);
        formData.append("profileLinkedin", UserProfileLinkedin.value);
        formData.append("profileInstagram", UserProfileInstagram.value);  
        formData.append("bio", profileBio.value);
        formData.append("profileImage", file.files[0]);


    const sendData = {
        method: "POST",
        body: formData,
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token"))})
    }

fetch("http://localhost:5000/login/updateUser", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.message){
        profileMessage.style.color = "green"
        profileMessage.innerHTML = fetchedData.message
        location = "userProfile.html"
    }
})
}