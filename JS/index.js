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




// Showing login/signup or logout in footer using the normal login

async function MediaLoginLogout(){
   const loginLogoutUser = document.getElementById("loginLogout");
   const logoutUser = document.getElementById("logoutUser");
   const MyToken = JSON.parse(sessionStorage.getItem("token"))


   const getData = {
      method: "GET",
      headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
   }

   let response = await fetch("http://localhost:5000/socialMediaLoggedInUser", getData)
   const fetchedData = await response.json()

   if (MyToken){
      loginLogoutUser.style.display = "none";
   }

   else if(!fetchedData.message){
      loginLogoutUser.style.display = "none";
   }

   else{
      logoutUser.style.display = "none"
   }
}




MediaLoginLogout()




// for animation 

$(document).ready(function(){
   $('.pp-quote').click(function(){
     $('.pp-quote').removeClass("active");
     $(this).addClass("active");
 });
 });
 
 $(document).ready(function(){
     
        // hide-top
 
         $('.li-quote-1').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');
             $('.quote-text-1').addClass('show');
             $('.quote-text-1').removeClass('hide-bottom');             
         });
 
         $('.li-quote-2').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');
             $('.quote-text-2').addClass('show');             
             $('.quote-text-2').removeClass('hide-bottom');
         });
 
         $('.li-quote-3').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');         
             $('.quote-text-3').addClass('show');             
             $('.quote-text-3').removeClass('hide-bottom');
         });
         $('.li-quote-4').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');      
             $('.quote-text-4').addClass('show');             
             $('.quote-text-4').removeClass('hide-bottom');
         });
         $('.li-quote-5').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');      
             $('.quote-text-5').addClass('show');             
             $('.quote-text-5').removeClass('hide-bottom');
         });
         $('.li-quote-6').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');      
             $('.quote-text-6').addClass('show');             
             $('.quote-text-6').removeClass('hide-bottom');
         });
         $('.li-quote-7').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');      
             $('.quote-text-7').addClass('show');             
             $('.quote-text-7').removeClass('hide-bottom');
         });
         $('.li-quote-8').click(function(e){ 
             e.stopPropagation();
             $(".show").addClass('hide-top');
             $(".hide-top").removeClass('show');      
             $('.quote-text-8').addClass('show');             
             $('.quote-text-8').removeClass('hide-bottom');
         });
            
     
 });
 
 
 $(document).ready(function(){
     
        // hide-top
 
         $('.li-quote-1').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-1').addClass('look');
             $('.dp-name-1').removeClass('hide-dp-bottom');             
         });
 
         $('.li-quote-2').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-2').addClass('look');
             $('.dp-name-2').removeClass('hide-dp-bottom');             
         });
 
         $('.li-quote-3').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-3').addClass('look');
             $('.dp-name-3').removeClass('hide-dp-bottom');             
         });
       $('.li-quote-4').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-4').addClass('look');
             $('.dp-name-4').removeClass('hide-dp-bottom');             
         });
       
         $('.li-quote-5').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-5').addClass('look');
             $('.dp-name-5').removeClass('hide-dp-bottom');             
         });
       
         $('.li-quote-6').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-6').addClass('look');
             $('.dp-name-6').removeClass('hide-dp-bottom');             
         });
         $('.li-quote-7').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-7').addClass('look');
             $('.dp-name-7').removeClass('hide-dp-bottom');             
         });
         $('.li-quote-8').click(function(e){ 
             e.stopPropagation();
             $(".look").addClass('hide-dp-top');
             $(".hide-dp-top").removeClass('look');
             $('.dp-name-8').addClass('look');
             $('.dp-name-8').removeClass('hide-dp-bottom');             
         });
            
     
 });