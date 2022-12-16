
const signupForm = document.getElementById("signupForm");

const submitData = document.getElementById("submitData");

const signupMessage = document.getElementById("signupMessage");
signupMessage.style.display = "none";

submitData.addEventListener("click", (event) =>{
    event.preventDefault();
    signupMessage.style.display = "block";   
    signupMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    singup();
});


function singup(){
    const first_name = document.getElementById("firstName");
    const last_name = document.getElementById("lastName");
    const user_email = document.getElementById("email");
    const user_password = document.getElementById("password");
    const user_repeatPassword = document.getElementById("repeatPassword");

    const data = {
        firstName: first_name.value, 
        lastName: last_name.value,
        email: user_email.value,
        password: user_password.value,
        repeatPassword: user_repeatPassword.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-be.cyclic.app/register/createUser", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData.message)

    if (fetchedData.message){
        signupMessage.style.color = "red"
        signupMessage.innerHTML = fetchedData.message
    }

    else if (fetchedData.successMessage){
        signupMessage.style.color = "green"
        signupMessage.innerHTML = fetchedData.successMessage
        signupForm.reset()
        setTimeout(()=>{location = "login.html"}, 4000)
    }

    else if (fetchedData.validationError){
        signupMessage.style.color = "red"
        signupMessage.innerHTML = fetchedData.validationError
    }

    else {
        signupMessage.style.color = "red"
        signupMessage.innerHTML = fetchedData.errorMessage
    }
})

}