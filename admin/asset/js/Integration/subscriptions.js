// Delete Results

let deleteSubscriber= async(myKey) => {

    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }

    let response = await fetch('http://localhost:5000/deleteSubscriber/'+myKey, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.removedMessage){ 
            history.go(0);
        }
    
}


// Get subscribers


async function fetchSubscribers(){
        
    let response = await fetch("http://localhost:5000/getAllSubscriptions")
    
    const allResults = await response.json(); 
    const results = allResults.subscribers;
    console.log(results);
   
    for(let i=0;i<results.length;i++){
        let resultsContainer = document.getElementById("subscriptionsContainer");

        let resultsArray = results[i];

        let subscriberEmail = resultsArray.subscriberEmail;
        let resultId = resultsArray._id

        
      if(1>0) {

        let postTemplate = `
    
        <div class="col-md-6" id="${resultId}">
            <div class="panel box-v1">
               <div style="font-size: 16px; text-align: center; color: #cba10a; text-decoration: underline; font-weight: bold; 
               padding-top: 15px; border-top: 5px solid #f0f3f4;
               ">Subscriber Email</div>

            <div class="panel-body text-center" style=" font-size: 15px; margin-top: -30px; padding-bottom: 20px;">
            ${subscriberEmail} 
            </div>  
                <div class="deleteMessage" style="font-size: 13px; color: #EE4B2B; font-weight: bold; text-align: right; width: 60%; border-top: 5px solid #f0f3f4; border-left: 5px solid #f0f3f4; padding-bottom: 5px; padding-top: 5px; padding-right: 15px;" id= '${resultId}' onclick="deleteSubscriber('${resultId}')">
                Remove from Subscribers
                </div>
            </div>
        </div>

        
        `
        resultsContainer.innerHTML += postTemplate;
    
    }
    
        }
        
    }

fetchSubscribers();
