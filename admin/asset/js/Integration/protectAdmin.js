const checkToken = JSON.parse(sessionStorage.getItem("token"))
	if (!checkToken){
		location = "../HTML/index.html"
	   }

	async function checkLoggedInUser(){
	const getData = {
		method: "GET",
		headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
	}

	let response = await fetch("https://ernestruzindana-be.cyclic.app/login/loggedInUser", getData)
	const fetchedData = await response.json()
	console.log(fetchedData)

	if(fetchedData.role !== "admin"){
		location = "../HTML/index.html"
	}

}

checkLoggedInUser()