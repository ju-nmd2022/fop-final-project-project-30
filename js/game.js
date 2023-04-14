// Frogger Game by Liam Melkersson
// Jönköping University - 2023

// Welcome to the Frogger game, a modern take on the classic arcade game.
// In this game, the player must navigate a frog through various obstacles
// to reach its destination safely.
//

// Citations and references:
// ChatGPT helped with: 1. mirroring the pixel drawing of the frog.
// Formatting done by ChatGpt and Prettier.

//IMPORTS FROM MODULES
import Scenery from "./scenery.js";
import Frog from "./frog.js";
import Car from "./car.js";
import Log from "./log.js";

//CANVAS SETUP
function setup() {
  createCanvas(500, 500);
  frameRate(30);
}
window.setup = setup;

//VARIABLES
//general game variables
let lives = 3;
let level = 1;
let score = 0; //the player's score
let countdown = 60;
let gameover = false; //a gameover bool

//background variables
const scenery = new Scenery(0, 0);

//frog variables
let frogSettings = {
  x: 235,
  y: 450,
  s: 0.1,
  speed: 70,
};
const frog = new Frog(frogSettings.x, frogSettings.y, frogSettings.s);

//car variables
let cars = []; // an array to hold the cars
let carSettings = {
  x: -150,
  y: 365,
  size: 0.25,
  speed: 2.5,
  color: Math.floor(Math.random() * 3 + 1),
  lastSpawnTime: 0,
};

//log variables
let logs = []; // an array to hold the logs
let logSettings = {
  x: -150,
  y: 170,
  size: 0.25,
  speed: 2,
  lastSpawnTime: 0,
};

//FUNCTIONS
function drawText() {
  push();
  fill("#FFF");
  textAlign(CENTER);
  text("Score: " + score + "p", 33, 20);
  text("Time: " + countdown + "s", 467, 20);
  pop();
}

// function drawFrog(x, y, s) {
//   const frogColor = {
//     outline: "#21391f",
//     darkGreen: "#476422",
//     green: "#588425",
//     lightGreen: "#69992c",
//     lightestGreen: "#92c84e",
//     superLightGreen: "#b5e671",
//   };

//   //outline
//   push();
//   noStroke();
//   translate(x, y);
//   fill(frogColor.outline);
//   rect(0 * s, 20 * s, 10 * s);
//   rect(10 * s, 10 * s, 10 * s);
//   rect(10 * s, 30 * s, 10 * s);
//   rect(20 * s, 10 * s, 10 * s);
//   rect(20 * s, 20 * s, 10 * s);
//   rect(20 * s, 40 * s, 10 * s);
//   rect(20 * s, 190 * s, 10 * s);
//   rect(20 * s, 210 * s, 10 * s);
//   rect(20 * s, 230 * s, 10 * s);
//   rect(30 * s, 0 * s, 10 * s);
//   rect(30 * s, 50 * s, 10 * s, 40 * s);
//   rect(30 * s, 130 * s, 10 * s, 30 * s);
//   rect(30 * s, 180 * s, 10 * s);
//   rect(30 * s, 200 * s, 10 * s);
//   rect(30 * s, 220 * s, 10 * s);
//   rect(30 * s, 240 * s, 40 * s, 10 * s);
//   rect(40 * s, 10 * s, 10 * s, 20 * s);
//   rect(40 * s, 90 * s, 10 * s, 20 * s);
//   rect(40 * s, 120 * s, 10 * s);
//   rect(40 * s, 160 * s, 10 * s, 30 * s);
//   rect(50 * s, 0 * s, 10 * s, 10 * s);
//   rect(50 * s, 110 * s, 30 * s, 10 * s);
//   rect(50 * s, 180 * s, 10 * s, 20 * s);
//   rect(60 * s, 10 * s, 10 * s, 20 * s);
//   rect(60 * s, 40 * s, 10 * s, 20 * s);
//   rect(60 * s, 150 * s, 10 * s);
//   rect(60 * s, 200 * s, 10 * s);
//   rect(70 * s, 10 * s, 10 * s);
//   rect(70 * s, 30 * s, 10 * s);
//   rect(70 * s, 60 * s, 20 * s);
//   rect(70 * s, 160 * s, 10 * s);
//   rect(70 * s, 230 * s, 20 * s, 10 * s);
//   rect(80 * s, 20 * s, 10 * s);
//   rect(80 * s, 50 * s, 10 * s, 50 * s);
//   rect(80 * s, 120 * s, 10 * s);
//   rect(80 * s, 170 * s, 10 * s);
//   rect(90 * s, 40 * s, 10 * s);
//   rect(90 * s, 100 * s, 10 * s);
//   rect(90 * s, 130 * s, 10 * s);
//   rect(90 * s, 180 * s, 10 * s);
//   rect(90 * s, 220 * s, 10 * s);
//   rect(100 * s, 30 * s, 10 * s);
//   rect(100 * s, 140 * s, 10 * s);
//   rect(100 * s, 190 * s, 10 * s, 30 * s);
//   rect(110 * s, 20 * s, 30 * s, 10 * s);
//   rect(110 * s, 150 * s, 10 * s);
//   rect(110 * s, 200 * s, 10 * s);
//   rect(120 * s, 210 * s, 60 * s, 10 * s);
//   rect(140 * s, 30 * s, 20 * s, 10 * s);
//   rect(160 * s, 20 * s, 30 * s, 10 * s);
//   rect(180 * s, 200 * s, 10 * s);
//   rect(180 * s, 150 * s, 10 * s);
//   rect(190 * s, 30 * s, 10 * s);
//   rect(190 * s, 140 * s, 10 * s);
//   rect(190 * s, 190 * s, 10 * s, 30 * s);
//   rect(200 * s, 40 * s, 10 * s);
//   rect(200 * s, 100 * s, 10 * s);
//   rect(200 * s, 130 * s, 10 * s);
//   rect(200 * s, 180 * s, 10 * s);
//   rect(200 * s, 220 * s, 10 * s);
//   rect(210 * s, 20 * s, 10 * s);
//   rect(210 * s, 50 * s, 10 * s, 50 * s);
//   rect(210 * s, 120 * s, 10 * s);
//   rect(210 * s, 170 * s, 10 * s);
//   rect(210 * s, 230 * s, 20 * s, 10 * s);
//   rect(220 * s, 10 * s, 20 * s, 10 * s);
//   rect(220 * s, 30 * s, 10 * s);
//   rect(220 * s, 60 * s, 10 * s, 20 * s);
//   rect(220 * s, 110 * s, 30 * s, 10 * s);
//   rect(220 * s, 160 * s, 10 * s);
//   rect(230 * s, 20 * s, 10 * s);
//   rect(230 * s, 40 * s, 10 * s, 20 * s);
//   rect(230 * s, 150 * s, 10 * s);
//   rect(230 * s, 200 * s, 10 * s);
//   rect(230 * s, 240 * s, 40 * s, 10 * s);
//   rect(240 * s, 0 * s, 10 * s);
//   rect(240 * s, 180 * s, 10 * s, 20 * s);
//   rect(250 * s, 10 * s, 10 * s, 20 * s);
//   rect(250 * s, 90 * s, 10 * s, 20 * s);
//   rect(250 * s, 120 * s, 10 * s);
//   rect(250 * s, 160 * s, 10 * s, 30 * s);
//   rect(260 * s, 0 * s, 10 * s);
//   rect(260 * s, 50 * s, 10 * s, 40 * s);
//   rect(260 * s, 130 * s, 10 * s, 30 * s);
//   rect(260 * s, 180 * s, 10 * s);
//   rect(260 * s, 200 * s, 10 * s);
//   rect(260 * s, 220 * s, 10 * s);
//   rect(270 * s, 10 * s, 10 * s, 20 * s);
//   rect(270 * s, 40 * s, 10 * s);
//   rect(270 * s, 190 * s, 10 * s);
//   rect(270 * s, 210 * s, 10 * s);
//   rect(270 * s, 230 * s, 10 * s);
//   rect(280 * s, 10 * s, 10 * s);
//   rect(280 * s, 30 * s, 10 * s);
//   rect(290 * s, 20 * s, 10 * s);

//   //Dark green parts
//   fill(frogColor.darkGreen);

//   rect(10 * s, 20 * s, 10 * s);
//   rect(20 * s, 30 * s, 50 * s, 10 * s);
//   rect(30 * s, 10 * s, 10 * s, 30 * s);
//   rect(30 * s, 190 * s, 10 * s);
//   rect(30 * s, 210 * s, 20 * s, 10 * s);
//   rect(30 * s, 230 * s, 40 * s, 10 * s);
//   rect(40 * s, 220 * s, 10 * s);
//   rect(50 * s, 10 * s, 10 * s, 60 * s);
//   rect(50 * s, 100 * s, 40 * s, 10 * s);
//   rect(50 * s, 220 * s, 40 * s, 10 * s);
//   rect(60 * s, 60 * s, 10 * s, 40 * s);
//   rect(70 * s, 20 * s, 10 * s);
//   rect(70 * s, 80 * s, 10 * s, 20 * s);
//   rect(80 * s, 210 * s, 10 * s, 20 * s);
//   rect(80 * s, 180 * s, 10 * s);
//   rect(80 * s, 110 * s, 20 * s, 10 * s);
//   rect(90 * s, 190 * s, 10 * s, 30 * s);
//   rect(90 * s, 120 * s, 20 * s, 10 * s);
//   rect(90 * s, 50 * s, 10 * s);
//   rect(90 * s, 90 * s, 10 * s);
//   rect(100 * s, 130 * s, 10 * s);
//   rect(190 * s, 120 * s, 10 * s, 20 * s);
//   rect(200 * s, 50 * s, 10 * s);
//   rect(200 * s, 90 * s, 10 * s);
//   rect(200 * s, 110 * s, 10 * s, 20 * s);
//   rect(200 * s, 190 * s, 10 * s, 30 * s);
//   rect(210 * s, 100 * s, 10 * s, 20 * s);
//   rect(210 * s, 180 * s, 10 * s);
//   rect(210 * s, 210 * s, 10 * s, 20 * s);
//   rect(220 * s, 20 * s, 10 * s);
//   rect(220 * s, 80 * s, 10 * s, 30 * s);
//   rect(220 * s, 220 * s, 40 * s, 10 * s);
//   rect(230 * s, 30 * s, 10 * s);
//   rect(230 * s, 60 * s, 10 * s, 50 * s);
//   rect(230 * s, 230 * s, 40 * s, 10 * s);
//   rect(240 * s, 10 * s, 10 * s, 60 * s);
//   rect(240 * s, 100 * s, 10 * s);
//   rect(250 * s, 30 * s, 30 * s, 10 * s);
//   rect(250 * s, 210 * s, 20 * s, 10 * s);
//   rect(260 * s, 10 * s, 10 * s, 20 * s);
//   rect(260 * s, 190 * s, 10 * s);
//   rect(280 * s, 20 * s, 10 * s);

//   fill(frogColor.green);
//   //left arm
//   rect(30 * s, 40 * s, 20 * s, 10 * s);
//   rect(40 * s, 50 * s, 10 * s, 40 * s);
//   rect(50 * s, 70 * s, 10 * s, 30 * s);

//   //right arm
//   rect(240 * s, 70 * s, 10 * s, 30 * s);
//   rect(250 * s, 40 * s, 10 * s, 50 * s);
//   rect(260 * s, 40 * s, 10 * s);

//   //back + head
//   rect(90 * s, 170 * s, 120 * s, 10 * s);
//   rect(100 * s, 180 * s, 100 * s, 10 * s);
//   rect(100 * s, 90 * s, 10 * s, 30 * s);
//   rect(110 * s, 100 * s, 10 * s, 50 * s);
//   rect(110 * s, 160 * s, 10 * s, 40 * s);
//   rect(120 * s, 110 * s, 60 * s, 100 * s);
//   rect(180 * s, 160 * s, 10 * s, 40 * s);
//   rect(180 * s, 100 * s, 10 * s, 50 * s);
//   rect(190 * s, 90 * s, 10 * s, 30 * s);
//   rect(90 * s, 60 * s, 10 * s, 30 * s);
//   rect(200 * s, 60 * s, 10 * s, 30 * s);

//   //left leg
//   rect(100 * s, 150 * s, 10 * s);
//   rect(90 * s, 140 * s, 10 * s);
//   rect(80 * s, 130 * s, 10 * s);
//   rect(70 * s, 120 * s, 10 * s);
//   rect(80 * s, 160 * s, 10 * s);
//   rect(70 * s, 170 * s, 10 * s);
//   rect(60 * s, 160 * s, 10 * s);
//   rect(40 * s, 190 * s, 10 * s, 20 * s);
//   rect(50 * s, 200 * s, 10 * s, 20 * s);
//   rect(60 * s, 210 * s, 20 * s, 10 * s);
//   rect(70 * s, 200 * s, 20 * s, 10 * s);
//   rect(80 * s, 190 * s, 10 * s);

//   //right leg
//   //here chatgpt helped me just mirror it
//   rect((150 + (150 - 100) - 10) * s, 150 * s, 10 * s);
//   rect((150 + (150 - 90) - 10) * s, 140 * s, 10 * s);
//   rect((150 + (150 - 80) - 10) * s, 130 * s, 10 * s);
//   rect((150 + (150 - 70) - 10) * s, 120 * s, 10 * s);
//   rect((150 + (150 - 80) - 10) * s, 160 * s, 10 * s);
//   rect((150 + (150 - 70) - 10) * s, 170 * s, 10 * s);
//   rect((150 + (150 - 60) - 10) * s, 160 * s, 10 * s);
//   rect((150 + (150 - 40) - 10) * s, 190 * s, 10 * s, 20 * s);
//   rect((150 + (150 - 50) - 10) * s, 200 * s, 10 * s, 20 * s);
//   rect((150 + (150 - 60) - 20) * s, 210 * s, 20 * s, 10 * s);
//   rect((150 + (150 - 70) - 20) * s, 200 * s, 20 * s, 10 * s);
//   rect((150 + (150 - 80) - 10) * s, 190 * s, 10 * s);

//   fill(frogColor.lightGreen);
//   //left leg
//   rect(40 * s, 130 * s, 40 * s, 20 * s);
//   rect(40 * s, 150 * s, 20 * s, 10 * s);
//   rect(50 * s, 120 * s, 20 * s, 10 * s);
//   rect(50 * s, 160 * s, 10 * s, 20 * s);
//   rect(60 * s, 170 * s, 10 * s, 30 * s);
//   rect(70 * s, 180 * s, 10 * s, 30 * s);
//   rect(70 * s, 150 * s, 10 * s);
//   rect(80 * s, 140 * s, 10 * s, 20 * s);
//   rect(90 * s, 150 * s, 10 * s, 20 * s);
//   rect(100 * s, 160 * s, 10 * s);

//   //head
//   rect(100 * s, 60 * s, 100 * s, 30 * s);
//   rect(110 * s, 90 * s, 80 * s, 10 * s);
//   rect(120 * s, 100 * s, 60 * s, 10 * s);
//   rect(140 * s, 40 * s, 20 * s);
//   rect(130 * s, 50 * s, 40 * s, 10 * s);
//   rect(130 * s, 30 * s, 10 * s);
//   rect(160 * s, 30 * s, 10 * s);

//   //right leg
//   rect(190 * s, 160 * s, 20 * s, 10 * s);
//   rect(200 * s, 150 * s, 30 * s, 10 * s);
//   rect(210 * s, 140 * s, 10 * s);
//   rect(220 * s, 130 * s, 40 * s, 20 * s);
//   rect(220 * s, 180 * s, 10 * s, 20 * s);
//   rect(230 * s, 120 * s, 20 * s, 10 * s);
//   rect(230 * s, 170 * s, 10 * s, 30 * s);
//   rect(240 * s, 150 * s, 10 * s, 30 * s);
//   rect(250 * s, 150 * s, 10 * s);

//   fill(frogColor.lightestGreen);
//   rect(100 * s, 50 * s, 30 * s, 10 * s);
//   rect(110 * s, 40 * s, 20 * s, 10 * s);
//   rect(170 * s, 50 * s, 30 * s, 10 * s);
//   rect(170 * s, 40 * s, 20 * s, 10 * s);

//   fill(frogColor.superLightGreen);
//   rect(100 * s, 40 * s, 10 * s);
//   rect(110 * s, 30 * s, 20 * s, 10 * s);
//   rect(130 * s, 40 * s, 10 * s);
//   rect(160 * s, 40 * s, 10 * s);
//   rect(170 * s, 30 * s, 20 * s, 10 * s);
//   rect(190 * s, 40 * s, 10 * s);
//   pop();
// }

// function drawCar(x, y, s, color) {
//   carColor = {
//     outline: "#282828",
//     windshield: "#93e7e8",
//     highlight: "#FFF",

//     //red car
//     lightRed: "#d9705b",
//     red: "#c83d28",
//     darkRed: "#910100",

//     //blue car
//     lightBlue: "#5b67d9",
//     blue: "#283ec8",
//     darkBlue: "#002491",

//     //yellow car
//     lightYellow: "#d9cc5b",
//     yellow: "#c8b128",
//     darkYellow: "#916c00",
//   };

//   push();
//   noStroke();
//   translate(x, y);

//   //outline
//   fill(carColor.outline);
//   rect(0 * s, 40 * s, 10 * s, 160 * s);
//   rect(10 * s, 30 * s, 10 * s);
//   rect(10 * s, 50 * s, 10 * s);
//   rect(10 * s, 200 * s, 10 * s);
//   rect(10 * s, 180 * s, 10 * s);
//   rect(20 * s, 20 * s, 240 * s, 10 * s);
//   rect(20 * s, 40 * s, 60 * s, 10 * s);
//   rect(20 * s, 190 * s, 60 * s, 10 * s);
//   rect(20 * s, 210 * s, 240 * s, 10 * s);
//   rect(60 * s, 90 * s, 10 * s, 60 * s);
//   rect(70 * s, 40 * s, 10 * s, 50 * s);
//   rect(70 * s, 150 * s, 10 * s, 50 * s);
//   rect(80 * s, 50 * s, 30 * s, 10 * s);
//   rect(80 * s, 180 * s, 30 * s, 10 * s);
//   rect(100 * s, 30 * s, 10 * s);
//   rect(100 * s, 200 * s, 10 * s);
//   rect(110 * s, 40 * s, 100 * s, 10 * s);
//   rect(110 * s, 190 * s, 100 * s, 10 * s);
//   rect(180 * s, 200 * s, 10 * s);
//   rect(180 * s, 30 * s, 10 * s);
//   rect(210 * s, 50 * s, 30 * s, 10 * s);
//   rect(210 * s, 180 * s, 30 * s, 10 * s);
//   rect(240 * s, 190 * s, 30 * s, 10 * s);
//   rect(240 * s, 150 * s, 10 * s, 30 * s);
//   rect(240 * s, 60 * s, 10 * s, 30 * s);
//   rect(240 * s, 40 * s, 30 * s, 10 * s);
//   rect(250 * s, 90 * s, 10 * s, 60 * s);
//   rect(250 * s, 10 * s, 10 * s);
//   rect(250 * s, 220 * s, 10 * s);
//   rect(260 * s, 0 * s, 10 * s);
//   rect(260 * s, 230 * s, 10 * s);
//   rect(260 * s, 30 * s, 40 * s, 10 * s);
//   rect(260 * s, 200 * s, 40 * s, 10 * s);
//   rect(270 * s, 10 * s, 10 * s);
//   rect(270 * s, 220 * s, 10 * s);
//   rect(270 * s, 20 * s, 150 * s, 10 * s);
//   rect(270 * s, 210 * s, 150 * s, 10 * s);
//   rect(290 * s, 40 * s, 10 * s, 20 * s);
//   rect(290 * s, 180 * s, 10 * s, 20 * s);
//   rect(300 * s, 60 * s, 10 * s, 30 * s);
//   rect(300 * s, 150 * s, 10 * s, 30 * s);
//   rect(310 * s, 90 * s, 10 * s, 60 * s);
//   rect(390 * s, 30 * s, 10 * s);
//   rect(390 * s, 200 * s, 10 * s);
//   rect(400 * s, 40 * s, 10 * s);
//   rect(400 * s, 190 * s, 10 * s);
//   rect(410 * s, 50 * s, 10 * s, 20 * s);
//   rect(410 * s, 170 * s, 10 * s, 20 * s);
//   rect(420 * s, 70 * s, 10 * s, 100 * s);
//   rect(420 * s, 30 * s, 10 * s);
//   rect(420 * s, 200 * s, 10 * s);
//   rect(430 * s, 40 * s, 10 * s);
//   rect(430 * s, 190 * s, 10 * s);
//   rect(440 * s, 50 * s, 10 * s, 20 * s);
//   rect(440 * s, 170 * s, 10 * s, 20 * s);
//   rect(450 * s, 70 * s, 10 * s, 100 * s);

//   //windshield
//   fill(carColor.windshield);
//   rect(110 * s, 30 * s, 70 * s, 10 * s);
//   rect(110 * s, 200 * s, 70 * s, 10 * s);
//   rect(190 * s, 30 * s, 70 * s, 10 * s);
//   rect(190 * s, 200 * s, 70 * s, 10 * s);
//   rect(210 * s, 40 * s, 30 * s, 10 * s);
//   rect(210 * s, 190 * s, 30 * s, 10 * s);
//   rect(240 * s, 50 * s, 10 * s);
//   rect(240 * s, 180 * s, 10 * s);
//   rect(250 * s, 50 * s, 10 * s, 40 * s);
//   rect(250 * s, 150 * s, 10 * s, 40 * s);
//   rect(260 * s, 50 * s, 30 * s, 140 * s);
//   rect(270 * s, 40 * s, 20 * s, 10 * s);
//   rect(270 * s, 190 * s, 20 * s, 10 * s);
//   rect(290 * s, 90 * s, 20 * s, 60 * s);
//   rect(290 * s, 60 * s, 10 * s, 120 * s);

//   //windshield highlights
//   fill(carColor.highlight);
//   rect(140 * s, 30 * s, 10 * s);
//   rect(140 * s, 200 * s, 10 * s);
//   rect(220 * s, 190 * s, 10 * s);
//   rect(230 * s, 200 * s, 10 * s);
//   rect(220 * s, 40 * s, 10 * s);
//   rect(230 * s, 30 * s, 10 * s);
//   rect(260 * s, 70 * s, 10 * s);
//   rect(270 * s, 60 * s, 20 * s, 10 * s);

//   //random car color (red, blue or yellow)
//   let randomCarColor = color;
//   let lightCarColor;
//   let normalCarColor;
//   let darkCarColor;
//   if (randomCarColor === 1) {
//     //red
//     lightCarColor = carColor.lightRed;
//     normalCarColor = carColor.red;
//     darkCarColor = carColor.darkRed;
//   } else if (randomCarColor === 2) {
//     //blue
//     lightCarColor = carColor.lightBlue;
//     normalCarColor = carColor.blue;
//     darkCarColor = carColor.darkBlue;
//   } else if (randomCarColor === 3) {
//     //yellow
//     lightCarColor = carColor.lightYellow;
//     normalCarColor = carColor.yellow;
//     darkCarColor = carColor.darkYellow;
//   }

//   //light parts of the car
//   fill(lightCarColor);
//   rect(10 * s, 40 * s, 10 * s);
//   rect(10 * s, 60 * s, 20 * s, 20 * s);
//   rect(10 * s, 80 * s, 10 * s);
//   rect(20 * s, 30 * s, 80 * s, 10 * s);
//   rect(20 * s, 50 * s, 50 * s, 20 * s);
//   rect(80 * s, 40 * s, 30 * s, 10 * s);
//   rect(80 * s, 60 * s, 30 * s, 20 * s);
//   rect(80 * s, 80 * s, 10 * s);
//   rect(110 * s, 50 * s, 100 * s, 10 * s);
//   rect(110 * s, 60 * s, 20 * s, 10 * s);
//   rect(190 * s, 60 * s, 50 * s, 10 * s);
//   rect(220 * s, 70 * s, 20 * s, 10 * s);
//   rect(230 * s, 80 * s, 10 * s);
//   rect(300 * s, 30 * s, 90 * s, 20 * s);
//   rect(300 * s, 50 * s, 10 * s);
//   rect(390 * s, 40 * s, 10 * s, 20 * s);
//   rect(400 * s, 30 * s, 10 * s);
//   rect(410 * s, 40 * s, 10 * s);
//   rect(420 * s, 50 * s, 10 * s, 20 * s);
//   rect(400 * s, 50 * s, 10 * s, 30 * s);
//   rect(410 * s, 70 * s, 10 * s, 20 * s);

//   //normal colored parts of the car
//   fill(normalCarColor);
//   rect(10 * s, 90 * s, 50 * s, 40 * s);
//   rect(20 * s, 80 * s, 40 * s, 80 * s);
//   rect(30 * s, 70 * s, 20 * s, 100 * s);
//   rect(50 * s, 70 * s, 20 * s);
//   rect(50 * s, 150 * s, 20 * s);
//   rect(70 * s, 90 * s, 180 * s, 60 * s);
//   rect(90 * s, 80 * s, 140 * s, 90 * s);
//   rect(110 * s, 70 * s, 110 * s, 110 * s);
//   rect(130 * s, 60 * s, 60 * s, 10 * s);
//   rect(260 * s, 10 * s, 10 * s, 20 * s);
//   rect(260 * s, 210 * s, 10 * s, 20 * s);
//   rect(310 * s, 50 * s, 80 * s, 40 * s);
//   rect(310 * s, 150 * s, 80 * s, 40 * s);
//   rect(320 * s, 90 * s, 100 * s, 60 * s);
//   rect(390 * s, 60 * s, 10 * s, 30 * s);
//   rect(390 * s, 150 * s, 20 * s);
//   rect(390 * s, 170 * s, 10 * s);
//   rect(400 * s, 80 * s, 10 * s);
//   rect(400 * s, 200 * s, 10 * s);
//   rect(410 * s, 30 * s, 10 * s);
//   rect(410 * s, 190 * s, 10 * s);
//   rect(420 * s, 40 * s, 10 * s);
//   rect(420 * s, 170 * s, 10 * s, 20 * s);
//   rect(430 * s, 60 * s, 10 * s, 120 * s);

//   //dark colored parts of the car
//   fill(darkCarColor);
//   rect(10 * s, 130 * s, 10 * s, 50 * s);
//   rect(10 * s, 190 * s, 10 * s);
//   rect(20 * s, 170 * s, 50 * s, 20 * s);
//   rect(20 * s, 160 * s, 10 * s);
//   rect(20 * s, 200 * s, 80 * s, 10 * s);
//   rect(80 * s, 190 * s, 30 * s, 10 * s);
//   rect(80 * s, 150 * s, 10 * s, 30 * s);
//   rect(90 * s, 170 * s, 20 * s, 10 * s);
//   rect(110 * s, 180 * s, 100 * s, 10 * s);
//   rect(210 * s, 170 * s, 30 * s, 10 * s);
//   rect(230 * s, 150 * s, 10 * s, 20 * s);
//   rect(300 * s, 180 * s, 10 * s);
//   rect(300 * s, 190 * s, 90 * s, 20 * s);
//   rect(390 * s, 180 * s, 10 * s, 20 * s);
//   rect(400 * s, 170 * s, 10 * s, 20 * s);
//   rect(410 * s, 150 * s, 10 * s, 20 * s);
//   rect(410 * s, 200 * s, 10 * s);
//   rect(420 * s, 190 * s, 10 * s);
//   rect(430 * s, 180 * s, 10 * s);
//   rect(430 * s, 50 * s, 10 * s);
//   rect(440 * s, 70 * s, 10 * s, 100 * s);
//   pop();
// }

// function spawnCars(x, y, s, speed) {
//   const color = Math.floor(Math.random() * 3) + 1;
//   for (car of cars) {
//     //cars.length
//     drawCar(x, y, s, color, speed);
//     if (x > width) {
//       cars.splice(i, 1);
//       i--;
//     }
//     cars.push(car);
//   }
// }

// function spawnCars() {}

// function spawnLogs() {
//   for (let i = 0; i < 5; i++) {
//     // let log = {
//     //   // x: ,
//     //   // y: ,
//     //   // speed: ,
//     //   // size: ,
//     // // };
//     // // logs.push;
//   }
// }

// function drawLogs() {
//   fill(brown); //color of the logs
//   noStroke();
//   for (let log of logs) {
//     rect(log.x, log.y, log.size.x, log.size.y);
//     log.x += log.speed;
//     if (log.x > width + log.size.x / 2) {
//       log.x = -log.size.x / 2;
//     }
//     //moves the frog along if it's on a log
//     if (
//       frog.y > log.y - log.size.y / 2 &&
//       frog.y < log.y + log.size.y / 2 &&
//       frog.x > log.x - log.size.x / 2 &&
//       frog.x < log.x + log.size.x / 2
//     ) {
//       frog.x += log.speed;
//     }
//   }
// }

function checkCollisions() {
  //check for collisions with cars
  for (let newCar of cars) {
    if (
      frogSettings.y > newCar.y &&
      frogSettings.y < newCar.y &&
      frogSettings.x > newCar.x &&
      frogSettings.x < newCar.x
    ) {
      console.log("you got hit by a car");
      resetFrog(); //resets frog to bottom
      lives--; //minus 1 life
    }
  }
  //check for collisions with logs
  let onLog = false;
  for (let log of logs) {
    if (
      frogSettings.y > logSettings.y - log.size.y / 2 &&
      frogSettings.y < logSettings.y + log.size.y / 2 &&
      frogSettings.x > logSettings.x - log.size.x / 2 &&
      frogSettings.x < logSettings.x + log.size.x / 2
    ) {
      onLog = true;
      break; //the break statements terminates the loop before it's actually done
    }
  }
  if (!onLog) {
    //resetFrog(); //resets frog to bottom
    lives--; //minus 1 life
  }
}

function checkwin() {
  if (frog.y < 50) {
    // if the frog has reached the other side
    score += 10; //increment the score by 10
    level++; //increment the level
    resetFrog(); //resets the frog's position
    spawnCars(); //spawns new cars
    spawnLogs(); //spawns new logs
  }
}

// function resetFrog() {
//   frogX = width / 2; //resets the frog to the middle of the screen
//   frogY = height - 50; //resets the frog to the bottom of the screen
//   //might need to add a variable instead of 50 later
// }

//DRAW FUNCTION (updates the game)
function draw() {
  //GENERAL
  background("#FFF");
  scenery.draw(0, 0);
  drawText();
  //checkCollisions();

  //FROG
  frog.draw(frogSettings.x, frogSettings.y, frogSettings.s);

  //CARS

  //millis()Returns the number of milliseconds (thousandths of a second) since starting the sketch
  //https://p5js.org/reference/#/p5/millis
  if (millis() - carSettings.lastSpawnTime > 500) {
    let newCar = new Car(
      carSettings.x,
      carSettings.y,
      carSettings.size,
      carSettings.color
    );
    cars.push(newCar);
    //console.log(cars);

    carSettings.lastSpawnTime = millis();
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(
      carSettings.x,
      carSettings.y,
      carSettings.size,
      carSettings.color
    );

    carSettings.x += carSettings.speed;
  }

  //LOGS
  logSettings.x += logSettings.speed;
  if (millis() - logSettings.lastSpawnTime > 500) {
    let newLog = new Log(logSettings.x, logSettings.y, logSettings.size);
    logs.push(newLog);

    logSettings.lastSpawnTime = millis();
  }
  for (let i = 0; i < logs.length; i++) {
    logs[i].draw(logSettings.x, logSettings.y, logSettings.size);
  }

  // if (!gameover) {
  //   background(0, 100, 200); //set background color

  //   drawCar(); //draws cars
  //   drawLogs(); //draws logs

  //   checkCollisions();
  //   checkWin();
  //   updateScore();
  // } else {
  //   gameover(); //display the game over screen
  // }
}
window.draw = draw;

//Controls
function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    frogSettings.x -= frogSettings.speed;
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    frogSettings.x += frogSettings.speed;
  } else if (keyCode === UP_ARROW || keyCode === 87) {
    frogSettings.y -= frogSettings.speed;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    frogSettings.y += frogSettings.speed;
  }
}
window.keyPressed = keyPressed;
