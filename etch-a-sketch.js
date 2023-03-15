const slider = document.getElementById("myRange");
const penColour = document.getElementById("pen-colour");
const backgroundColour = document.getElementById("background-colour");
const tools = document.getElementsByName("button-group");
const clear = document.querySelector(".clearButton");
let pen = document.getElementById("button1");
// Global variables
// Background colours
let num_boxes = slider.value; // Number of boxes per row
let size = 500 / num_boxes; // Size of a box

// Arrange the box vertically and horizontally
const drawingSheet = document.querySelector(".drawingSheet");
drawingSheet.style.display = "flex";
drawingSheet.style.flexWrap = "wrap";

slider.addEventListener("input", function () {
  num_boxes = slider.value;
  size = 500 / num_boxes;
  deleteBoxes();

  printBoxes(size);
  paint(size, penColour.value);
});

function printBoxes(size) {
  for (let i = 0; i < iteration(size); i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.classList.add(`num${i}`);
    box.style.height = `${size}px`;
    box.style.width = `${size}px`;
    box.style.backgroundColor = backgroundColour.value;

    drawingSheet.appendChild(box);
  }
  pen.checked = true;
  paint(size, penColour.value);
}

// count the number of iteration needed to fill the box
function iteration(size) {
  let drawingSheetArea = 250000;
  let boxArea = Math.pow(size, 2);
  return Math.ceil(drawingSheetArea / boxArea);
}

penColour.addEventListener("input", function () {
  paint(size, penColour.value);
});

backgroundColour.addEventListener("input", function () {
  background = backgroundColour.value;
  deleteBoxes();
  printBoxes(size);
  pen.checked = true;
  paint(size, penColour.value);
});

function paint(size, colour) {
  for (let i = 0; i < iteration(size); i++) {
    const selected = document.querySelector(`.num${i}`);
    selected.addEventListener("mouseover", function () {
      if (colour == "rainbow") {
        selected.style.backgroundColor = getRandomColor();
      } else {
        selected.style.backgroundColor = colour;
      }
    });
  }
}

function deleteBoxes() {
  const deleteBoxes = document.querySelectorAll(".box");
  deleteBoxes.forEach(function (element) {
    element.remove();
  });
}

for (let i = 0; i < tools.length; i++) {
  tools[i].addEventListener("click", function () {
    let tool = document.querySelector(
      'input[name="button-group"]:checked'
    ).value;

    if (tool == "pen") {
      paint(size, penColour.value);
    } else if (tool == "eraser") {
      paint(size, backgroundColour.value);
    } else if (tool == "rainbow") {
      paint(size, "rainbow");
    }
  });
}

clear.addEventListener("click", function () {
  const box = document.querySelectorAll(".box");
  for (let i = 0; i < iteration(size); i++) {
    box[i].style.backgroundColor = backgroundColour.value;
  }
});

function getRandomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Default
printBoxes(size);
