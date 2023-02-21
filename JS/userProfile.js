
const popupUserProfile = document.getElementById("popupUserProfile")



async function UserProfile(){
      const getData = {
          method: "GET",
          headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
      }

    let response = await fetch("https://ernestruzindana-api.herokuapp.com/login/loggedInUser", getData)
    const userFetchedData = await response.json()
    const profileFetchedData = userFetchedData.loggedInUser;

  const userProfileNames = document.getElementById("userProfileNames");
  userProfileNames.innerHTML = profileFetchedData.firstName +"  "+ profileFetchedData.lastName

  const userProfileEmail = document.getElementById("userProfileEmail");
  userProfileEmail.innerHTML = profileFetchedData.email

  const ImageDiv = document.getElementById("ImageDiv");
  const profileImageLinkLeft = document.getElementById("profileImageLinkLeft")
  ImageDiv.innerHTML = profileFetchedData.firstName.charAt(0) +""+ profileFetchedData.lastName.charAt(0)

  if (profileFetchedData.imageLink) {
    profileImageLinkLeft.src = profileFetchedData.imageLink
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
    profileImageLink.src = profileFetchedData.imageLink
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
let globalPreloader = document.getElementById("globalPreloader");

profileMessage.style.display = "none"

updateChanges.addEventListener("click", (event) =>{
    event.preventDefault();

    UpdateUserProfile();
});



function UpdateUserProfile(){
  globalPreloader.classList.add("open-globalPreloader") 
  const profileFirstName = document.getElementById("profileFirstName");
  const profileLastName = document.getElementById("profileLastName");
  const UserProfileFacebook = document.getElementById("UserProfileFacebook");
  const UserProfileTwitter = document.getElementById("UserProfileTwitter");
  const UserProfileLinkedin = document.getElementById("UserProfileLinkedin");
  const UserProfileInstagram = document.getElementById("UserProfileInstagram");
  const profileBio = document.getElementById("profileBio");
  const profileImage = document.getElementById("file");
  

  if (profileImage.files.length && !profileImage.files[0]) {
      profileMessage.style.color = "red"
      profileMessage.innerHTML = "Please add a new profile image or confirm the previous one to be able to edit your profile!"
      return;
    }

    const data = {
      firstName: profileFirstName.value,
      lastName: profileLastName.value,
      profileFacebook: UserProfileFacebook.value,
      profileTwitter: UserProfileTwitter.value,
      profileLinkedin: UserProfileLinkedin.value,
      profileInstagram: UserProfileInstagram.value,  
      bio: profileBio.value
    }

  if (profileImage.files[0]){

  const reader =  new FileReader();
   reader.readAsDataURL(profileImage.files[0])
   reader.addEventListener("load",()=>{
    const finalUserImage = reader.result
    data.imageLink = finalUserImage;

  const sendData = {  
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
  }

fetch(`https://ernestruzindana-api.herokuapp.com/login/updateUser`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
  console.log(fetchedData)

  if (fetchedData.successMessage){
    profileMessage.style.color = "green"
    profileMessage.style.fontWeight = "bold"
    profileMessage.innerHTML = fetchedData.successMessage
    globalPreloader.classList.remove("open-globalPreloader")  
    history.go(0)
  }

  else{
      profileMessage.style.color = "red"
      profileMessage.innerHTML = "Something went wrong, we were unable to process this request!"
  }

    })

})
} else{
      const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch(`https://ernestruzindana-api.herokuapp.com/login/updateUser`, sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
      profileMessage.style.color = "green"
      profileMessage.style.fontWeight = "bold"
      profileMessage.innerHTML = fetchedData.successMessage
      location.reload()
    }

    else{
        profileMessage.style.color = "red"
        profileMessage.innerHTML = "Something went wrong, we were unable to process this request!"
    }

      })
}
}