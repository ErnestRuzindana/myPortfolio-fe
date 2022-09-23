// Get registered users

async function fetchRegisteredUsers(){
        
    let response = await fetch("http://localhost:5000/register/getRegisteredUsers")
    
    const allUsers = await response.json(); 
    const users = allUsers.RegisteredUsers;
    console.log(users);
   
    for(let i=0;i<users.length;i++){
        let usersContainer = document.getElementById("usersContainer");
        
 
        let usersArray = users[i];

        let firstName = usersArray.firstName;
        let lastName = usersArray.lastName;
        let userId = usersArray._id
        let email = usersArray.email;
        let role = usersArray.role;
        // console.log(role)
        let faculty
        if(!usersArray.faculty){
          faculty = "Not a student" 
        }
        else{
          faculty = usersArray.faculty
        }
        
      if(1>0) {

        let userTemplate = `
    
            <tr id="${userId}">
                <td>${firstName} ${lastName}</td>
                <td>${email}</td>
                <td>${faculty}</td>
                <td>${role}</td>
            </tr>

        
        `
        
       
        
        
        usersContainer.innerHTML += userTemplate;
    
    }
    
        }
        
    }

fetchRegisteredUsers();