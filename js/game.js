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
const canvasWidth = 550;
const canvasHeight = 500;

//FUNCTIONS
function resetGame() {
  scenery = new Scenery(0, 0);
  frog = new Frog(
    canvasWidth / 2 - grid / 2,
    canvasHeight - grid + 10,
    grid * 0.5,
    0.1
  );

  frog.attach(null);
}

function gameOver() {
  resetGame();
  console.log("Game Over");
  //show an game over screen with highscore and stuff
}

//SETUP
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);

  resetGame();

  let index = 0;

  //row 1 - cars
  //would be nice to make an object out of this for each lane
  //maybe even add a function for creating a lane
  const row1amount = 2;
  const row1gap = 300;
  const row1speed = 2;
  const row1Length = 2;

  for (let i = 0; i < row1amount; i++) {
    let x = i * row1gap;

    cars[index] = new Car(
      x,
      height - grid * 2,
      grid * row1Length,
      grid,
      row1speed,
      0.2,
      Math.floor(Math.random() * 3),
      false
    );

    index++;
  }

  //row 2 - cars
  //here i need to find a way to rotate the cars
  const row2amount = 3;
  const row2gap = 200;
  const row2speed = -2.5;
  const row2Length = 2;

  for (let i = 0; i < row2amount; i++) {
    let x = i * row2gap;

    cars[index] = new Car(
      x,
      height - grid * 3,
      grid * row2Length,
      grid,
      row2speed,
      0.2,
      Math.floor(Math.random() * 3),
      true
    );

    index++;
  }

  //row 3 - cars
  const row3amount = 3;
  const row3gap = 250;
  const row3speed = 2.5;
  const row3Length = 2;

  for (let i = 0; i < row3amount; i++) {
    let x = i * row3gap;

    cars[index] = new Car(
      x,
      height - grid * 4,
      grid * row3Length,
      grid,
      row3speed,
      0.2,
      Math.floor(Math.random() * 3),
      false
    );

    index++;
  }

  index = 0;

  //row 5 - logs
  const row5amount = 3;
  const row5gap = 200;
  const row5speed = 3.2;
  const row5Length = 2;

  for (let i = 0; i < row5amount; i++) {
    let x = i * row5gap;

    logs[index] = new Log(
      x,
      height - grid * 6 + 10,
      grid * row5Length,
      grid,
      row5speed,
      0.2
    );

    index++;
  }

  //row 6 - logs
  const row6amount = 3;
  const row6gap = 180;
  const row6speed = -1.8;
  const row6Length = 2;

  for (let i = 0; i < row6amount; i++) {
    let x = i * row6gap;

    logs[index] = new Log(
      x,
      height - grid * 7 + 10,
      grid * row6Length,
      grid,
      row6speed,
      0.2
    );

    index++;
  }

  //row 7 - logs
  const row7amount = 3;
  const row7gap = 280;
  const row7speed = 4.2;
  const row7Length = 2;

  for (let i = 0; i < row7amount; i++) {
    let x = i * row7gap;

    logs[index] = new Log(
      x,
      height - grid * 8 + 10,
      grid * row7Length,
      grid,
      row7speed,
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
