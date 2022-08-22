//Phone Navigation Bar

const toggleButton = document.getElementById ("toggleButton");
const closeButton = document.getElementById("closeButton");
const nav = document.getElementById('menu')
nav.classList.remove('menu-btn');


toggleButton.addEventListener ("click", function(){
    nav.classList.add('menu-btn');
})



nav.addEventListener("click", function(){
    nav.classList.remove('menu-btn');
})



// Navigation Active links

jQuery(function($) {
$('#menu').onePageNav({
	currentClass: 'active',
	changeHash: false,
	scrollSpeed: 750,
	scrollThreshold: 0.2,
	filter: '',
	easing: 'swing'
});

});





// For the thumbnail demo! :]

var count = 1
setTimeout(demo, 500)
setTimeout(demo, 700)
setTimeout(demo, 900)
setTimeout(reset, 2000)

setTimeout(demo, 2500)
setTimeout(demo, 2750)
setTimeout(demo, 3050)


var mousein = false
function demo() {
   if(mousein) return
   document.getElementById('demo' + count++)
      .classList.toggle('hover')
   
}

function demo2() {
   if(mousein) return
   document.getElementById('demo2')
      .classList.toggle('hover')
}

function reset() {
   count = 1
   var hovers = document.querySelectorAll('.hover')
   for(var i = 0; i < hovers.length; i++ ) {
      hovers[i].classList.remove('hover')
   }
}

document.addEventListener('mouseover', function() {
   mousein = true
   reset()
})


const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}




// Showing login/signup or logout in footer using the normal login

const loginLogoutUser = document.getElementById("loginLogout");
const logoutUser = document.getElementById("logoutUser");
const MyToken = JSON.parse(sessionStorage.getItem("token"))

if (MyToken){
   loginLogoutUser.style.display = "none";
}

else{
   logoutUser.style.display = "none"
}








// Showing login/signup or logout in footer using social media

// const medialoginLogoutUser = document.getElementById("medialoginLogout");
// const medialogoutUser = document.getElementById("medialogoutUser");


// const getData = {
//       method: "GET",
//       headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
// }

// let response = await fetch("http://localhost:5000/socialMediaLoggedInUser", getData)
// const fetchedData = await response.json()
// console.log(fetchedData)

// if (!fetchedData.message){
//    medialoginLogoutUser.style.display = "none";
// }

// else if(!fetchedData.user){
//    medialogoutUser.style.display = "none";
// }






