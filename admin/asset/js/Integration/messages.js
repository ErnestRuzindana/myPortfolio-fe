// Delete Results

let deleteMessage= async(myKey) => {

    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }

    let response = await fetch('https://ernestruzindana-be.cyclic.app/contact/deleteMessage/'+myKey, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.deletedMessage){ 
            location="messages.html"
        }
    
}


// Get messages


async function fetchMessages(){
        
    let response = await fetch("https://ernestruzindana-be.cyclic.app/contact/getAllMessages")
    
    const allResults = await response.json(); 
    const results = allResults.clientMessages;
    console.log(results);

    //random ids
    const replyMessageBoxId = Math.floor(Math.random() * 1000)
   
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
            <div style="font-size: 16px; text-align: center; color: #cba10a; text-decoration: underline; font-weight: bold; 
            padding-top: 15px;
            ">Sender Info</div>
                <div class="panel-body text-center" style=" font-size: 15px; margin-top: -30px; padding-bottom: 20px;">
               <span style="text-decoration: underline;">Names</span>: ${names} </br>
               <span style="text-decoration: underline;">Email</span>: ${email} </br> 
               <span style="text-decoration: underline;">Phone Number</span>: ${phoneNumber} </br>
               </div>
               <div style="font-size: 16px; text-align: center; color: #cba10a; text-decoration: underline; font-weight: bold; 
               ;
               ">Sender Message</div>

            <div class="panel-body text-center" style=" font-size: 15px; margin-top: -30px; padding-bottom: 20px;">
             ${message}
            </div>   
                <div class="deleteMessage" style="font-size: 20px; margin-right: 20px; text-align: center; width: 40px; height: 40px; background: #ff6b6b; color: white; border-radius: 50%;  padding: 5px 5px;" id= '${resultId}' onclick="deleteMessage('${resultId}')">
                <i class="fa fa-trash" aria-hidden="true"></i>
                </div>

                <div style="font-size: 16px; text-align: center; padding-bottom: 20px;   
                display: flex;
                flex-direction: column;
                padding: 20px;
                ">
                <button id="postSubmitData" class="add-btn " style="
                border: none;
                background: #cba10a;
                width: 40%;
                position: relative;
                margin: auto;
                padding: 5px 20px; color: white;"
                onclick="getSingleMessage('${resultId}')"
                ><span class="fa fa-envelope-o"></span> Reply </button>
                </div>
            </div>
        </div>

        
        `
        resultsContainer.innerHTML += postTemplate;
    
    }
    
        }
        
    }

fetchMessages();

