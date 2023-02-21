const checkToken = JSON.parse(localStorage.getItem("token"))
	if (!checkToken){
		location = "../index"
	   }

	async function checkLoggedInUser(){
	const getData = {
		method: "GET",
		headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
	}

	let response = await fetch("https://ernestruzindana-api.herokuapp.com/login/loggedInUser", getData)
	const fetchedData = await response.json()
	console.log(fetchedData)

	if(fetchedData.loggedInUser.role !== "admin"){
		location = "../index"
	}

}

checkLoggedInUser()