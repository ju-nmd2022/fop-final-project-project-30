// Frogger Game by Liam Melkersson
// Jönköping University - 2023

// Welcome to the Frogger game, a modern take on the classic arcade game.
// In this game, the player must navigate a frog through various obstacles
// to reach its destination safely.
//

// Citations and references:
//      1. Formatting done by ChatGpt (boring repetitive tasks, like reference 2) and Prettier.
//      2. ChatGPT helped with mirroring the pixel drawing of the frog (boring and repetitive stuff really).
//      3. Hitbox implementation based on: https://www.youtube.com/watch?v=06-ZvYmSeus
//      4. Attaching the frogs to moving logs based on: https://www.youtube.com/watch?v=hk326ZHlENQ&t=0s
//      5. ChatGPT helped me with the idea of using newX and newY in the Frog class to prevent the frog from leaving the canvas
//

//IMPORT
import Frog from "./frog.js";
import Car from "./car.js";
import Log from "./log.js";
import Scenery from "./scenery.js";

//VARIABLES
// class variables
let frog;
let cars = [];
let logs = [];
let scenery;

// general game variables
export const grid = 50;
export const canvasWidth = 550;
export const canvasHeight = 500;
let countdown = 360;
let score = 0;
let level = 1;
let gameIsActive = true;
// let gameHas = true;

//FUNCTIONS
function resetGame() {
  //resets background
  scenery = new Scenery(0, 0);

  //resets frog
  frog = new Frog(
    canvasWidth / 2 - grid / 2,
    canvasHeight - grid + 10,
    grid * 0.5,
    0.1
  );

  frog.attach(null);

  //reset gameIsActive varaible
  gameIsActive = true;

  //reset countdown
  countdown = 360;
}

function gameOver() {
  resetGame();
  console.log("Game Over");
  //show an game over screen with highscore and stuff
  score = 0;
  level = 0;
}

export function gameWon() {
  score = score + 100;
  level = level + 1;
  resetGame();
}

//SETUP
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  resetGame();

  let index = 0;
  //initializes a variable to keep track of the position in
  //the arrays where new objects are added, starting from the beginning of the array

  //row 1 - cars
  let row1 = {
    amount: 2,
    gap: 300,
    speed: 2 * level,
    length: 2,
  };
  for (let i = 0; i < row1.amount; i++) {
    let x = i * row1.gap;

    cars[index] = new Car(
      x,
      height - grid * 2,
      grid * row1.length,
      grid,
      row1.speed,
      0.2,
      Math.floor(Math.random() * 3),
      false
    );

    index++;
  }

  //row 2 - cars (rotated)
  let row2 = {
    amount: 3,
    gap: 300,
    speed: -2.5 * level,
    length: 2,
  };
  for (let i = 0; i < row2.amount; i++) {
    let x = i * row2.gap;

    cars[index] = new Car(
      x,
      height - grid * 3,
      grid * row2.length,
      grid,
      row2.speed,
      0.2,
      Math.floor(Math.random() * 3),
      true
    );

    index++;
  }

  //row 3 - cars
  let row3 = {
    amount: 3,
    gap: 250,
    speed: 2.5 * level,
    length: 2,
  };
  for (let i = 0; i < row3.amount; i++) {
    let x = i * row3.gap;

    cars[index] = new Car(
      x,
      height - grid * 4,
      grid * row3.length,
      grid,
      row3.speed,
      0.2,
      Math.floor(Math.random() * 3),
      false
    );

    index++;
  }

  //row 4 - empty

  index = 0;

  //row 5 - logs
  let row5 = {
    amount: 3,
    gap: 200,
    speed: 3.2 * level,
    length: 2,
  };
  for (let i = 0; i < row5.amount; i++) {
    let x = i * row5.gap;

    logs[index] = new Log(
      x,
      height - grid * 6 + 10,
      grid * row5.length,
      grid,
      row5.speed,
      0.2
    );

    index++;
  }

  //row 6 - logs
  let row6 = {
    amount: 3,
    gap: 180,
    speed: -1.8 * level,
    length: 2,
  };
  for (let i = 0; i < row6.amount; i++) {
    let x = i * row6.gap;

    logs[index] = new Log(
      x,
      height - grid * 7 + 10,
      grid * row6.length,
      grid,
      row6.speed,
      0.2
    );

    index++;
  }

  //row 7 - logs
  let row7 = {
    amount: 3,
    gap: 280,
    speed: 4.2 * level,
    length: 2,
  };
  for (let i = 0; i < row7.amount; i++) {
    let x = i * row7.gap;

    logs[index] = new Log(
      x,
      height - grid * 8 + 10,
      grid * row7.length,
      grid,
      row7.speed,
      0.2
    );

    index++;
  }
}
window.setup = setup;

//DRAW FUNCTION
function draw() {
  //general
  scenery.draw();
  console.log(level);

  //cars
  for (let i = 0; i < cars.length; i++) {
    cars[i].update();
    cars[i].draw();

    if (frog.overlaps(cars[i])) {
      gameOver();
    }
  }

  //logs
  for (let i = 0; i < logs.length; i++) {
    logs[i].update();
    logs[i].drawLog();
  }

  //frog
  if (frog.y < height - grid * 5 && frog.y > grid * 2) {
    let safe = false;

    for (let i = 0; i < logs.length; i++) {
      if (frog.overlaps(logs[i])) {
        safe = true;
        frog.attach(logs[i]);
      }
    }

    if (!safe) {
      gameOver();
    }
  } else {
    frog.attach(null);
  }

  frog.update();
  frog.draw();

  //text
  push();
  fill("#FFF");
  textSize(18);
  text("time: " + Math.round(countdown / 36) + "s", 470, 20);
  text("score: " + score + "p", 20, 20);
  pop();

  //game mechanics
  if (gameIsActive === true) {
    countdown = countdown - 1;
  }

  if (countdown < 0) {
    gameIsActive = false;
    gameOver();
    resetGame();
  }

  frog.checkForWin(canvasWidth, 100);
}
window.draw = draw;

//CONTROLS
function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    frog.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    frog.move(1, 0);
  } else if (keyCode === UP_ARROW || keyCode === 87) {
    frog.move(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    frog.move(0, 1);
  }
}
window.keyPressed = keyPressed;
