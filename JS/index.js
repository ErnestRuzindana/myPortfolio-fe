
const toggleButton = document.getElementById ("toggleButton");

const navlinks = document.getElementById ("navlinks");

const closeButton = document.getElementById("closeButton");




toggleButton.addEventListener ("click", function(){
    navlinks.style.display = "block";
})

closeButton.addEventListener("click", function(){
    navlinks.style.display = "none";
})



