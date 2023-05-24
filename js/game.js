//citations and introduction is in readme

//loading fonts
let pixelFont;
function preload() {
  pixelFont = loadFont("Assets/VT323/VT323-Regular.ttf");
}

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

//game states
let gameState = 1;
//1 = Start screen
//2 = Game is Active
//3 = Game Over - Ran over or drowned
//4 = Game Over - Ran out of time

//row objects
let row1 = {
  amount: 2,
  gap: 300,
  speed: 2 * level,
  length: 2,
};
let row2 = {
  amount: 3,
  gap: 300,
  speed: -2.5 * level,
  length: 2,
};
let row3 = {
  amount: 3,
  gap: 250,
  speed: 2.5 * level,
  length: 2,
};
//row4 is empty
let row5 = {
  amount: 3,
  gap: 200,
  speed: 3.2 * level,
  length: 2,
};
let row6 = {
  amount: 3,
  gap: 180,
  speed: -1.8 * level,
  length: 2,
};
let row7 = {
  amount: 3,
  gap: 280,
  speed: 4.2 * level,
  length: 2,
};

//GAME FUNCTIONS
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

  //updates the speeds of the logs and cars depending on level
  updateObjectSpeed();

  //updates cars and logs (so we can change the speed depending on level)
  updateCars();
  updateLogs();
}

function gameOver() {
  gameState = 3;
  console.log("Game Over");
  //show an game over screen with highscore and stuff
  level = 1;
  resetGame();
}

export function gameWon() {
  score = score + 100;
  level = level + 0.15;
  resetGame();
}

function updateObjectSpeed() {
  row1.speed = 2 * level;
  row2.speed = -2.5 * level;
  row3.speed = 2.5 * level;
  row5.speed = 3.2 * level;
  row6.speed = -1.8 * level;
  row7.speed = 4.2 * level;
}

function spawnCars() {
  let index = 0;
  //initializes a variable to keep track of the position in
  //the arrays where new objects are added, starting from the beginning of the array

  //row 1 - cars
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
}

function spawnLogs() {
  let index = 0;

  //row 5 - logs
  for (let i = 0; i < row5.amount; i++) {
    let x = i * row5.gap;

    logs[index] = new Log(
      x,
      height - grid * 6 + 10,
      grid * row5.length - 25,
      grid,
      row5.speed,
      0.2
    );

    index++;
  }

  //row 6 - logs
  for (let i = 0; i < row6.amount; i++) {
    let x = i * row6.gap;

    logs[index] = new Log(
      x,
      height - grid * 7 + 10,
      grid * row6.length - 25,
      grid,
      row6.speed,
      0.2
    );

    index++;
  }

  //row 7 - logs
  for (let i = 0; i < row7.amount; i++) {
    let x = i * row7.gap;

    logs[index] = new Log(
      x,
      height - grid * 8 + 10,
      grid * row7.length - 25,
      grid,
      row7.speed,
      0.2
    );

    index++;
  }
}

function updateCars() {
  cars = [];
  spawnCars();
}

function updateLogs() {
  logs = [];
  spawnLogs();
}

//base for the screen with text (starting screen and game over screen)
function screenBackground() {
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
  //Start Screen
  push();
  fill(0, 0, 0, 200);
  rect(0, 0, canvasWidth, canvasHeight);
  pop();
}

function startingScreen() {
  screenBackground();

  push();
  fill("#FFF");
  textFont(pixelFont);
  textAlign(CENTER);
  textSize(46);
  text("Welcome to Frogger", canvasWidth / 2, canvasHeight / 2 - 20);
  textSize(16);
  text(
    "Press Spacebar to Start, Good Luck!",
    canvasWidth / 2,
    canvasHeight / 2 + 10
  );
  pop();
}

function gameOverScreen() {
  screenBackground();

  push();
  fill("#FFF");
  textFont(pixelFont);
  textAlign(CENTER);
  textSize(46);
  text("Game Over", canvasWidth / 2, canvasHeight / 2 - 20);
  textSize(16);
  text(
    "Your score was " + score + ", try again!",
    canvasWidth / 2,
    canvasHeight / 2 + 10
  );
  text("Press Spacebar to Restart", canvasWidth / 2, canvasHeight / 2 + 30);
  pop();
}

function ranOutOfTimeScreen() {
  screenBackground();

  push();
  fill("#FFF");
  textFont(pixelFont);
  textAlign(CENTER);
  textSize(46);
  text("Game Over", canvasWidth / 2, canvasHeight / 2 - 20);
  textSize(16);
  text("You ran out of time :(", canvasWidth / 2, canvasHeight / 2 + 10);
  text(
    "Your score was " + score + ", try again!",
    canvasWidth / 2,
    canvasHeight / 2 + 30
  );
  text("Press Spacebar to Restart", canvasWidth / 2, canvasHeight / 2 + 50);
  pop();
}

//SETUP FUNCTION
function setup() {
  preload();
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  resetGame();

  spawnCars();

  //row 4 - empty

  spawnLogs();
}
window.setup = setup;

//DRAW FUNCTION
function draw() {
  if (gameState === 1) {
    startingScreen();
  } else if (gameState === 2) {
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

    //text
    push();
    fill("#FFF");
    textFont(pixelFont);
    textSize(24);
    text("time: " + Math.round(countdown / 36) + "s", 450, 25);
    text("score: " + score + "p", 20, 25);
    pop();

    //game mechanics
    if (gameIsActive === true) {
      countdown = countdown - 1;
    }

    if (countdown < 0) {
      gameIsActive = false;
      gameState = 4;
      resetGame();
    }

    frog.checkForWin(canvasWidth, 100);
  } else if (gameState === 3) {
    gameOverScreen();
  } else if (gameState === 4) {
    ranOutOfTimeScreen();
  }
}
window.draw = draw;

//CONTROLS
function keyPressed() {
  if (gameState === 1 && keyCode === 32) {
    gameState = 2;
  }

  if (gameState === 2) {
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
  console.log(keyCode);
  if (gameState === 3 && keyCode === 32) {
    gameState = 2;
    score = 0;
  }

  if (gameState === 4 && keyCode === 32) {
    gameState = 2;
    score = 0;
  }
}
window.keyPressed = keyPressed;
