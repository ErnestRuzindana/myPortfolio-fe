
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const forgotPasswordSubmitData = document.getElementById("forgotPasswordSubmitData");

const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");
forgotPasswordMessage.style.display = "none";

forgotPasswordSubmitData.addEventListener("click", (event) =>{
    event.preventDefault();
    forgotPasswordMessage.style.display = "block";   
    forgotPasswordMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    forgotPassword();
});


function forgotPassword(){
    
    const forgotPasswordEmail = document.getElementById("forgotPasswordEmail");

    const data = {
        email: forgotPasswordEmail.value,
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://myportfolio-be.netlify.app/login/forgotPassword", sendData)
.then(response => response.json())
.then((forgotPasswordFetchedData)=>{
    console.log(forgotPasswordFetchedData)

    if (forgotPasswordFetchedData.invalidEmail){
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.invalidEmail
    }

    else if (forgotPasswordFetchedData.resetSuccess){
        forgotPasswordMessage.style.color = "green"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.resetSuccess
        localStorage.setItem("token", JSON.stringify(forgotPasswordFetchedData.forgotPasswordResetToken))

        setTimeout(()=>{forgotPasswordForm.reset()}, 2000)
    }

    else if (forgotPasswordFetchedData.unverifiedEmail){
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.unverifiedEmail
    }

    else if(forgotPasswordFetchedData.validationError){
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.validationError
    }

    else {
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.errorMessage
    }
})

}