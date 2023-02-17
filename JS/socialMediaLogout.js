async function socialMediaLogoutUser(){
    const getData = {
        method: "GET",
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

  let response = await fetch("http://localhost:5000/socialMediaLogoutUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)

  if (fetchedData.message){
        location = "../index"
  }
}


async function footerSocialMediaLogoutUser(){
  const getData = {
      method: "GET",
      headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
  }

let response = await fetch("http://localhost:5000/socialMediaLogoutUser", getData)
const fetchedData = await response.json()
console.log(fetchedData)

if (fetchedData.message){
      location = "../index"
}
}



function preNavLogoutUser(){
  localStorage.removeItem("token")
  location = "../index"
}



function footerLogoutUser(){
  localStorage.removeItem("token")
  location = "../index"
}


function allLoginLogout(){
  socialMediaLogoutUser()
  footerSocialMediaLogoutUser()
  preNavLogoutUser()
  footerLogoutUser()
}

