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
ImageDiv.innerHTML = profileFetchedData.firstName.charAt(0) +""+ profileFetchedData.lastName.charAt(0)

const userProfileBio = document.getElementById("userProfileBio");
userProfileBio.innerHTML = profileFetchedData.bio


// edit profile section
const profilePicRight = document.getElementById("profilePicRight");
profilePicRight.innerHTML = profileFetchedData.firstName.charAt(0) +""+ profileFetchedData.lastName.charAt(0)



const profileFirstName = document.getElementById("profileFirstName");
profileFirstName.value = profileFetchedData.firstName


const profileLastName = document.getElementById("profileLastName");
profileLastName.value = profileFetchedData.lastName

const profileEmail = document.getElementById("profileEmail");
profileEmail.value = profileFetchedData.email

const profileBio = document.getElementById("profileBio");
profileBio.value = profileFetchedData.bio
}

UserProfile()