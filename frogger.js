// Frogger Game by Liam Melkersson and Takoda Huff
// Jönköping University - 2023

// Welcome to the Frogger game, a modern take on the classic arcade game.
// In this game, the player must navigate a frog through various obstacles to reach its destination safely.
//

//
//VARIABLES
let frogX; //the frog's x position
let frogY; //the frog's y position
let frogSize = 50; //the frog's size

let lives = 3; //the number of lives the player has
let level = 1; //the current level the player is on
let score = 0; //the player's score
let gameover = false; //a gameover boolean

let cars = []; // an array to hold the cars
let logs = []; // an array to hold the logs
//
//
//

//
//FUNCTIONS
function drawFrog() {
  fill("097969");
  ellipse(frogX, frogY, frogSize, frogSize);
}

function spawnCars() {
  for (let i = 0; i < 5; i++) {
    let car = {
      // x: ,
      // y: ,
      // speed: ,
      // size: ,
    };
    cars.push;
  }
}

function drawCars() {
  fill(red); //color of the cars
  noStroke();
  for (let car of cars) {
    rect(car.x, car.y, car.size.x, car.size.y);
    car.x += car.speed; //makes cars go from left to right
    //what does this do?
    if (car.x > width + car.size / 2) {
      //the if statement checks if the log is outside of the screen
      car.x = -car.size.x / 2;
    }
  }
}

function spawnLogs() {
  for (let i = 0; i < 5; i++) {
    let log = {
      // x: ,
      // y: ,
      // speed: ,
      // size: ,
    };
    logs.push;
  }
}

function drawLogs() {
  fill(brown); //color of the logs
  noStroke();
  for (let log of logs) {
    rect(log.x, log.y, log.size.x, log.size.y);
    log.x += log.speed;
    if (log.x > width + log.size.x / 2) {
      log.x = -log.size.x / 2;
    }
    //moves the frog along if it's on a log
    if (
      frogY > log.y - log.size.y / 2 &&
      frogY < log.y + log.size.y / 2 &&
      frogX > log.x - log.size.x / 2 &&
      frogX < log.x + log.size.x / 2
    ) {
      frogX += log.speed;
    }
  }
}

function checkCollisions() {
  //check for collisions with cars
  for (let car of cars) {
    if (
      frogY > car.y - car.size.y / 2 &&
      frogY < car.y + car.size.y / 2 &&
      frogX > car.x - car.size.x / 2 &&
      frogX < car.x + car.size.x / 2
    ) {
      resetFrog(); //resets frog to bottom
      lives--; //mius 1 life
    }
  }
  //check for collisions with logs
  let onLog = false;
  for (let log of logs) {
    if (
      frogY > log.y - log.size.y / 2 &&
      frogY < log.y + log.size.y / 2 &&
      frogX > log.x - log.size.x / 2 &&
      frogX < log.x + log.size.x / 2
    ) {
      onLog = true;
      break; //the break statements terminates the loop before it's actually done
    }
  }
  if (!onLog) {
    resetFrog(); //resets frog to bottom
    lives--; //minus 1 life
  }
}

function checkwin() {
  if (frogY < 50) {
    // if the frog has reached the other side
    score += 10; //increment the score by 10
    level++; //increment the level
    resetFrog(); //resets the frog's position
    spawnCars(); //spawns new cars
    spawnLogs(); //spawns new logs
  }
}

function updateScore() {
  textSize(24); //font size
  fill(0); //text color
  text("Score: " + score, 10, 30); //displays the score (at 10,30)
}

function resetFrog() {
  frogX = width / 2; //resets the frog to the middle of the screen
  frogY = height - 50; //resets the frog to the bottom of the screen
  //might need to add a variable instead of 50 later
}

function gameover() {}

//
//
//SETUP (set ups the game and fixes the canvas)
function setup() {
  createCanvas(750, 750); //setting the canvas size
  frameRate(30); //set's the framerate to 30 (how often it updates the frame)

  frogX = width / 2; //this puts the frog in the center of the screen
  frogY = height - frogSize / 2; //this puts the frog at the bottom of the screen

  spawnCars(); //spawns cars
  spawnLogs(); //spawns logs
}
//
//
//

//
//DRAW FUNCTION (runs continuously and updates the game)
function draw() {
  if (!gameover) {
    background(0, 100, 200); //set background color

    drawFrog(); //draws the frog
    drawCars(); //draws cars
    drawLogs(); //draws logs

    checkCollisions();
    checkWin();
    updateScore();
  } else {
    gameover(); //display the game over screen
  }
}
