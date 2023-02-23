var texts = ["GIS Developer", "Web Developer", "Urban Planner"];

var currentTextIndex = 0;
var currentCharacterIndex = 0;
var direction = 1;
var speed = 250;
var element = document.getElementById("careerEffect");

setInterval(function() {
  var currentText = texts[currentTextIndex];

  var output = currentText.substring(0, currentCharacterIndex);
  if (direction == 1) {
    currentCharacterIndex++;
    if (currentCharacterIndex > currentText.length) {
      direction = -1;
    }
  } else {
    currentCharacterIndex--;
    if (currentCharacterIndex < 0) {
      direction = 1;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
    }
  }

  element.innerHTML = output;

}, speed);