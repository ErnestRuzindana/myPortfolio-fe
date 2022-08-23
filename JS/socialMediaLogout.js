async function socialMediaLogoutUser(){
    const getData = {
        method: "GET",
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

  let response = await fetch("http://localhost:5000/socialMediaLogoutUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)

  if (fetchedData.message){
        location = "index.html"
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
      location = "index.html"
}
}



function preNavLogoutUser(){
  sessionStorage.removeItem("token")
  location = "index.html"
}



function footerLogoutUser(){
  sessionStorage.removeItem("token")
  location = "index.html"
}


function allLoginLogout(){
  socialMediaLogoutUser()
  footerSocialMediaLogoutUser()
  preNavLogoutUser()
  footerLogoutUser()
}

