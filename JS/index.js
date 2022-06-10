const toggleButton = document.getElementById ("toggleButton");

const navlinks = document.getElementById ("navlinks");

const closeButton = document.getElementById("closeButton");


navlinks.style.display = "none";

toggleButton.addEventListener ("click", function(){
    navlinks.style.display = "block";
})

closeButton.addEventListener("click", function(){
    navlinks.style.display = "none";
})

