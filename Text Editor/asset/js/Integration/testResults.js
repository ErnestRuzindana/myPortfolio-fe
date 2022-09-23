// Delete Results

let deleteResult= async(myKey) => {

    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }

    let response = await fetch('http://localhost:5000/deleteResult/'+myKey, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.deletedResult){ 
            location="testResults.html"
        }
    
}


// Get results


async function fetchEventsPosts(){
        
    let response = await fetch("http://localhost:5000/getAllResults")
    
    const allResults = await response.json(); 
    const results = allResults.testResults;
    console.log(results);
   
    for(let i=0;i<results.length;i++){
        let resultsContainer = document.getElementById("testResultsContainer");

        let resultsArray = results[i];

        let title = resultsArray.postTitle;
        let testResult   = resultsArray.testResult;
        let resultId = resultsArray._id
        let name = resultsArray.name;
        let email = resultsArray.email;
        
      if(1>0) {

        let postTemplate = `
    
        <div class="col-md-6" id="${resultId}">
            <div class="panel box-v1">
                <div class="panel-body text-center" style="padding-bottom: 20px; font-size: 15px;">
                On Post <span style="color: #0c66ae;">${title}</span>, ${name}
                (${email}) got &nbsp;<span style="text-decoration: underline; color: #0c66ae;">${testResult}/10</span> 
                </div>
                <div style="font-size: 20px; text-align: right; padding-bottom: 8px; padding-right: 20px;" id= '${resultId}' onclick="deleteResult('${resultId}')">
                <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
            </div>
        </div>

        
        `
        resultsContainer.innerHTML += postTemplate;
    
    }
    
        }
        
    }

fetchEventsPosts();





