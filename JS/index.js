//Phone Navigation Bar

const toggleButton = document.getElementById ("toggleButton");
const closeButton = document.getElementById("closeButton");
const nav = document.querySelector('nav')
nav.classList.remove('menu-btn');


toggleButton.addEventListener ("click", function(){
    nav.classList.add('menu-btn');
})



nav.addEventListener("click", function(){
    nav.classList.remove('menu-btn');
})


//Homeboxes Horizontal Scrollbar

const sliders = document.querySelector('.homeboxes');
var ImagePadding = 50;
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

var NavLinks = document.getElementById("navlinks");
var navActive = NavLinks.getElementsByClassName("navActive");

for (var i = 0; i < navActive.length; i++){
    navActive[i].addEventListener('click', function(){
        var current = document.getElementsByClassName("navHover"); 
        current[0].className = current[0].className.replace(" navHover", "");
        this.className += " navHover";
    });
}