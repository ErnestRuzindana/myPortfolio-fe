const toggleButton = document.getElementById ("toggleButton");
const closeButton = document.getElementById("closeButton");
const nav = document.querySelector('nav')
nav.classList.remove('menu-btn');


toggleButton.addEventListener ("click", function(){
    nav.classList.add('menu-btn');
})

closeButton.addEventListener("click", function(){
    nav.classList.remove('menu-btn');
})


function slide(direction){
    var container = document.getElementById('homeboxes');
    scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 10;
        }else {
            container.scrollLeft += 10;
        }
        scrollCompleted += 10;
        if(scrollCompleted >= 330){
            window.clearInterval(slideVar);
        }
    }, 50);
}


