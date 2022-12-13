const contactForm = document.getElementById("contactForm");
const visitorName = document.getElementById("visitorName");
const visitorEmail = document.getElementById("visitorEmail");
const visitorTel = document.getElementById("visitorTel");
const visitorMessage = document.getElementById("visitorMessage");
const messageSubmit = document.getElementById("messageSubmit");
const contactMessage = document.getElementById("contactMessage");


contactMessage.style.display = "none"


messageSubmit.addEventListener("click", (event)=>{
    event.preventDefault();
    contactMessage.style.display = "block";

    contactMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

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

    fetch("https://myportfolio-be.netlify.app/contact/sendMessage", sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)

        if (fetchedData.validationError){
            contactMessage.style.color = "red"
            contactMessage.innerHTML = fetchedData.validationError
        }

        else if (fetchedData.successMessage){
            contactMessage.style.color = "green"
            contactMessage.innerHTML = fetchedData.successMessage

            setTimeout(()=>{location = "index.html#contact"}, 500)
        }

        else {
            contactMessage.style.color = 'red'
            contactMessage.innerHTML = fetchedData.errorMessage
        }
    })
}
