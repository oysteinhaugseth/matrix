// Oystein Haugseth @ Neue
// January 2018
// jshint esversion: 6


// set size of characters
let matrixSize = 10;
// hold array of streams
let streams = [];


function setup() {
  createCanvas(windowWidth, windowHeight-4);
  background(0);
  let x = 0;
  for (let i = 0; i <= width / matrixSize; i++) {
    let stream = new Stream();
    // randomize start
    stream.generateMatrices(x, random(-1000, 0));
    streams.push(stream);
    // horizontal space between streams
    x += matrixSize + 10;
  }
  textSize(matrixSize);
}

function draw() {
  // background color and blur
  background(25, 200);
  // calls the rendering
  streams.forEach(function(stream) {
    stream.render();
  });
}

// characters loaded
function Matrix(x, y, speed, first) {
  // coordinates x and y to display characters
  this.x = x;
  this.y = y;
  this.speed = speed;
  // refresh rate of new characters
  this.switchInterval = round(random(10, 20));
  this.first = first;

  // function to generate random characters
  this.setToRandomMatrix = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        // choose random Katakana from of total of 96
        0x30A0 + round(random(0, 96))
      );
    }
  };
  // function to change y position of characters
  this.rain = function() {
    // if y is equal to height it has reached bottom and is reset to 0, if not add speed
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  };
}




function Stream() {
  // array of streams
  this.Matrices = [];
  // length of streams
  this.totalMatrices = round(random(5, 20));
  // speed (vertical movement)
  this.speed = random(1, 3);

  this.generateMatrices = function(x, y) {
    // chance of light first character
    let first = round(random(0, 4)) === 1;
    // function to render matrices
    for (let i = 0; i <= this.totalMatrices; i++) {
      matrix = new Matrix(x, y, this.speed, first);
      matrix.setToRandomMatrix();
      this.Matrices.push(matrix);
      // space between characters
      y -= matrixSize + 10;
      first = false;
    }
  };
  this.render = function() {
    this.Matrices.forEach(function(matrix) {
      if (matrix.first) {
        // color for bright first color
        fill(200);
      } else {
        // color of characters
        fill(150);
      }
      // function to randomly display characters from this.value at x and y coordinates
      text(matrix.value, matrix.x, matrix.y);
      // calls the rain function
      matrix.rain();
      matrix.setToRandomMatrix();
    });
  };
}







function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
