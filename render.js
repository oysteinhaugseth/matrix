// Oystein Haugseth @ Neue
// January 2018
// jshint esversion: 6

// set size of characters
let matrixSize = 12;
// hold array of streams
let streams = [];
// variable for graphik
let graphik;
// index character
let index = 0;

function preload() {
  graphik = loadFont('Graphik-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  background(0);
  textFont(graphik);
  // x set horizontal start of matrix
  let x = 0;
  // generate amount of streams
  for (let i = 0; i <= (width / matrixSize); i++) {
    let stream = new Stream();
    // randomize start parameter
    stream.generateMatrices(x, random(-1000, 0));
    streams.push(stream);
    // horizontal space between streams
    x += matrixSize + 10;
  }
  textSize(matrixSize);
}

function draw() {
  // background color and blur
  background(29, 29, 40, 200);
  // iterate over index character
  // calls the rendering
  streams.forEach(function(stream) {
    stream.render();
  });
}


function Matrix(x, y, speed, first) {
  // coordinates x and y to display characters
  this.x = x;
  this.y = y;
  this.speed = speed;
  // refresh rate of new characters
  this.switchInterval = round(random(10, 20));
  this.first = first;
  this.index = 0;
  // function to generate random characters
  this.setToRandomMatrix = function() {
    if (frameCount % this.switchInterval == 0) {
      let streamLetters = ['S', 'O', 'L', 'U', 'T', 'I', 'O', 'N', ' ', 'S', 'E', 'E', 'K', 'E', 'R', ' '];
      // this.character = streamLetters;
      this.index += 1;
      if (this.index > 15) {
        this.index = 0;
      }
      this.character = streamLetters[this.index];
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
  this.totalMatrices = round(random(5, 14));
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
      y -= matrixSize + 14;
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
        fill(180);
      }
      // function to randomly display characters from this.character at x and y coordinates
      text(matrix.character, matrix.x, matrix.y);
      // calls the rain function
      matrix.rain();
      matrix.setToRandomMatrix();
    });
  };
}







function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
