
const resetPasswordForm = document.getElementById("resetPasswordForm");

const resetPasswordSubmitData = document.getElementById("resetPasswordSubmitData");

const resetPasswordMessage = document.getElementById("resetPasswordMessage");
resetPasswordMessage.style.display = "none";

resetPasswordSubmitData.addEventListener("click", (event) =>{
    event.preventDefault();
    resetPasswordMessage.style.display = "block";   
    resetPasswordMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    forgotPassword();
});


function forgotPassword(){
    
    const resetPassword = document.getElementById("resetPassword");
    const resetRepeatPassword = document.getElementById("resetRepeatPassword");

    const data = {
        password: resetPassword.value,
        repeatPassword: resetRepeatPassword.value
    }


    const sendData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8', "auth_token": JSON.parse(localStorage.getItem("token"))})
    }

fetch("https://ernestruzindana-be.cyclic.app/login/newPassword", sendData)
.then(response => response.json())
.then((newPasswordFetchedData)=>{
    console.log(newPasswordFetchedData)

    if (newPasswordFetchedData.message){
        resetPasswordMessage.style.color = "red"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.message
    }

    else if (newPasswordFetchedData.newPasswordSuccess){
        resetPasswordMessage.style.color = "green"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.newPasswordSuccess

        resetPasswordForm.reset()

        setTimeout(()=>{location="login"}, 2000)
    }

    else if(newPasswordFetchedData.validationError){
        resetPasswordMessage.style.color = "red"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.validationError
    }

    else {
        resetPasswordMessage.style.color = "red"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.errorMessage
    }
})

}