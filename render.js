// Oystein Haugseth @ Neue
// January 2018
// jshint esversion: 6


// set size of characters
let matrixSize = 15;
// hold array of streams
let streams = [];


function setup() {
  createCanvas(
    windowWidth,
    windowHeight-4
  );
  background(0);
  let x = 0;
  for (let i = 0; i <= width / matrixSize; i++) {
    let stream = new Stream();
    stream.generateMatrices(x, random(-1000, 0));
    streams.push(stream);
    x += matrixSize + 5;
  }
  textSize(matrixSize);
}

function draw() {
  background(34, 35, 42, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

// characters loaded
function Matrix(x, y, speed, first) {
  // coordinates x and y to display characters
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
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
  // amount of different matrixs in a stream
  this.totalMatrices = round(random(5, 30));
  this.speed = random(3, 5);

  this.generateMatrices = function(x, y) {
    // chance of light first character
    let first = round(random(0, 4)) === 1;
    // function to render matrices
    for (let i = 0; i <= this.totalMatrices; i++) {
      matrix = new Matrix(x, y, this.speed, first);
      matrix.setToRandomMatrix();
      this.Matrices.push(matrix);
      y -= matrixSize;
      first = false;
    }
  };
  this.render = function() {
    this.Matrices.forEach(function(matrix) {
      if (matrix.first) {
        // color for bright first color
        fill(166, 255, 198);
      } else {
        // color of characters
        fill(166, 255, 198);
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
