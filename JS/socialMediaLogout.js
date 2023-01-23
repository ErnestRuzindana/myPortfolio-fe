async function socialMediaLogoutUser(){
    const getData = {
        method: "GET",
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

  let response = await fetch("https://ernestruzindana-be.cyclic.app/socialMediaLogoutUser", getData)
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

let response = await fetch("https://ernestruzindana-be.cyclic.app/socialMediaLogoutUser", getData)
const fetchedData = await response.json()
console.log(fetchedData)

if (fetchedData.message){
      location = "../index"
}
}



function preNavLogoutUser(){
  sessionStorage.removeItem("token")
  location = "../index"
}



function footerLogoutUser(){
  sessionStorage.removeItem("token")
  location = "../index"
}


function allLoginLogout(){
  socialMediaLogoutUser()
  footerSocialMediaLogoutUser()
  preNavLogoutUser()
  footerLogoutUser()
}

