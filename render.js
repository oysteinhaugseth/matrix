// Oystein Haugseth @ Neue
// January 2018
// jshint esversion: 6

// set size of characters
let letterSize = 12;
// hold array of streamArray
let streamArray = [];
// variable for graphik
let graphik;

function preload() {
  graphik = loadFont('Graphik-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  background(0);
  textFont(graphik);
  // x set horizontal start of matrix
  let x = 0;
  // generate amount of streamArray
  for (let i = 0; i <= (width / letterSize); i++) {
    let stream = new Stream();
    // randomize start parameter
    stream.generateStreamArray(x, random(-1000, 0));
    streamArray.push(stream);
    // horizontal space between streamArray
    x += letterSize + 10;
  }
  textSize(letterSize);
}

function draw() {
  // background color and blur
  background(29, 29, 40, 200);
  // iterate over index character
  // calls the rendering
  streamArray.forEach(function(stream) {
    stream.render();
  });
}


function Matrix(x, y, speed, first) {
  // coordinates x and y to display characters
  this.x = x;
  this.y = y;
  this.speed = speed;
  // refresh rate of characters
  this.switchInterval = round(random(10, 20));
  this.first = first;
  this.index = 0;
  // function to load letters
  this.setToStreamLetters = function() {
    if (frameCount % this.switchInterval == 0) {
      let streamLetters = ['S', 'O', 'L', 'U', 'T', 'I', 'O', 'N', 'S', 'E', 'E', 'K', 'E', 'R', ' '];
      // pull letters from array in sequence
      this.index += 1;
      if (this.index >= streamLetters.length) {
        this.index = 0;
      }
      this.character = streamLetters[this.index];
    }
  };
  // function to loop y position of streams
  this.yLimit = function() {
    // if y is equal to height it has reached bottom and is reset to 0, if not keep momentum
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  };
}


function Stream() {
  // array of streams
  this.streams = [];
  // length of streams
  this.streamsLength = round(random(5, 14));
  // speed (vertical movement)
  this.speed = random(1, 3);
  this.generateStreamArray = function(x, y) {
    // chance of light first character
    let first = round(random(0, 4)) === 1;
    // function to render streams
    for (let i = 0; i <= this.streamsLength; i++) {
      matrix = new Matrix(x, y, this.speed, first);
      matrix.setToStreamLetters();
      this.streams.push(matrix);
      // space between characters
      y -= letterSize + 14;
      first = false;
    }
  };
  this.render = function() {
    this.streams.forEach(function(matrix) {
      if (matrix.first) {
        // color for bright first color
        fill(166, 255, 198);
      } else {
        // color of characters
        fill(180);
      }
      // function to randomly display characters from this.character at x and y coordinates
      text(matrix.character, matrix.x, matrix.y);
      // calls the yLimit function
      matrix.yLimit();
      matrix.setToStreamLetters();
    });
  };
}







function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
