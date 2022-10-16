// Get Single User

let getSingleUser= async(userId) => {

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }



    let response = await fetch('http://localhost:5000/register/getSingleUser/'+userId, getOptions)
    const fetchSingleUser = await response.json();
    console.log(fetchSingleUser)

        if(fetchSingleUser.fetchedUser){ 
           location="changeRole.html"
           localStorage.setItem("userId", fetchSingleUser.fetchedUser._id)
        }
}


const userId = localStorage.getItem("userId")

async function getUser() {

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }



    let response = await fetch('http://localhost:5000/register/getSingleUser/'+userId, getOptions)
    const fetchSingleUser = await response.json();
    console.log(fetchSingleUser)

    const singleUser = fetchSingleUser.fetchedUser

    const roleCategory = document.getElementById("roleCategory")
    roleCategory.value = singleUser.role
}

getUser()


// update a role


const roleSubmitData = document.getElementById("roleSubmitData");

const roleMessage = document.getElementById("roleMessage");
roleMessage.style.display = "none";

roleSubmitData.addEventListener("click", (event) =>{
    event.preventDefault();
    roleMessage.style.display = "block";   
    roleMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    updateRole();
});


function updateRole() {
    const userRoleId = localStorage.getItem("userId")
    const roleCategory = document.getElementById("roleCategory")

    const data = {
        role : roleCategory.options[roleCategory.selectedIndex].text
    }
    console.log(roleCategory.options[roleCategory.selectedIndex].text)

    const UserRequestOptions = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8', 'auth_token': JSON.parse(sessionStorage.getItem('token'))}),
     };
     
fetch('http://localhost:5000/register/assignUserRole/'+userRoleId, UserRequestOptions,)
.then(response => response.json())
.then((roleFetchedData)=>{
    console.log(roleFetchedData)

    if (roleFetchedData.successMessage){
        roleMessage.style.color = "green"
        roleMessage.innerHTML = roleFetchedData.successMessage
        setTimeout(()=>{location = "assignRole.html"}, 2000)
        
    }

    else if (roleFetchedData.message){
        roleMessage.style.color = "red"
        roleMessage.innerHTML = roleFetchedData.message
        
    }

    else if (roleFetchedData.unauthorisedError){
        roleMessage.style.color = "red"
        roleMessage.innerHTML = roleFetchedData.unauthorisedError
        setTimeout(()=>{location = "assignRole.html"}, 3000)
    }

    else {
        postMessage.style.color = "red"
        postMessage.innerHTML = roleFetchedData.message
    }
})
        
}