
const submitSubscription = document.getElementById("submitSubscription");

const subscriptionMessage = document.getElementById("subscriptionMessage");
subscriptionMessage.style.display = "none";

submitSubscription.addEventListener("click", (event) =>{
    event.preventDefault();
    subscriptionMessage.style.display = "block";   
    subscriptionMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    subscription();
});


function subscription(){
    const subscriberEmail = document.getElementById("subscriberEmail");

    const data = {
        subscriberEmail: subscriberEmail.value, 
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://myportfolio-be.netlify.app/Subscribe", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        subscriptionMessage.style.color = "green"
        subscriptionMessage.innerHTML = fetchedData.successMessage
        subscriberEmail.reset();
        // setTimeout(()=>{location = "login.html"}, 4000)
    }

    else if (fetchedData.validationError){
        subscriptionMessage.style.color = "red"
        subscriptionMessage.innerHTML = fetchedData.validationError
    }

    else {
        subscriptionMessage.style.color = "red"
        subscriptionMessage.innerHTML = fetchedData.errorMessage
    }
})

}