// Delete Results

let deleteMessage= async(myKey) => {

    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }

    let response = await fetch('http://localhost:5000/contact/deleteMessage/'+myKey, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.deletedMessage){ 
            location="messages.html"
        }
    
}


// Get results


async function fetchMessages(){
    const contactMessage = document.getElementById("contactMessage");
    contactMessage.style.display = "none";
        
    let response = await fetch("http://localhost:5000/contact/getAllMessages")
    
    const allResults = await response.json(); 
    const results = allResults.clientMessages;
    console.log(results);
   
    for(let i=0;i<results.length;i++){
        let resultsContainer = document.getElementById("messagesContainer");

        let resultsArray = results[i];

        let names = resultsArray.names;
        let phoneNumber   = resultsArray.phoneNumber;
        let resultId = resultsArray._id
        let message = resultsArray.message;
        let email = resultsArray.email;
        
      if(1>0) {

        let postTemplate = `
    
        <div class="col-md-6" id="${resultId}">
            <div class="panel box-v1">
                <div class="panel-body text-center" style="padding-bottom: 20px; font-size: 15px;">
               <span style="text-decoration: underline;">Names</span>: ${names} </br>
               <span style="text-decoration: underline;">Email</span>: ${email} </br> 
               <span style="text-decoration: underline;">Phone Number</span>: ${phoneNumber} </br>
               <span style="text-decoration: underline;">Message</span>: ${message} </br>
                </div>
                <div class="deleteMessage" style="font-size: 20px; text-align: right; padding-bottom: 8px; padding-right: 20px;" id= '${resultId}' onclick="deleteMessage('${resultId}')">
                <i class="fa fa-trash" aria-hidden="true"></i>
                </div>

                <div style="font-size: 16px; text-align: center; padding-bottom: 20px;  border-top: 5px solid #f0f3f4; 
                display: flex;
                flex-direction: column;
                padding: 20px;
                ">
                <textarea name="message" id="messageReply" placeholder="Enter your reply here" rows="4" cols="50"></textarea>
                <button id="postSubmitData" class="add-btn" style="margin-top: 20px;
                border: none;
                background: #ff6b6b;
                width: 40%;
                position: relative;
                left: 85px;
                padding: 5px 20px; color: white;"><span class="fa fa-envelope-o"></span> Reply </button>
                </div>
            </div>
        </div>

        
        `
        resultsContainer.innerHTML += postTemplate;
    
    }
    
        }
        
    }

fetchMessages();



// Send Invitation

let sendInvitation= async(myKey) => {
    contactMessage.style.display = "block";   
    contactMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    contactMessage.style.color = "green";
    setTimeout(()=>{contactMessage.innerHTML = "Invitation Sent Successfully!"}, 3000)
    setTimeout(()=>{location = "testResults.html"}, 5000)
    
    const deleteOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }

    let response = await fetch('https://university-social-network-be.herokuapp.com/sendInvitation/'+myKey, deleteOptions)
    const fetchInvitationPost = await response.json();
    console.log(fetchInvitationPost)
        
        
    
}

