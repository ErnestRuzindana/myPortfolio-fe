

// const loginMessage = document.getElementById("loginMessage");

const loginButton = document.getElementById("loginGoogle");

// loginMessage.style.display = "none"

loginButton.addEventListener("click", ()=>{
    // loginMessage.style.display = "block";
    // loginMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    location = "https://ernestruzindana-api.herokuapp.com/google"
})