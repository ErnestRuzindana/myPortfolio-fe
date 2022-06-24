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


//Homeboxes Horizontal Scrollbar

const sliders = document.querySelector('.homeboxes');
var ImagePadding = 45;
var scrollPerClick = document.querySelector('.boxes').clientWidth + ImagePadding;
var ScrollAmount = 0;

function SliderScrollLeft(){
    sliders.scrollTo({
        top: 0,
        left: (ScrollAmount -= scrollPerClick),
        behavior: 'smooth'
    });

    if(ScrollAmount < 0) {
        ScrollAmount = 0;
    }
}

function SliderScrollRight(){
    if(ScrollAmount <= sliders.scrollWidth - sliders.clientWidth){
    sliders.scrollTo({
        top: 0,
        left: (ScrollAmount += scrollPerClick),
        behavior: 'smooth'
    });

}

}


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