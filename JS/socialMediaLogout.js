async function socialMediaLogoutUser(){
    const getData = {
        method: "GET",
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

  let response = await fetch("https://ernestruzindana-api.herokuapp.com/socialMediaLogoutUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)

  if (fetchedData.message){
    location.reload()
  }
}


async function footerSocialMediaLogoutUser(){
  const getData = {
      method: "GET",
      headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
  }

let response = await fetch("https://ernestruzindana-api.herokuapp.com/socialMediaLogoutUser", getData)
const fetchedData = await response.json()
console.log(fetchedData)

if (fetchedData.message){
  location.reload()
}
}



function preNavLogoutUser(){
  localStorage.removeItem("token")
  location.reload()
}



function footerLogoutUser(){
  localStorage.removeItem("token")
  location.reload()
}


function allLoginLogout(){
  socialMediaLogoutUser()
  footerSocialMediaLogoutUser()
  preNavLogoutUser()
  footerLogoutUser()
}

