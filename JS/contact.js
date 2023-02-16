const contactForm = document.getElementById("contactForm");
const visitorName = document.getElementById("visitorName");
const visitorEmail = document.getElementById("visitorEmail");
const visitorTel = document.getElementById("visitorTel");
const visitorMessage = document.getElementById("visitorMessage");
const messageSubmit = document.getElementById("messageSubmit");
const contactMessage = document.getElementById("contactMessage");
const popupBox = document.getElementById("popupBox")


contactMessage.style.display = "none"


messageSubmit.addEventListener("click", (event)=>{
    event.preventDefault();
    contactMessage.style.display = "block";
    contactMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`
    document.title = "Loading..."
    contact();
});

function contact(){
    const data = {
        names: visitorName.value,
        email: visitorEmail.value,
        phoneNumber: visitorTel.value,
        message: visitorMessage.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("http://localhost:5000/contact/sendMessage", sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)

        if (fetchedData.validationError){
            contactMessage.style.color = "red"
            contactMessage.innerHTML = fetchedData.validationError
            document.title = "Ernest Ruzindana"
        }

        else if (fetchedData.successMessage){
            contactMessage.style.display = "none"
            popupBox.classList.add("open-popup")
            document.title = "Ernest Ruzindana"
        }

        else {
            contactMessage.style.color = 'red'
            contactMessage.innerHTML = fetchedData.errorMessage
            document.title = "Ernest Ruzindana"
        }
    })
}

function closePopup(){
    popupBox.classList.remove("open-popup")
    contactForm.reset();
}
